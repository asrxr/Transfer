import { getStore } from "@netlify/blobs";

/* Rooms live in Netlify Blobs. Each player is its own blob key
   (`CODE:p:PID`) so concurrent writes never clobber each other.
   The frontend talks to this at /api/room. */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export default async (req) => {
  // health check used by the frontend to detect this backend
  if (req.method === "GET") return json({ ok: true, service: "transfer-room" });
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);

  let body;
  try { body = await req.json(); } catch { return json({ ok: false, error: "bad json" }, 400); }
  const { action, code, player } = body || {};
  if (!code || !/^[A-Z]{3,5}$/.test(code)) return json({ ok: false, error: "bad code" }, 400);

  const store = getStore("transfer-room");
  const metaKey = `${code}:meta`;

  try {
    if (action === "meta") {
      const meta = await store.get(metaKey, { type: "json" });
      return json({ ok: true, exists: !!meta });
    }
    if (action === "create") {
      await store.setJSON(metaKey, { code, created: Date.now() });
      if (player?.pid) await store.setJSON(`${code}:p:${player.pid}`, player);
      return json({ ok: true });
    }
    if (action === "upsert") {
      const meta = await store.get(metaKey, { type: "json" });
      if (!meta) return json({ ok: false, error: "no room" }, 404);
      if (!player?.pid) return json({ ok: false, error: "no player" }, 400);
      await store.setJSON(`${code}:p:${player.pid}`, player);
      return json({ ok: true });
    }
    if (action === "players") {
      const { blobs } = await store.list({ prefix: `${code}:p:` });
      const players = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
      return json({ ok: true, players: players.filter(Boolean) });
    }
    return json({ ok: false, error: "unknown action" }, 400);
  } catch (e) {
    return json({ ok: false, error: String(e && e.message || e) }, 500);
  }
};

export const config = { path: "/api/room" };
