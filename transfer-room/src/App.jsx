import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Crown, TrendingUp, TrendingDown, Lock, Coins, ChevronRight, RotateCcw,
  Eye, Trophy, Banknote, Users, Copy, Check, LogOut, Share2, Wifi, WifiOff,
  Loader2, Plus, LogIn,
} from "lucide-react";

/* ─────────────────────────────── THEME ─────────────────────────────── */
const T = {
  bg: "#0A100D", bg2: "#0E1714", surface: "#14201B", surface2: "#1B2A23",
  line: "#26392F", lineSoft: "#1E2E26", ink: "#EAF2EC", mute: "#8AA293",
  gold: "#E7B94A", green: "#37E08B", red: "#FF6B6B", blue: "#5BC0EB",
};
const PALETTE = ["#E7B94A", "#5BC0EB", "#C77DFF", "#37E08B", "#FF8FA3", "#7AE0C8", "#F4A259", "#9CD3FF"];

/* ───────────────────── PLAYER DATABASE ─────────────────────
   Real footballers. v = market value (€M) at [2016, 2018, 2020, 2022, 2024].
   Roughly half of every position declines — aging stars, flops, injuries —
   so blind picking is punished. Values are game-balanced approximations,
   not a live Transfermarkt feed (no free official API exposes history).
------------------------------------------------------------- */
const POOL = [
  /* ── GOALKEEPERS (12: 7 fall, 5 rise) ── */
  { n: "David de Gea", p: "GK", age: 25, h: 192, nat: "Spain", lg: "Premier League", s: { "Clean sheets": 13, "Save %": "74%" }, v: [40, 60, 45, 20, 8] },
  { n: "Hugo Lloris", p: "GK", age: 29, h: 188, nat: "France", lg: "Premier League", s: { "Clean sheets": 11, "Save %": "70%" }, v: [28, 35, 30, 15, 5] },
  { n: "Kepa Arrizabalaga", p: "GK", age: 21, h: 186, nat: "Spain", lg: "La Liga", s: { "Clean sheets": 9, "Save %": "71%" }, v: [7, 35, 25, 15, 10] },
  { n: "Wojciech Szczęsny", p: "GK", age: 26, h: 196, nat: "Poland", lg: "Serie A", s: { "Clean sheets": 14, "Save %": "73%" }, v: [12, 20, 22, 18, 6] },
  { n: "Keylor Navas", p: "GK", age: 29, h: 185, nat: "Costa Rica", lg: "La Liga", s: { "Clean sheets": 12, "Save %": "72%" }, v: [12, 18, 15, 8, 2] },
  { n: "Samir Handanović", p: "GK", age: 31, h: 193, nat: "Slovenia", lg: "Serie A", s: { "Clean sheets": 13, "Save %": "71%" }, v: [18, 15, 10, 4, 1] },
  { n: "Kasper Schmeichel", p: "GK", age: 29, h: 189, nat: "Denmark", lg: "Premier League", s: { "Clean sheets": 10, "Save %": "69%" }, v: [10, 14, 12, 6, 3] },
  { n: "Mike Maignan", p: "GK", age: 20, h: 191, nat: "France", lg: "Ligue 1", s: { "Clean sheets": 8, "Save %": "75%" }, v: [3, 8, 25, 35, 30] },
  { n: "Gianluigi Donnarumma", p: "GK", age: 17, h: 196, nat: "Italy", lg: "Serie A", s: { "Clean sheets": 10, "Save %": "70%" }, v: [10, 25, 40, 50, 45] },
  { n: "Diogo Costa", p: "GK", age: 16, h: 186, nat: "Portugal", lg: "Liga Portugal", s: { "Clean sheets": 4, "Save %": "74%" }, v: [1, 5, 18, 35, 40] },
  { n: "Gregor Kobel", p: "GK", age: 18, h: 196, nat: "Switzerland", lg: "Bundesliga", s: { "Clean sheets": 6, "Save %": "73%" }, v: [1, 4, 20, 35, 38] },
  { n: "Giorgi Mamardashvili", p: "GK", age: 15, h: 197, nat: "Georgia", lg: "La Liga", s: { "Clean sheets": 3, "Save %": "76%" }, v: [0.3, 1, 8, 25, 32] },

  /* ── CENTRE-BACKS (14: 8 fall, 6 rise) ── */
  { n: "Sergio Ramos", p: "CB", age: 30, h: 184, nat: "Spain", lg: "La Liga", s: { "Clean sheets": 16, "Goals": 7, "Yellow cards": 15 }, v: [40, 50, 45, 20, 5] },
  { n: "Giorgio Chiellini", p: "CB", age: 31, h: 187, nat: "Italy", lg: "Serie A", s: { "Clean sheets": 18, "Goals": 3, "Yellow cards": 10 }, v: [22, 25, 18, 8, 1] },
  { n: "Mats Hummels", p: "CB", age: 27, h: 191, nat: "Germany", lg: "Bundesliga", s: { "Clean sheets": 14, "Goals": 4, "Yellow cards": 6 }, v: [35, 40, 30, 18, 6] },
  { n: "Jérôme Boateng", p: "CB", age: 27, h: 192, nat: "Germany", lg: "Bundesliga", s: { "Clean sheets": 15, "Goals": 2, "Yellow cards": 7 }, v: [35, 40, 25, 8, 1] },
  { n: "Thiago Silva", p: "CB", age: 31, h: 183, nat: "Brazil", lg: "Ligue 1", s: { "Clean sheets": 17, "Goals": 3, "Yellow cards": 5 }, v: [25, 28, 22, 12, 3] },
  { n: "David Luiz", p: "CB", age: 29, h: 189, nat: "Brazil", lg: "Premier League", s: { "Clean sheets": 12, "Goals": 4, "Yellow cards": 9 }, v: [20, 25, 18, 6, 1] },
  { n: "Kalidou Koulibaly", p: "CB", age: 25, h: 186, nat: "Senegal", lg: "Serie A", s: { "Clean sheets": 13, "Goals": 2, "Yellow cards": 8 }, v: [18, 45, 55, 30, 12] },
  { n: "Harry Maguire", p: "CB", age: 23, h: 194, nat: "England", lg: "Premier League", s: { "Clean sheets": 10, "Goals": 3, "Yellow cards": 8 }, v: [25, 55, 45, 28, 18] },
  { n: "Alessandro Bastoni", p: "CB", age: 17, h: 190, nat: "Italy", lg: "Serie A", s: { "Clean sheets": 4, "Goals": 0, "Yellow cards": 2 }, v: [0.075, 8, 35, 55, 75] },
  { n: "William Saliba", p: "CB", age: 15, h: 192, nat: "France", lg: "Ligue 1", s: { "Clean sheets": 2, "Goals": 0, "Yellow cards": 1 }, v: [0.5, 6, 40, 70, 80] },
  { n: "Joško Gvardiol", p: "CB", age: 14, h: 185, nat: "Croatia", lg: "—", s: { "Clean sheets": 0, "Goals": 0, "Yellow cards": 0 }, v: [1, 12, 55, 75, 70] },
  { n: "Rúben Dias", p: "CB", age: 19, h: 187, nat: "Portugal", lg: "Liga Portugal", s: { "Clean sheets": 8, "Goals": 1, "Yellow cards": 5 }, v: [8, 30, 75, 68, 60] },
  { n: "Wesley Fofana", p: "CB", age: 15, h: 186, nat: "France", lg: "—", s: { "Clean sheets": 0, "Goals": 0, "Yellow cards": 0 }, v: [1, 8, 40, 45, 42] },
  { n: "Cristhian Mosquera", p: "CB", age: 12, h: 186, nat: "Spain", lg: "—", s: { "Clean sheets": 0, "Goals": 0, "Yellow cards": 0 }, v: [0.2, 1, 8, 25, 35] },

  /* ── MIDFIELDERS (14: 8 fall, 6 rise) ── */
  { n: "Mesut Özil", p: "MID", age: 27, h: 180, nat: "Germany", lg: "Premier League", s: { "Goals": 6, "Assists": 19, "Pass %": "88%" }, v: [45, 50, 30, 8, 1] },
  { n: "Paul Pogba", p: "MID", age: 23, h: 191, nat: "France", lg: "Serie A", s: { "Goals": 8, "Assists": 12, "Pass %": "86%" }, v: [60, 80, 60, 25, 5] },
  { n: "Toni Kroos", p: "MID", age: 26, h: 183, nat: "Germany", lg: "La Liga", s: { "Goals": 4, "Assists": 9, "Pass %": "94%" }, v: [55, 60, 45, 30, 10] },
  { n: "Luka Modrić", p: "MID", age: 30, h: 172, nat: "Croatia", lg: "La Liga", s: { "Goals": 3, "Assists": 8, "Pass %": "91%" }, v: [40, 45, 30, 15, 4] },
  { n: "Christian Eriksen", p: "MID", age: 24, h: 182, nat: "Denmark", lg: "Premier League", s: { "Goals": 10, "Assists": 13, "Pass %": "85%" }, v: [40, 55, 40, 20, 8] },
  { n: "Marco Verratti", p: "MID", age: 23, h: 165, nat: "Italy", lg: "Ligue 1", s: { "Goals": 2, "Assists": 6, "Pass %": "92%" }, v: [40, 60, 55, 30, 12] },
  { n: "N'Golo Kanté", p: "MID", age: 25, h: 168, nat: "France", lg: "Premier League", s: { "Goals": 1, "Assists": 4, "Pass %": "87%" }, v: [20, 70, 80, 35, 12] },
  { n: "Jordan Henderson", p: "MID", age: 26, h: 182, nat: "England", lg: "Premier League", s: { "Goals": 3, "Assists": 5, "Pass %": "86%" }, v: [18, 30, 28, 14, 4] },
  { n: "Jude Bellingham", p: "MID", age: 13, h: 186, nat: "England", lg: "—", s: { "Goals": 0, "Assists": 0, "Pass %": "—" }, v: [0.5, 12, 90, 130, 180] },
  { n: "Pedri", p: "MID", age: 14, h: 174, nat: "Spain", lg: "—", s: { "Goals": 0, "Assists": 0, "Pass %": "—" }, v: [0.2, 3, 80, 90, 110] },
  { n: "Aurélien Tchouaméni", p: "MID", age: 16, h: 187, nat: "France", lg: "Ligue 1", s: { "Goals": 1, "Assists": 1, "Pass %": "89%" }, v: [0.5, 8, 80, 72, 60] },
  { n: "Eduardo Camavinga", p: "MID", age: 14, h: 182, nat: "France", lg: "—", s: { "Goals": 0, "Assists": 0, "Pass %": "—" }, v: [0.3, 10, 55, 65, 55] },
  { n: "Jamal Musiala", p: "MID", age: 13, h: 184, nat: "Germany", lg: "—", s: { "Goals": 0, "Assists": 0, "Pass %": "—" }, v: [0.2, 2, 70, 110, 140] },
  { n: "Sandro Tonali", p: "MID", age: 16, h: 181, nat: "Italy", lg: "Serie A", s: { "Goals": 1, "Assists": 2, "Pass %": "85%" }, v: [0.5, 12, 45, 40, 55] },

  /* ── ATTACKERS (16: 9 fall, 7 rise) ── */
  { n: "Sergio Agüero", p: "ATT", age: 28, h: 173, nat: "Argentina", lg: "Premier League", s: { "Goals": 24, "Assists": 8 }, v: [60, 75, 50, 10, 1] },
  { n: "Luis Suárez", p: "ATT", age: 29, h: 182, nat: "Uruguay", lg: "La Liga", s: { "Goals": 29, "Assists": 13 }, v: [70, 80, 50, 20, 4] },
  { n: "Edinson Cavani", p: "ATT", age: 29, h: 184, nat: "Uruguay", lg: "Ligue 1", s: { "Goals": 25, "Assists": 5 }, v: [45, 50, 30, 8, 1] },
  { n: "Eden Hazard", p: "ATT", age: 25, h: 175, nat: "Belgium", lg: "Premier League", s: { "Goals": 16, "Assists": 11 }, v: [60, 90, 80, 20, 2] },
  { n: "Gareth Bale", p: "ATT", age: 27, h: 185, nat: "Wales", lg: "La Liga", s: { "Goals": 19, "Assists": 10 }, v: [60, 55, 30, 8, 1] },
  { n: "Antoine Griezmann", p: "ATT", age: 25, h: 176, nat: "France", lg: "La Liga", s: { "Goals": 22, "Assists": 9 }, v: [70, 90, 60, 35, 20] },
  { n: "Romelu Lukaku", p: "ATT", age: 23, h: 191, nat: "Belgium", lg: "Premier League", s: { "Goals": 18, "Assists": 6 }, v: [40, 75, 80, 40, 20] },
  { n: "Harry Kane", p: "ATT", age: 23, h: 188, nat: "England", lg: "Premier League", s: { "Goals": 25, "Assists": 7 }, v: [60, 110, 100, 75, 55] },
  { n: "Raheem Sterling", p: "ATT", age: 21, h: 170, nat: "England", lg: "Premier League", s: { "Goals": 12, "Assists": 9 }, v: [40, 90, 80, 45, 22] },
  { n: "Cole Palmer", p: "ATT", age: 14, h: 189, nat: "England", lg: "—", s: { "Goals": 0, "Assists": 0 }, v: [0.1, 2, 40, 80, 130] },
  { n: "Rafael Leão", p: "ATT", age: 17, h: 188, nat: "Portugal", lg: "Liga Portugal", s: { "Goals": 5, "Assists": 3 }, v: [2, 15, 90, 80, 80] },
  { n: "Khvicha Kvaratskhelia", p: "ATT", age: 15, h: 183, nat: "Georgia", lg: "—", s: { "Goals": 0, "Assists": 0 }, v: [0.2, 3, 60, 75, 70] },
  { n: "Victor Osimhen", p: "ATT", age: 17, h: 185, nat: "Nigeria", lg: "—", s: { "Goals": 2, "Assists": 1 }, v: [0.5, 8, 60, 90, 75] },
  { n: "Bukayo Saka", p: "ATT", age: 14, h: 178, nat: "England", lg: "—", s: { "Goals": 0, "Assists": 0 }, v: [0.3, 5, 60, 120, 130] },
  { n: "Lautaro Martínez", p: "ATT", age: 18, h: 174, nat: "Argentina", lg: "—", s: { "Goals": 3, "Assists": 1 }, v: [3, 25, 70, 90, 85] },
  { n: "Vinícius Júnior", p: "ATT", age: 15, h: 176, nat: "Brazil", lg: "—", s: { "Goals": 0, "Assists": 0 }, v: [3, 18, 80, 120, 150] },
].map((c, i) => ({ ...c, id: i }));

const POS_LABEL = { GK: "Goalkeeper", CB: "Centre-back", MID: "Midfielder", ATT: "Attacker" };
const DRAFT_ROUNDS = ["GK", "CB", "CB", "MID", "MID", "ATT", "ATT"];
const YEARS = [2016, 2018, 2020, 2022, 2024];          // entry + 3 windows + final
const WINDOW_YEARS = [2018, 2020, 2022];                // the three trading windows
const CARDS_PER_ROUND = 5;
const FALLERS_MIN = 3;                                  // ≥3 of every 5 lose value

/* ───────────────────────── HELPERS ───────────────────────── */
const money = (m) => {
  if (m == null) return "—";
  if (m < 1) return `€${Math.round(m * 1000)}K`;
  return `€${(Math.round(m * 10) / 10).toString().replace(/\.0$/, "")}M`;
};
const signed = (m) => (m >= 0 ? "+" : "−") + money(Math.abs(m));
const uid = (() => { let n = 0; return () => `h${++n}_${Math.random().toString(36).slice(2, 6)}`; })();
const genCode = () => { const A = "ABCDEFGHJKLMNPQRSTUVWXYZ"; return Array.from({ length: 4 }, () => A[Math.floor(Math.random() * A.length)]).join(""); };
const genPid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
const colorFor = (pid) => { let h = 0; for (let i = 0; i < pid.length; i++) h = (h * 31 + pid.charCodeAt(i)) >>> 0; return PALETTE[h % PALETTE.length]; };

function makeRng(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
function shuffle(arr, rng) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ─────────────── NETWORK LAYER (Netlify fn → artifact KV → solo) ───────────────
   Same code runs three ways. On Netlify it hits the /api/room function backed by
   Netlify Blobs. Inside a Claude artifact it falls back to shared storage. Offline
   it plays solo. The frontend never changes.
------------------------------------------------------------------------------- */
let _backend = null;
async function detectBackend() {
  if (_backend) return _backend;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    const r = await fetch("/api/room", { method: "GET", signal: ctrl.signal });
    clearTimeout(t);
    const d = await r.json();
    if (r.ok && d && d.ok) { _backend = "fn"; return _backend; }
  } catch { /* not on netlify */ }
  if (typeof window !== "undefined" && window.storage && window.storage.get) { _backend = "kv"; return _backend; }
  _backend = "solo"; return _backend;
}
const _local = {};
const fnCall = async (body) => {
  const r = await fetch("/api/room", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return r.json();
};
const net = {
  mode: () => detectBackend(),
  async roomExists(code) {
    const b = await detectBackend();
    if (b === "fn") { const d = await fnCall({ action: "meta", code }); return !!d.exists; }
    if (b === "kv") { try { const r = await window.storage.get(`tr:${code}:meta`, true); return !!r; } catch { return false; } }
    return !!_local[code];
  },
  async createRoom(code, player) {
    const b = await detectBackend();
    if (b === "fn") { await fnCall({ action: "create", code, player }); return; }
    if (b === "kv") { await window.storage.set(`tr:${code}:meta`, JSON.stringify({ code }), true); await window.storage.set(`tr:${code}:p:${player.pid}`, JSON.stringify(player), true); return; }
    _local[code] = { [player.pid]: player };
  },
  async upsert(code, player) {
    const b = await detectBackend();
    if (b === "fn") { await fnCall({ action: "upsert", code, player }); return; }
    if (b === "kv") { await window.storage.set(`tr:${code}:p:${player.pid}`, JSON.stringify(player), true); return; }
    (_local[code] = _local[code] || {})[player.pid] = player;
  },
  async players(code) {
    const b = await detectBackend();
    if (b === "fn") { const d = await fnCall({ action: "players", code }); return d.players || []; }
    if (b === "kv") {
      try {
        const ks = await window.storage.list(`tr:${code}:p:`, true);
        const keys = (ks && ks.keys) || [];
        const recs = await Promise.all(keys.map(async (k) => { try { const r = await window.storage.get(k, true); return r ? JSON.parse(r.value) : null; } catch { return null; } }));
        return recs.filter(Boolean);
      } catch { return []; }
    }
    return Object.values(_local[code] || {});
  },
};

/* ═══════════════════════════════ ROOT ═══════════════════════════════ */
export default function TransferRoom() {
  const [screen, setScreen] = useState("home"); // home | lobby | play | playWin | done
  const [self, setSelf] = useState(null);
  const [room, setRoom] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [online, setOnline] = useState(null); // true|false once detected

  const [draftSlot, setDraftSlot] = useState(0);
  const [squad, setSquad] = useState([]);
  const [realized, setRealized] = useState(0);
  const [windowIdx, setWindowIdx] = useState(0);
  const [winStage, setWinStage] = useState("review");
  const [emptySlots, setEmptySlots] = useState([]);
  const [lastSold, setLastSold] = useState(null);
  const [revealed, setRevealed] = useState({});
  const [selected, setSelected] = useState(null);

  const card = useCallback((id) => POOL.find((c) => c.id === id), []);

  /* deterministic option builder: ≥3 fallers in every set, varied by seed */
  const buildOptions = useCallback((pos, seedKey, nowIdx, excludeIds, count = CARDS_PER_ROUND, fallMin = FALLERS_MIN) => {
    const rng = makeRng((room || "practice") + ":" + seedKey);
    const avail = POOL.filter((c) => c.p === pos && !excludeIds.has(c.id));
    const fall = shuffle(avail.filter((c) => c.v[4] < c.v[nowIdx]), rng);
    const rise = shuffle(avail.filter((c) => c.v[4] >= c.v[nowIdx]), rng);
    const out = [...fall.slice(0, fallMin), ...rise.slice(0, count - fallMin)];
    if (out.length < count) {
      const used = new Set(out.map((c) => c.id));
      const rest = shuffle(avail.filter((c) => !used.has(c.id)), rng);
      out.push(...rest.slice(0, count - out.length));
    }
    return shuffle(out, rng);
  }, [room]);

  /* identity + backend detect once */
  useEffect(() => {
    (async () => {
      const b = await net.mode();
      setOnline(b !== "solo");
      let me = null;
      if (b === "kv") me = await (async () => { try { const r = await window.storage.get("tr:self", false); return r ? JSON.parse(r.value) : null; } catch { return null; } })();
      else { try { const raw = localStorage.getItem("tr:self"); me = raw ? JSON.parse(raw) : null; } catch {} }
      if (me && me.pid) setSelf(me);
      else { const pid = genPid(); setSelf({ pid, color: colorFor(pid), name: "" }); }
    })();
  }, []);

  function persistSelf(s) {
    setSelf(s);
    if (_backend === "kv") window.storage.set("tr:self", JSON.stringify(s), false);
    else { try { localStorage.setItem("tr:self", JSON.stringify(s)); } catch {} }
  }
  function ensureSelf(name) {
    const s = { pid: self?.pid || genPid(), name: name.trim(), color: self?.color || colorFor(self?.pid || "x") };
    persistSelf(s); return s;
  }
  const writeSelf = (code, s, status, extra = {}) =>
    net.upsert(code, { pid: s.pid, name: s.name, color: s.color, status, t: Date.now(), ...extra });

  /* room polling */
  const pollRef = useRef();
  const loadRoom = useCallback(async (code) => { if (code) setPlayers(await net.players(code)); }, []);
  useEffect(() => {
    clearInterval(pollRef.current);
    if ((screen === "lobby" || screen === "done") && room) {
      loadRoom(room);
      if (online) pollRef.current = setInterval(() => loadRoom(room), 3000);
    }
    return () => clearInterval(pollRef.current);
  }, [screen, room, online, loadRoom]);

  async function createRoom(name) {
    setError(""); setBusy(true);
    const s = ensureSelf(name);
    const code = online ? genCode() : "SOLO";
    try {
      await net.createRoom(code, { pid: s.pid, name: s.name, color: s.color, status: "lobby", t: Date.now() });
    } catch (e) {
      setError("Created your code, but couldn't reach the room server — others may not be able to join yet.");
    }
    setRoom(code); setIsHost(true); setBusy(false); setScreen("lobby");
  }
  async function joinRoom(name, codeRaw) {
    setError(""); const code = codeRaw.trim().toUpperCase();
    if (code.length < 3) { setError("Enter the room code your host shared."); return; }
    setBusy(true);
    const s = ensureSelf(name);
    if (online && !(await net.roomExists(code))) { setBusy(false); setError(`No room "${code}". Double-check with the host.`); return; }
    await writeSelf(code, s, "lobby");
    setRoom(code); setIsHost(false); setBusy(false); setScreen("lobby");
  }

  function newGameState() {
    setDraftSlot(0); setSquad([]); setRealized(0); setWindowIdx(0);
    setWinStage("review"); setEmptySlots([]); setLastSold(null); setRevealed({}); setSelected(null);
  }
  function startGame() { newGameState(); if (room && self) writeSelf(room, self, "playing"); setScreen("play"); }

  /* draft */
  const roundPos = DRAFT_ROUNDS[draftSlot];
  const draftCandidates = useMemo(
    () => buildOptions(roundPos, "d" + draftSlot, 0, new Set(squad.map((h) => h.cardId))),
    [buildOptions, roundPos, draftSlot, squad]
  );
  function confirmDraft() {
    if (selected == null) return;
    const c = card(selected);
    setSquad((sq) => [...sq, { hid: uid(), cardId: c.id, slotPos: roundPos, buyValue: c.v[0], buyIdx: 0 }]);
    setSelected(null);
    if (draftSlot < DRAFT_ROUNDS.length - 1) setDraftSlot((d) => d + 1);
    else { setWindowIdx(0); setWinStage("review"); setScreen("playWin"); }
  }

  /* windows */
  const curIdx = windowIdx + 1;
  function sell(hid) {
    const hold = squad.find((x) => x.hid === hid);
    const c = card(hold.cardId);
    const cur = c.v[curIdx];
    setRealized((r) => r + (cur - hold.buyValue));
    setRevealed((rv) => ({ ...rv, [c.id]: true }));
    setSquad((sq) => sq.filter((x) => x.hid !== hid));
    setEmptySlots((e) => [...e, { slotPos: hold.slotPos }]);
    setLastSold({ name: c.n, profit: cur - hold.buyValue });
  }
  const freeAgents = (pos) => buildOptions(pos, `w${windowIdx}-${pos}`, curIdx, new Set(squad.map((h) => h.cardId)), 6, FALLERS_MIN);
  function continueReview() { if (emptySlots.length) setWinStage("replace"); else nextWindow(); }
  function buyReplacement(cardId) {
    const c = card(cardId); const slot = emptySlots[0];
    setSquad((sq) => [...sq, { hid: uid(), cardId: c.id, slotPos: slot.slotPos, buyValue: c.v[curIdx], buyIdx: curIdx }]);
    const rest = emptySlots.slice(1); setEmptySlots(rest);
    if (!rest.length) { setWinStage("review"); nextWindow(); }
  }
  function skipSlot() { const rest = emptySlots.slice(1); setEmptySlots(rest); if (!rest.length) { setWinStage("review"); nextWindow(); } }
  function nextWindow() {
    setLastSold(null);
    if (windowIdx < 2) { setWindowIdx((w) => w + 1); setWinStage("review"); }
    else finishGame();
  }
  function finishGame() {
    const held = squad.reduce((s, h) => s + (card(h.cardId).v[4] - h.buyValue), 0);
    const total = realized + held;
    const summary = squad.map((h) => { const c = card(h.cardId); return { n: c.n, p: c.p, nat: c.nat, lg: c.lg, buy: h.buyValue, buyIdx: h.buyIdx, fin: c.v[4], v: c.v }; });
    if (room && self) writeSelf(room, self, "done", { total, squad: summary });
    setScreen("done");
  }

  function leaveRoom() { clearInterval(pollRef.current); setRoom(null); setIsHost(false); setPlayers([]); setScreen("home"); }
  function playAgain() { newGameState(); if (room && self) writeSelf(room, self, "playing"); setScreen("play"); }

  const screenKey = screen === "playWin" ? "play" : screen;
  return (
    <div style={S.root}>
      <Style />
      <div className="wrap">
        <Header online={online} onLeave={room ? leaveRoom : null} />
        {screenKey === "home" && <Home self={self} busy={busy} error={error} online={online} onCreate={createRoom} onJoin={joinRoom} />}
        {screenKey === "lobby" && <Lobby room={room} self={self} players={players} online={online} error={error} onStart={startGame} />}
        {screen === "play" && <Draft slot={draftSlot} pos={roundPos} candidates={draftCandidates} selected={selected} setSelected={setSelected} confirm={confirmDraft} squad={squad} self={self} />}
        {screen === "playWin" && <WindowView windowIdx={windowIdx} stage={winStage} squad={squad} card={card} curIdx={curIdx} sell={sell} continueReview={continueReview} freeAgents={freeAgents} emptySlots={emptySlots} buyReplacement={buyReplacement} skipSlot={skipSlot} lastSold={lastSold} realized={realized} self={self} />}
        {screenKey === "done" && <Results self={self} players={players} room={room} online={online} onAgain={playAgain} onLeave={leaveRoom} />}
      </div>
    </div>
  );
}

/* ───────────────────────── HEADER ───────────────────────── */
function Header({ online, onLeave }) {
  return (
    <div style={S.header}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div style={S.badge}><Trophy size={17} color={T.bg} /></div>
        <div>
          <div style={S.brand}>THE TRANSFER ROOM</div>
          <div style={S.brandSub}>
            {online === false
              ? <span style={S.netTag}><WifiOff size={10} /> solo mode</span>
              : <span style={S.netTag}><Wifi size={10} /> online lobby</span>}
          </div>
        </div>
      </div>
      {onLeave && <button className="ghost" style={S.ghostBtn} onClick={onLeave}><LogOut size={13} /> Leave</button>}
    </div>
  );
}

/* ───────────────────────── HOME / MENU ───────────────────────── */
function Home({ self, busy, error, online, onCreate, onJoin }) {
  const [mode, setMode] = useState(null); // null | 'create' | 'join'
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => { if (self?.name && !name) setName(self.name); }, [self]); // eslint-disable-line
  const ready = name.trim().length >= 1;

  if (!mode) {
    return (
      <div style={{ animation: "fadeUp .45s ease both" }}>
        <div style={S.heroEyebrow}>THE FANTASY TRANSFER MARKET</div>
        <h1 style={S.h1}>Spot the rising star<br />before anyone knows the name.</h1>
        <p style={S.lead}>
          Build a seven-a-side squad from <em>anonymous</em> dossiers — age, league and stats only.
          You're shown the <strong style={{ color: T.ink }}>2016</strong> value; ride three windows
          (<strong style={{ color: T.ink }}>2018 · 2020 · 2022</strong>) and cash out by{" "}
          <strong style={{ color: T.ink }}>2024</strong>. Most options lose value, so choose well.
          Everyone plays the same market on their own phone — biggest profit wins.
        </p>

        <div style={S.menuRow}>
          <button className="cta" style={S.menuBtn} onClick={() => setMode("create")}>
            <Plus size={20} /> Host a game
          </button>
          <button className="ghost" style={S.menuBtnAlt} onClick={() => setMode("join")}>
            <LogIn size={18} /> Join a game
          </button>
        </div>

        <div style={S.howRow}>
          <HowStep n="01" t="Blind draft" d="Pick by the numbers alone." />
          <HowStep n="02" t="Three windows" d="Hold your nerve or cash out." />
          <HowStep n="03" t="Live board" d="Highest profit takes it." />
        </div>
        {online === false && <p style={S.soloNote}>Shared lobbies aren't available here — you'll play solo. Deploy to Netlify (or open in the Claude app) to invite friends.</p>}
      </div>
    );
  }

  const isJoin = mode === "join";
  return (
    <div style={{ animation: "fadeUp .35s ease both" }}>
      <button className="ghost" style={{ ...S.ghostBtn, marginBottom: 18 }} onClick={() => setMode(null)}>← Back</button>
      <div style={S.card}>
        <div style={S.heroEyebrow}>{isJoin ? "JOIN A GAME" : "HOST A GAME"}</div>
        <label style={S.label}>Your manager name</label>
        <input style={S.input} value={name} maxLength={14} placeholder="e.g. The Scout" autoFocus
          onChange={(e) => setName(e.target.value)} />
        {isJoin && (
          <>
            <label style={{ ...S.label, marginTop: 16 }}>Room code</label>
            <input style={{ ...S.input, ...S.codeInput }} value={code} maxLength={4} placeholder="ABCD"
              onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))} />
          </>
        )}
        {error && <div style={S.errorBox}>{error}</div>}
        <button className="cta" disabled={!ready || busy} style={{ ...S.cta, ...(!ready || busy ? S.ctaOff : {}) }}
          onClick={() => (isJoin ? onJoin(name, code) : onCreate(name))}>
          {busy ? <Loader2 size={18} className="spin" /> : isJoin ? <LogIn size={18} /> : <Plus size={18} />}
          {isJoin ? "Join room" : "Create room"}
        </button>
      </div>
    </div>
  );
}
function HowStep({ n, t, d }) {
  return <div style={S.howStep}><div style={S.howNum}>{n}</div><div style={S.howTitle}>{t}</div><div style={S.howDesc}>{d}</div></div>;
}

/* ───────────────────────── LOBBY ───────────────────────── */
function Lobby({ room, self, players, online, error, onStart }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { try { navigator.clipboard.writeText(room); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const share = () => { const text = `Join my Transfer Room game — code ${room}`; if (navigator.share) navigator.share({ title: "The Transfer Room", text }).catch(() => {}); else copy(); };
  const list = players.length ? players : self ? [{ ...self, status: "lobby" }] : [];

  return (
    <div style={{ animation: "fadeUp .4s ease both" }}>
      <div style={S.heroEyebrow}>{online ? "ROOM OPEN · SHARE THE CODE" : "SOLO SESSION · NO SHARED ROOM"}</div>
      <div style={S.codeCard}>
        <div style={{ ...S.codeBig, ...(online ? {} : { color: T.mute, letterSpacing: 4 }) }}>
          {room || "— — — —"}
        </div>
        {online ? (
          <div style={S.codeBtns}>
            <button className="ghost" style={S.codeBtn} onClick={copy}>{copied ? <Check size={14} color={T.green} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}</button>
            <button className="ghost" style={S.codeBtn} onClick={share}><Share2 size={14} /> Share</button>
          </div>
        ) : (
          <p style={S.soloCodeNote}>
            This code can't be shared right now — no live multiplayer backend is connected, so
            nobody else can join. Deploy with the included Netlify function (or open this inside
            the Claude app) to get a real, shareable room code.
          </p>
        )}
      </div>
      {error && <div style={S.errorBox}>{error}</div>}

      <div style={S.lobbyHead}>
        <span style={S.eyebrow}><Users size={12} style={{ marginRight: 6, verticalAlign: -2 }} />IN THE ROOM</span>
        <span style={S.lobbyCount}>{list.length}</span>
      </div>
      <div className="players">
        {list.map((p) => (
          <div key={p.pid} style={{ ...S.playerRow, borderColor: p.pid === self?.pid ? p.color : T.line }}>
            <span style={{ ...S.dot, background: p.color }} />
            <span style={S.playerName}>{p.name || "—"}{p.pid === self?.pid && <span style={S.youTag}> you</span>}</span>
            <span style={S.playerStatus}>{p.status === "done" ? "finished" : p.status === "playing" ? "scouting…" : "ready"}</span>
          </div>
        ))}
      </div>

      <p style={S.lobbyHint}>{online
        ? "Everyone scouts the same market independently — no turns to wait on. Start when ready; late joiners can still jump in and the board keeps updating."
        : "Play through the market and see your profit. Deploy this to Netlify to open real rooms for friends."}</p>
      <button className="cta sticky" style={S.cta} onClick={onStart}>Start scouting <ChevronRight size={18} /></button>
    </div>
  );
}

/* ───────────────────────── DRAFT ───────────────────────── */
function Draft({ slot, pos, candidates, selected, setSelected, confirm, squad, self }) {
  return (
    <div style={{ animation: "fadeUp .35s ease both" }}>
      <ProgressDots total={7} done={slot} self={self} />
      <div style={S.phaseBar}>
        <div>
          <div style={S.eyebrow}>SLOT {slot + 1} OF 7</div>
          <div style={S.phaseTitle}>{POS_LABEL[pos]}</div>
          <div style={S.phaseSub}>Market values shown as of <strong style={{ color: T.gold }}>{YEARS[0]}</strong></div>
        </div>
        <SlotPips squad={squad} />
      </div>
      <div className="cards">
        {candidates.map((c) => (
          <Dossier key={c.id} c={c} valueIdx={0} selected={selected === c.id} onClick={() => setSelected(selected === c.id ? null : c.id)} />
        ))}
      </div>
      <div className="actionbar">
        <div style={S.actionHint}>{selected == null ? "Tap a dossier to line up your signing." : `Sign for ${money(candidates.find((c) => c.id === selected)?.v[0])} (${YEARS[0]})`}</div>
        <button className="cta" disabled={selected == null} style={{ ...S.ctaSm, ...(selected == null ? S.ctaOff : {}) }} onClick={confirm}>Confirm <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
function SlotPips({ squad }) {
  return <div style={S.pips}>{squad.slice(-7).map((h) => <span key={h.hid} style={S.pip}><Lock size={9} style={{ marginRight: 3 }} />{h.slotPos}</span>)}</div>;
}
function ProgressDots({ total, done, self }) {
  return <div style={S.progress}>{Array.from({ length: total }).map((_, i) => <span key={i} style={{ ...S.pdot, background: i < done ? self?.color || T.gold : T.line }} />)}</div>;
}

/* ───────────────── DOSSIER ───────────────── */
function Dossier({ c, valueIdx, selected, onClick, cur, buy, buyIdx }) {
  return (
    <button className="dossier" onClick={onClick}
      style={{ ...S.dossier, borderColor: selected ? T.gold : T.line, boxShadow: selected ? `0 0 0 1.5px ${T.gold}, 0 14px 30px -14px ${T.gold}66` : S.dossier.boxShadow }}>
      <div style={S.dossTop}>
        <span style={S.dossPos}>{c.p}</span>
        <div style={{ textAlign: "right" }}>
          <div style={S.dossVal}>{money(c.v[valueIdx])}</div>
          <div style={S.dossYear}>VALUE · {YEARS[valueIdx]}</div>
        </div>
      </div>
      <div style={S.nameBar}><span style={S.redact} /><Lock size={12} color={T.mute} /><span style={{ ...S.redact, width: "30%" }} /></div>
      <div style={S.metaRow}><Meta k="Age" v={c.age} /><Meta k="Height" v={`${c.h}cm`} /><Meta k="League" v={c.lg} /></div>
      <div style={S.statRows}>
        {Object.entries(c.s).map(([k, v]) => <div key={k} style={S.statRow}><span style={S.statKey}>{k}</span><span style={S.statVal}>{v}</span></div>)}
      </div>
      {cur != null && (
        <div style={S.dossDelta}>
          <span style={S.deltaBuy}>in {money(buy)} ’{String(YEARS[buyIdx]).slice(2)}</span>
          <DeltaPill delta={cur - buy} cur={cur} />
        </div>
      )}
      {selected && <span style={S.check}><Check size={14} color={T.bg} /></span>}
    </button>
  );
}
function Meta({ k, v }) { return <div style={S.metaCell}><div style={S.metaKey}>{k}</div><div style={S.metaVal}>{v}</div></div>; }
function DeltaPill({ delta, cur }) {
  const up = delta >= 0;
  return (
    <span style={{ ...S.deltaPill, color: up ? T.green : T.red, background: up ? "rgba(55,224,139,.10)" : "rgba(255,107,107,.10)", borderColor: up ? "rgba(55,224,139,.35)" : "rgba(255,107,107,.35)" }}>
      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{money(cur)} ({signed(delta)})
    </span>
  );
}

/* ───────────────────────── WINDOW ───────────────────────── */
function WindowView({ windowIdx, stage, squad, card, curIdx, sell, continueReview, freeAgents, emptySlots, buyReplacement, skipSlot, lastSold, realized, self }) {
  const year = WINDOW_YEARS[windowIdx];
  if (stage === "replace") {
    const slot = emptySlots[0];
    const agents = freeAgents(slot.slotPos);
    return (
      <div style={{ animation: "fadeUp .3s ease both" }}>
        <div style={S.phaseBar}>
          <div>
            <div style={S.eyebrow}>WINDOW {windowIdx + 1} · {year} · {emptySlots.length} TO FILL</div>
            <div style={S.phaseTitle}>Replace your {POS_LABEL[slot.slotPos].toLowerCase()}</div>
            <div style={S.phaseSub}>Prices shown as of <strong style={{ color: T.gold }}>{year}</strong></div>
          </div>
        </div>
        {lastSold && (
          <div style={S.soldBanner}><Eye size={15} /><span>Sold <strong style={{ color: T.ink }}>{lastSold.name}</strong></span><span style={{ color: lastSold.profit >= 0 ? T.green : T.red, fontWeight: 700, marginLeft: "auto" }}>{signed(lastSold.profit)}</span></div>
        )}
        {agents.length === 0 ? (
          <div style={S.empty}><p style={{ margin: 0, color: T.mute }}>No free agents left here.</p><button className="cta" style={{ ...S.ctaSm, margin: "14px auto 0" }} onClick={skipSlot}>Leave slot open</button></div>
        ) : (
          <>
            <div className="cards">{agents.map((c) => <Dossier key={c.id} c={c} valueIdx={curIdx} onClick={() => buyReplacement(c.id)} />)}</div>
            <div className="actionbar"><div style={S.actionHint}>Tap a dossier to sign them at the {year} price.</div><button className="ghost" style={S.ghostBtn} onClick={skipSlot}>Leave open</button></div>
          </>
        )}
      </div>
    );
  }

  const live = squad.reduce((s, h) => s + card(h.cardId).v[curIdx], 0);
  return (
    <div style={{ animation: "fadeUp .3s ease both" }}>
      <div style={S.phaseBar}>
        <div>
          <div style={S.eyebrow}>TRANSFER WINDOW {windowIdx + 1} OF 3</div>
          <div style={S.phaseTitle}>{year} valuations</div>
          <div style={S.phaseSub}>Final cash-out at <strong style={{ color: T.gold }}>{YEARS[4]}</strong></div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={S.miniKey}>VALUE NOW</div>
          <div style={{ ...S.miniVal, color: self?.color || T.gold }}>{money(live)}</div>
        </div>
      </div>
      <div style={S.ledger}>
        <Led k="Realized" v={signed(realized)} c={realized >= 0 ? T.green : T.red} icon={<Banknote size={13} />} />
        <Led k="Holdings" v={`${squad.length}`} c={T.ink} icon={<Coins size={13} />} />
      </div>
      <div className="cards">
        {squad.map((h) => {
          const c = card(h.cardId);
          return (
            <div key={h.hid} style={{ position: "relative", paddingBottom: 22 }}>
              <Dossier c={c} valueIdx={curIdx} cur={c.v[curIdx]} buy={h.buyValue} buyIdx={h.buyIdx} />
              <button className="sellBtn" style={S.sellBtn} onClick={() => sell(h.hid)}>Sell &amp; reveal</button>
            </div>
          );
        })}
      </div>
      <div className="actionbar">
        <div style={S.actionHint}>Sell to bank profit and replace, or hold toward {YEARS[4]}.</div>
        <button className="cta" style={S.ctaSm} onClick={continueReview}>{emptySlots.length ? "Sign replacements" : windowIdx < 2 ? "Next window" : "Full time"} <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
function Led({ k, v, c, icon }) {
  return <div style={S.ledCell}><div style={S.ledKey}>{icon}<span style={{ marginLeft: 6 }}>{k}</span></div><div style={{ ...S.ledVal, color: c }}>{v}</div></div>;
}

/* ───────────────────────── RESULTS ───────────────────────── */
function Results({ self, players, room, online, onAgain, onLeave }) {
  const [open, setOpen] = useState(null);
  const finished = players.filter((p) => p.status === "done" && typeof p.total === "number");
  const scouting = players.filter((p) => p.status !== "done");
  const ranked = [...finished].sort((a, b) => b.total - a.total);
  const meDone = ranked.find((p) => p.pid === self?.pid);
  let steal = { delta: -Infinity };
  finished.forEach((p) => (p.squad || []).forEach((s) => { const d = s.fin - s.buy; if (d > steal.delta) steal = { delta: d, n: s.n, mgr: p.name }; }));

  return (
    <div style={{ animation: "fadeUp .4s ease both" }}>
      <div style={S.ftRow}><Trophy size={15} color={T.gold} /><span style={S.eyebrow}>FULL TIME · {YEARS[4]} · LIVE BOARD</span></div>
      {meDone && <div style={S.yourScore}><span style={S.yourLabel}>Your profit</span><span style={{ ...S.yourVal, color: meDone.total >= 0 ? T.green : T.red }}>{signed(meDone.total)}</span></div>}
      {ranked.length === 0 && <p style={{ color: T.mute }}>Waiting for the first manager to finish…</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {ranked.map((p, i) => {
          const me = p.pid === self?.pid, isOpen = open === p.pid;
          return (
            <div key={p.pid} style={{ ...S.boardRow, borderColor: i === 0 ? T.gold : me ? p.color : T.line, background: i === 0 ? "linear-gradient(180deg,rgba(231,185,74,.10),rgba(231,185,74,.02))" : T.surface }}>
              <button style={S.boardHead} onClick={() => setOpen(isOpen ? null : p.pid)}>
                <span style={S.rankNum}>{i === 0 ? <Crown size={18} color={T.gold} /> : `#${i + 1}`}</span>
                <span style={{ ...S.dot, background: p.color }} />
                <span style={S.boardName}>{p.name}{me && <span style={S.youTag}> you</span>}</span>
                <span style={{ ...S.boardTotal, color: p.total >= 0 ? T.green : T.red }}>{signed(p.total)}</span>
                <ChevronRight size={16} color={T.mute} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
              </button>
              {isOpen && <div style={S.revealGrid}>{(p.squad || []).map((s, j) => <RevealCard key={j} s={s} />)}</div>}
            </div>
          );
        })}
      </div>

      {scouting.length > 0 && <div style={S.stillRow}><Loader2 size={13} className="spin" /><span>{scouting.map((p) => p.name).join(", ")} still scouting…</span></div>}
      {steal.delta > -Infinity && (
        <div style={S.stealBanner}><TrendingUp size={15} color={T.green} /><span>Signing of the game · <strong style={{ color: T.ink }}>{steal.mgr}</strong>'s <strong style={{ color: T.gold }}>{steal.n}</strong> <span style={{ color: T.green, fontWeight: 700 }}>{signed(steal.delta)}</span></span></div>
      )}
      <div style={S.endBtns}>
        <button className="cta" style={S.ctaSm} onClick={onAgain}><RotateCcw size={15} /> Play again</button>
        <button className="ghost" style={S.ghostBtn} onClick={onLeave}><LogOut size={13} /> Leave room</button>
      </div>
      {online && room && <p style={S.codeFootnote}>Room <strong style={{ color: T.gold }}>{room}</strong> · share the code to add managers</p>}
    </div>
  );
}
function RevealCard({ s }) {
  const delta = s.fin - s.buy, up = delta >= 0;
  return (
    <div style={S.revealCard}>
      <div style={S.revTop}><span style={S.dossPos}>{s.p}</span><DeltaPill delta={delta} cur={s.fin} /></div>
      <div style={S.revName}>{s.n}</div>
      <div style={S.revMeta}>{s.nat} · {s.lg}</div>
      <Sparkline values={s.v} up={up} />
      <div style={S.revFoot}><span style={S.revFootK}>in {money(s.buy)} ’{String(YEARS[s.buyIdx ?? 0]).slice(2)}</span><span style={S.revFootK}>out {money(s.fin)} ’{String(YEARS[4]).slice(2)}</span></div>
    </div>
  );
}
function Sparkline({ values, up }) {
  const W = 188, H = 44, pad = 3, base = H - 11;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => [pad + (i * (W - pad * 2)) / (values.length - 1), base - pad - ((v - min) / span) * (base - pad * 2)]);
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
  const col = up ? T.green : T.red;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", marginTop: 6 }}>
      <path d={`${d} L${pts[pts.length - 1][0]},${base} L${pts[0][0]},${base} Z`} fill={col} opacity="0.10" />
      <path d={d} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.1" fill={col} />)}
      {YEARS.map((y, i) => <text key={y} x={pts[i][0]} y={H - 1} fill={T.mute} fontSize="7" fontFamily="monospace" textAnchor="middle">{String(y).slice(2)}</text>)}
    </svg>
  );
}

/* ───────────────────────── STYLE ───────────────────────── */
function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      @keyframes spin{to{transform:rotate(360deg)}}
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
      html,body,#root{margin:0;background:${T.bg}}
      .spin{animation:spin 1s linear infinite}
      .wrap{max-width:760px;margin:0 auto;padding:max(14px,env(safe-area-inset-top)) 16px calc(40px + env(safe-area-inset-bottom))}
      .cards{display:grid;grid-template-columns:1fr;gap:12px}
      .players{display:grid;grid-template-columns:1fr;gap:8px}
      @media(min-width:560px){.cards{grid-template-columns:1fr 1fr}.players{grid-template-columns:1fr 1fr}}
      @media(min-width:880px){.cards{grid-template-columns:1fr 1fr 1fr}}
      .dossier{transition:transform .14s ease,border-color .14s ease,box-shadow .14s ease}
      @media(hover:hover){.dossier:hover{transform:translateY(-2px);border-color:#3a5546}}
      .cta{transition:filter .15s ease,transform .15s ease}.cta:active:not(:disabled){transform:translateY(1px)}
      @media(hover:hover){.cta:hover:not(:disabled){filter:brightness(1.07)}}
      .ghost{transition:all .15s ease}@media(hover:hover){.ghost:hover{color:#EAF2EC !important;border-color:#3a5546 !important}}
      @media(hover:hover){.sellBtn:hover{background:#FF6B6B !important;color:#0A100D !important}}
      .actionbar{position:sticky;bottom:10px;z-index:20;display:flex;align-items:center;gap:10px;margin-top:18px;padding:11px 12px 11px 16px;border-radius:14px;background:rgba(16,24,20,.92);backdrop-filter:blur(10px);border:1px solid ${T.line};box-shadow:0 14px 34px -16px #000}
      .cta.sticky{position:sticky;bottom:14px;z-index:20}
      input:focus{outline:none;border-color:${T.gold} !important}
      button:focus-visible,input:focus-visible{outline:2px solid ${T.gold};outline-offset:2px}
      ::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-thumb{background:#26392F;border-radius:6px}
    `}</style>
  );
}

const mono = "'JetBrains Mono',ui-monospace,monospace";
const display = "'Bebas Neue',Impact,sans-serif";
const bodyF = "'Inter',system-ui,sans-serif";
const S = {
  root: { minHeight: "100%", background: `radial-gradient(1100px 560px at 50% -12%, #112019 0%, ${T.bg} 58%)`, color: T.ink, fontFamily: bodyF },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  badge: { width: 36, height: 36, borderRadius: 10, background: T.gold, display: "grid", placeItems: "center", boxShadow: `0 6px 16px -6px ${T.gold}99`, flexShrink: 0 },
  brand: { fontFamily: display, fontSize: "clamp(19px,5vw,23px)", letterSpacing: 1.4, lineHeight: 1 },
  brandSub: { fontSize: 10.5, color: T.mute, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 3 },
  netTag: { display: "inline-flex", alignItems: "center", gap: 5 },
  ghostBtn: { display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: T.mute, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: bodyF },

  heroEyebrow: { fontFamily: mono, fontSize: 11, letterSpacing: 2.5, color: T.gold, fontWeight: 700, textTransform: "uppercase" },
  eyebrow: { fontFamily: mono, fontSize: 10.5, letterSpacing: 2, color: T.gold, fontWeight: 700, textTransform: "uppercase" },
  h1: { fontFamily: display, fontSize: "clamp(34px,8.5vw,52px)", lineHeight: 1, letterSpacing: 0.5, margin: "10px 0 14px" },
  lead: { color: T.mute, fontSize: "clamp(14px,3.7vw,15.5px)", lineHeight: 1.6, margin: 0 },

  menuRow: { display: "grid", gridTemplateColumns: "1fr", gap: 10, margin: "24px 0 8px" },
  menuBtn: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, background: T.gold, color: T.bg, border: "none", borderRadius: 13, padding: "17px", fontSize: 16.5, fontWeight: 800, cursor: "pointer", fontFamily: bodyF, boxShadow: `0 10px 26px -10px ${T.gold}aa` },
  menuBtnAlt: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: T.surface, color: T.ink, border: `1px solid ${T.line}`, borderRadius: 13, padding: "16px", fontSize: 15.5, fontWeight: 700, cursor: "pointer", fontFamily: bodyF },

  howRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, margin: "22px 0" },
  howStep: { background: T.bg2, border: `1px solid ${T.lineSoft}`, borderRadius: 12, padding: "13px 12px 15px" },
  howNum: { fontFamily: mono, fontSize: 11, color: T.gold, fontWeight: 700 },
  howTitle: { fontFamily: display, fontSize: "clamp(17px,4.6vw,20px)", letterSpacing: 0.4, margin: "6px 0 3px" },
  howDesc: { fontSize: 12, color: T.mute, lineHeight: 1.4 },
  soloNote: { fontSize: 12, color: T.mute, lineHeight: 1.5, marginTop: 8 },

  card: { background: T.surface, border: `1px solid ${T.line}`, borderRadius: 16, padding: "20px 18px" },
  label: { display: "block", fontFamily: mono, fontSize: 10.5, letterSpacing: 1.5, color: T.mute, textTransform: "uppercase", margin: "14px 0 8px" },
  input: { width: "100%", background: T.bg2, border: `1px solid ${T.line}`, color: T.ink, borderRadius: 11, padding: "14px 15px", fontSize: 16, fontWeight: 600, fontFamily: bodyF },
  codeInput: { fontFamily: mono, letterSpacing: 10, textAlign: "center", fontSize: 24, textTransform: "uppercase" },
  errorBox: { marginTop: 12, background: "rgba(255,107,107,.08)", border: `1px solid rgba(255,107,107,.3)`, color: T.red, borderRadius: 10, padding: "10px 13px", fontSize: 13 },
  cta: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, width: "100%", marginTop: 16, background: T.gold, color: T.bg, border: "none", borderRadius: 13, padding: "16px 22px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: bodyF, letterSpacing: 0.2, boxShadow: `0 10px 26px -10px ${T.gold}aa` },
  ctaSm: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, background: T.gold, color: T.bg, border: "none", borderRadius: 11, padding: "12px 18px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", fontFamily: bodyF, whiteSpace: "nowrap", boxShadow: `0 8px 20px -10px ${T.gold}aa` },
  ctaOff: { background: T.surface2, color: T.mute, boxShadow: "none", cursor: "not-allowed" },

  codeCard: { background: T.surface, border: `1px solid ${T.gold}55`, borderRadius: 16, padding: "20px 18px", textAlign: "center", marginBottom: 22, boxShadow: `0 0 50px -28px ${T.gold}` },
  codeBig: { fontFamily: display, fontSize: "clamp(52px,16vw,76px)", letterSpacing: "clamp(8px,4vw,18px)", color: T.gold, lineHeight: 1, marginLeft: "clamp(8px,4vw,18px)" },
  codeBtns: { display: "flex", gap: 8, justifyContent: "center", marginTop: 14 },
  codeBtn: { display: "inline-flex", alignItems: "center", gap: 6, background: T.bg2, color: T.mute, border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: bodyF },
  soloCodeNote: { fontSize: 12.5, color: T.mute, lineHeight: 1.55, margin: "14px 4px 0", textAlign: "left" },
  lobbyHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 },
  lobbyCount: { fontFamily: display, fontSize: 22 },
  playerRow: { display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid", borderRadius: 12, padding: "13px 14px" },
  dot: { width: 11, height: 11, borderRadius: 999, flexShrink: 0 },
  playerName: { fontSize: 15, fontWeight: 700 },
  youTag: { fontFamily: mono, fontSize: 10, color: T.gold, letterSpacing: 1, fontWeight: 700 },
  playerStatus: { marginLeft: "auto", fontFamily: mono, fontSize: 11, color: T.mute },
  lobbyHint: { fontSize: 13, color: T.mute, lineHeight: 1.55, margin: "16px 0 4px" },

  progress: { display: "flex", gap: 6, marginBottom: 14 },
  pdot: { height: 5, flex: 1, borderRadius: 3, transition: "background .25s" },
  phaseBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  phaseTitle: { fontFamily: display, fontSize: "clamp(30px,8vw,40px)", letterSpacing: 0.5, lineHeight: 1, marginTop: 5 },
  phaseSub: { fontSize: 12, color: T.mute, marginTop: 6 },
  pips: { display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "flex-end", maxWidth: 200 },
  pip: { display: "inline-flex", alignItems: "center", fontFamily: mono, fontSize: 10, fontWeight: 700, color: T.mute, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6, padding: "3px 7px" },
  miniKey: { fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: T.mute },
  miniVal: { fontFamily: display, fontSize: 28, letterSpacing: 0.5, marginTop: 2 },

  dossier: { textAlign: "left", background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 14, color: T.ink, fontFamily: bodyF, position: "relative", boxShadow: "0 8px 22px -16px #000", overflow: "hidden", width: "100%", cursor: "pointer" },
  dossTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  dossPos: { fontFamily: mono, fontSize: 11, fontWeight: 700, color: T.bg, background: T.gold, padding: "3px 8px", borderRadius: 6, letterSpacing: 1 },
  dossVal: { fontFamily: display, fontSize: 27, letterSpacing: 0.5, lineHeight: 1 },
  dossYear: { fontFamily: mono, fontSize: 8.5, letterSpacing: 1, color: T.mute, marginTop: 2 },
  nameBar: { height: 30, borderRadius: 7, background: T.bg2, border: `1px solid ${T.lineSoft}`, margin: "11px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  redact: { height: 9, width: "30%", borderRadius: 3, background: "#2c4438" },
  metaRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 11 },
  metaCell: { background: T.bg2, borderRadius: 8, padding: "7px 8px", border: `1px solid ${T.lineSoft}`, minWidth: 0 },
  metaKey: { fontFamily: mono, fontSize: 9, letterSpacing: 1, color: T.mute, textTransform: "uppercase" },
  metaVal: { fontSize: 12.5, fontWeight: 700, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  statRows: { display: "flex", flexDirection: "column", gap: 5 },
  statRow: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${T.lineSoft}`, paddingTop: 6 },
  statKey: { fontSize: 12, color: T.mute },
  statVal: { fontFamily: mono, fontSize: 13, fontWeight: 700 },
  dossDelta: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 11, paddingTop: 9, borderTop: `1px solid ${T.line}` },
  deltaBuy: { fontFamily: mono, fontSize: 10.5, color: T.mute },
  deltaPill: { display: "inline-flex", alignItems: "center", gap: 4, fontFamily: mono, fontSize: 11, fontWeight: 700, border: "1px solid", borderRadius: 999, padding: "3px 8px" },
  check: { position: "absolute", top: 12, right: 12, width: 24, height: 24, borderRadius: 999, background: T.gold, display: "grid", placeItems: "center" },
  actionHint: { fontSize: 13, color: T.mute, flex: 1, minWidth: 0 },

  ledger: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 14 },
  ledCell: { background: T.bg2, border: `1px solid ${T.lineSoft}`, borderRadius: 11, padding: "11px 13px" },
  ledKey: { display: "flex", alignItems: "center", fontFamily: mono, fontSize: 10, letterSpacing: 1, color: T.mute, textTransform: "uppercase" },
  ledVal: { fontFamily: display, fontSize: 23, letterSpacing: 0.5, marginTop: 3 },
  sellBtn: { position: "absolute", left: 14, right: 14, bottom: 0, background: T.surface2, color: T.red, border: `1px solid ${T.red}`, borderRadius: 9, padding: "9px 0", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: bodyF, transition: "all .15s ease", zIndex: 4 },
  soldBanner: { display: "flex", alignItems: "center", gap: 9, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 15px", marginBottom: 14, fontSize: 13.5, color: T.mute },
  empty: { background: T.surface, border: `1px solid ${T.line}`, borderRadius: 13, padding: "24px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },

  ftRow: { display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 16 },
  yourScore: { display: "flex", alignItems: "center", justifyContent: "space-between", background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: "16px 18px", marginBottom: 18 },
  yourLabel: { fontFamily: mono, fontSize: 11, letterSpacing: 1.5, color: T.mute, textTransform: "uppercase" },
  yourVal: { fontFamily: display, fontSize: 36, letterSpacing: 0.5 },
  boardRow: { border: "1px solid", borderRadius: 14, overflow: "hidden" },
  boardHead: { display: "flex", alignItems: "center", gap: 11, width: "100%", background: "transparent", border: "none", color: T.ink, padding: "15px", cursor: "pointer", fontFamily: bodyF },
  rankNum: { fontFamily: display, fontSize: 22, color: T.mute, width: 26, textAlign: "center", display: "inline-flex", justifyContent: "center" },
  boardName: { fontSize: 16, fontWeight: 700 },
  boardTotal: { marginLeft: "auto", fontFamily: mono, fontSize: 15, fontWeight: 700 },
  revealGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, padding: "0 13px 14px" },
  stillRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 14, color: T.mute, fontSize: 13 },
  stealBanner: { display: "flex", alignItems: "center", gap: 10, background: "rgba(55,224,139,.06)", border: `1px solid rgba(55,224,139,.25)`, borderRadius: 11, padding: "12px 15px", marginTop: 16, fontSize: 13, color: T.mute },
  revealCard: { background: T.bg2, border: `1px solid ${T.line}`, borderRadius: 12, padding: 12 },
  revTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 },
  revName: { fontFamily: display, fontSize: 20, letterSpacing: 0.4 },
  revMeta: { fontSize: 11, color: T.mute, marginTop: 1 },
  revFoot: { display: "flex", justifyContent: "space-between", marginTop: 4 },
  revFootK: { fontFamily: mono, fontSize: 10.5, color: T.mute },
  endBtns: { display: "flex", gap: 10, marginTop: 22, alignItems: "center" },
  codeFootnote: { fontSize: 12, color: T.mute, marginTop: 14, textAlign: "center" },
};
