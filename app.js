(() => {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const { useState, useEffect, useMemo, useRef, useCallback } = React;
  const ICON_PATHS = {
    crown: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M2 18h20" }), /* @__PURE__ */ React.createElement("path", { d: "m4 6 4 5 4-7 4 7 4-5-2 11H6z" })),
    trendingUp: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 7 22 7 22 13" })),
    trendingDown: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 17 22 17 22 11" })),
    lock: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })),
    coins: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "8", cy: "8", r: "6" }), /* @__PURE__ */ React.createElement("path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18" }), /* @__PURE__ */ React.createElement("path", { d: "M7 6h1.5v4" })),
    chevronRight: /* @__PURE__ */ React.createElement("polyline", { points: "9 18 15 12 9 6" }),
    rotateCcw: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }), /* @__PURE__ */ React.createElement("path", { d: "M3 3v5h5" })),
    eye: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })),
    trophy: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), /* @__PURE__ */ React.createElement("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), /* @__PURE__ */ React.createElement("path", { d: "M4 22h16" }), /* @__PURE__ */ React.createElement("path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }), /* @__PURE__ */ React.createElement("path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }), /* @__PURE__ */ React.createElement("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" })),
    banknote: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M6 12h.01M18 12h.01" })),
    users: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })),
    copy: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })),
    check: /* @__PURE__ */ React.createElement("polyline", { points: "20 6 9 17 4 12" }),
    logOut: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 17 21 12 16 7" }), /* @__PURE__ */ React.createElement("line", { x1: "21", x2: "9", y1: "12", y2: "12" })),
    share2: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "5", r: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "12", r: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "19", r: "3" }), /* @__PURE__ */ React.createElement("line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }), /* @__PURE__ */ React.createElement("line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" })),
    wifi: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 13a10 10 0 0 1 14 0" }), /* @__PURE__ */ React.createElement("path", { d: "M8.5 16.5a5 5 0 0 1 7 0" }), /* @__PURE__ */ React.createElement("path", { d: "M2 8.82a15 15 0 0 1 20 0" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12.01", y1: "20", y2: "20" })),
    wifiOff: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "2", x2: "22", y1: "2", y2: "22" }), /* @__PURE__ */ React.createElement("path", { d: "M8.5 16.5a5 5 0 0 1 7 0" }), /* @__PURE__ */ React.createElement("path", { d: "M2 8.82a15 15 0 0 1 4.11-2.95" }), /* @__PURE__ */ React.createElement("path", { d: "M10.66 5c4.01-.36 8.14.9 11.34 3.76" }), /* @__PURE__ */ React.createElement("path", { d: "M16.85 11.25a10 10 0 0 1 2.22 1.68" }), /* @__PURE__ */ React.createElement("path", { d: "M5 13a10 10 0 0 1 5.24-2.76" }), /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12.01", y1: "20", y2: "20" })),
    loader2: /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }),
    plus: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React.createElement("path", { d: "M12 5v14" })),
    logIn: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "10 17 15 12 10 7" }), /* @__PURE__ */ React.createElement("line", { x1: "15", x2: "3", y1: "12", y2: "12" }))
  };
  function Ic({ name, size = 16, color, className, style }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        className,
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { color, flexShrink: 0, ...style || {} }
      },
      ICON_PATHS[name] || null
    );
  }
  const mkIcon = (n) => (p) => /* @__PURE__ */ React.createElement(Ic, { name: n, ...p });
  const Crown = mkIcon("crown");
  const TrendingUp = mkIcon("trendingUp");
  const TrendingDown = mkIcon("trendingDown");
  const Lock = mkIcon("lock");
  const Coins = mkIcon("coins");
  const ChevronRight = mkIcon("chevronRight");
  const RotateCcw = mkIcon("rotateCcw");
  const Eye = mkIcon("eye");
  const Trophy = mkIcon("trophy");
  const Banknote = mkIcon("banknote");
  const Users = mkIcon("users");
  const Copy = mkIcon("copy");
  const Check = mkIcon("check");
  const LogOut = mkIcon("logOut");
  const Share2 = mkIcon("share2");
  const Wifi = mkIcon("wifi");
  const WifiOff = mkIcon("wifiOff");
  const Loader2 = mkIcon("loader2");
  const Plus = mkIcon("plus");
  const LogIn = mkIcon("logIn");
  const T = {
    bg: "#0A100D",
    bg2: "#0E1714",
    surface: "#14201B",
    surface2: "#1B2A23",
    line: "#26392F",
    lineSoft: "#1E2E26",
    ink: "#EAF2EC",
    mute: "#8AA293",
    gold: "#E7B94A",
    green: "#37E08B",
    red: "#FF6B6B",
    blue: "#5BC0EB"
  };
  const PALETTE = ["#E7B94A", "#5BC0EB", "#C77DFF", "#37E08B", "#FF8FA3", "#7AE0C8", "#F4A259", "#9CD3FF"];
  const POOL = (window.PLAYERS || []).map((c, i) => ({ ...c, id: i }));
  const POS_LABEL = { GK: "Goalkeeper", CB: "Centre-back", MID: "Midfielder", ATT: "Attacker" };
  const DRAFT_ROUNDS = ["GK", "CB", "CB", "MID", "MID", "ATT", "ATT"];
  const YEARS = [2016, 2018, 2020, 2022, 2024];
  const WINDOW_YEARS = [2018, 2020, 2022];
  const CARDS_PER_ROUND = 5;
  const FALLERS_MIN = 3;
  const money = (m) => {
    if (m == null) return "\u2014";
    if (m < 1) return `\u20AC${Math.round(m * 1e3)}K`;
    return `\u20AC${(Math.round(m * 10) / 10).toString().replace(/\.0$/, "")}M`;
  };
  const signed = (m) => (m >= 0 ? "+" : "\u2212") + money(Math.abs(m));
  const uid = /* @__PURE__ */ (() => {
    let n = 0;
    return () => `h${++n}_${Math.random().toString(36).slice(2, 6)}`;
  })();
  const genCode = () => {
    const A = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    return Array.from({ length: 4 }, () => A[Math.floor(Math.random() * A.length)]).join("");
  };
  const genPid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
  const colorFor = (pid) => {
    let h = 0;
    for (let i = 0; i < pid.length; i++) h = h * 31 + pid.charCodeAt(i) >>> 0;
    return PALETTE[h % PALETTE.length];
  };
  function makeRng(seed) {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }
    return () => {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rng) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  let _backend = null;
  async function detectBackend() {
    if (_backend) return _backend;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 2500);
      const r = await fetch("/api/room", { method: "GET", signal: ctrl.signal });
      clearTimeout(t);
      const d = await r.json();
      if (r.ok && d && d.ok) {
        _backend = "fn";
        return _backend;
      }
    } catch (e) {
    }
    if (typeof window !== "undefined" && window.storage && window.storage.get) {
      _backend = "kv";
      return _backend;
    }
    _backend = "solo";
    return _backend;
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
      if (b === "fn") {
        const d = await fnCall({ action: "meta", code });
        return !!d.exists;
      }
      if (b === "kv") {
        try {
          const r = await window.storage.get(`tr:${code}:meta`, true);
          return !!r;
        } catch (e) {
          return false;
        }
      }
      return !!_local[code];
    },
    async createRoom(code, player) {
      const b = await detectBackend();
      if (b === "fn") {
        await fnCall({ action: "create", code, player });
        return;
      }
      if (b === "kv") {
        await window.storage.set(`tr:${code}:meta`, JSON.stringify({ code }), true);
        await window.storage.set(`tr:${code}:p:${player.pid}`, JSON.stringify(player), true);
        return;
      }
      _local[code] = { [player.pid]: player };
    },
    async upsert(code, player) {
      const b = await detectBackend();
      if (b === "fn") {
        await fnCall({ action: "upsert", code, player });
        return;
      }
      if (b === "kv") {
        await window.storage.set(`tr:${code}:p:${player.pid}`, JSON.stringify(player), true);
        return;
      }
      (_local[code] = _local[code] || {})[player.pid] = player;
    },
    async players(code) {
      const b = await detectBackend();
      if (b === "fn") {
        const d = await fnCall({ action: "players", code });
        return d.players || [];
      }
      if (b === "kv") {
        try {
          const ks = await window.storage.list(`tr:${code}:p:`, true);
          const keys = ks && ks.keys || [];
          const recs = await Promise.all(keys.map(async (k) => {
            try {
              const r = await window.storage.get(k, true);
              return r ? JSON.parse(r.value) : null;
            } catch (e) {
              return null;
            }
          }));
          return recs.filter(Boolean);
        } catch (e) {
          return [];
        }
      }
      return Object.values(_local[code] || {});
    }
  };
  function TransferRoom() {
    const [screen, setScreen] = useState("home");
    const [self, setSelf] = useState(null);
    const [room, setRoom] = useState(null);
    const [isHost, setIsHost] = useState(false);
    const [players, setPlayers] = useState([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [online, setOnline] = useState(null);
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
    useEffect(() => {
      (async () => {
        const b = await net.mode();
        setOnline(b !== "solo");
        let me = null;
        if (b === "kv") me = await (async () => {
          try {
            const r = await window.storage.get("tr:self", false);
            return r ? JSON.parse(r.value) : null;
          } catch (e) {
            return null;
          }
        })();
        else {
          try {
            const raw = localStorage.getItem("tr:self");
            me = raw ? JSON.parse(raw) : null;
          } catch (e) {
          }
        }
        if (me && me.pid) setSelf(me);
        else {
          const pid = genPid();
          setSelf({ pid, color: colorFor(pid), name: "" });
        }
      })();
    }, []);
    function persistSelf(s) {
      setSelf(s);
      if (_backend === "kv") window.storage.set("tr:self", JSON.stringify(s), false);
      else {
        try {
          localStorage.setItem("tr:self", JSON.stringify(s));
        } catch (e) {
        }
      }
    }
    function ensureSelf(name) {
      const s = { pid: (self == null ? void 0 : self.pid) || genPid(), name: name.trim(), color: (self == null ? void 0 : self.color) || colorFor((self == null ? void 0 : self.pid) || "x") };
      persistSelf(s);
      return s;
    }
    const writeSelf = (code, s, status, extra = {}) => net.upsert(code, { pid: s.pid, name: s.name, color: s.color, status, t: Date.now(), ...extra });
    const pollRef = useRef();
    const loadRoom = useCallback(async (code) => {
      if (code) setPlayers(await net.players(code));
    }, []);
    useEffect(() => {
      clearInterval(pollRef.current);
      if ((screen === "lobby" || screen === "done") && room) {
        loadRoom(room);
        if (online) pollRef.current = setInterval(() => loadRoom(room), 3e3);
      }
      return () => clearInterval(pollRef.current);
    }, [screen, room, online, loadRoom]);
    async function createRoom(name) {
      setError("");
      setBusy(true);
      const s = ensureSelf(name);
      const code = online ? genCode() : "SOLO";
      try {
        await net.createRoom(code, { pid: s.pid, name: s.name, color: s.color, status: "lobby", t: Date.now() });
      } catch (e) {
        setError("Created your code, but couldn't reach the room server \u2014 others may not be able to join yet.");
      }
      setRoom(code);
      setIsHost(true);
      setBusy(false);
      setScreen("lobby");
    }
    async function joinRoom(name, codeRaw) {
      setError("");
      const code = codeRaw.trim().toUpperCase();
      if (code.length < 3) {
        setError("Enter the room code your host shared.");
        return;
      }
      setBusy(true);
      const s = ensureSelf(name);
      if (online && !await net.roomExists(code)) {
        setBusy(false);
        setError(`No room "${code}". Double-check with the host.`);
        return;
      }
      await writeSelf(code, s, "lobby");
      setRoom(code);
      setIsHost(false);
      setBusy(false);
      setScreen("lobby");
    }
    function newGameState() {
      setDraftSlot(0);
      setSquad([]);
      setRealized(0);
      setWindowIdx(0);
      setWinStage("review");
      setEmptySlots([]);
      setLastSold(null);
      setRevealed({});
      setSelected(null);
    }
    function startGame() {
      newGameState();
      if (room && self) writeSelf(room, self, "playing");
      setScreen("play");
    }
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
      else {
        setWindowIdx(0);
        setWinStage("review");
        setScreen("playWin");
      }
    }
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
    function continueReview() {
      if (emptySlots.length) setWinStage("replace");
      else nextWindow();
    }
    function buyReplacement(cardId) {
      const c = card(cardId);
      const slot = emptySlots[0];
      setSquad((sq) => [...sq, { hid: uid(), cardId: c.id, slotPos: slot.slotPos, buyValue: c.v[curIdx], buyIdx: curIdx }]);
      const rest = emptySlots.slice(1);
      setEmptySlots(rest);
      if (!rest.length) {
        setWinStage("review");
        nextWindow();
      }
    }
    function skipSlot() {
      const rest = emptySlots.slice(1);
      setEmptySlots(rest);
      if (!rest.length) {
        setWinStage("review");
        nextWindow();
      }
    }
    function nextWindow() {
      setLastSold(null);
      if (windowIdx < 2) {
        setWindowIdx((w) => w + 1);
        setWinStage("review");
      } else finishGame();
    }
    function finishGame() {
      const held = squad.reduce((s, h) => s + (card(h.cardId).v[4] - h.buyValue), 0);
      const total = realized + held;
      const summary = squad.map((h) => {
        const c = card(h.cardId);
        return { n: c.n, p: c.p, nat: c.nat, lg: c.lg, buy: h.buyValue, buyIdx: h.buyIdx, fin: c.v[4], v: c.v };
      });
      if (room && self) writeSelf(room, self, "done", { total, squad: summary });
      setScreen("done");
    }
    function leaveRoom() {
      clearInterval(pollRef.current);
      setRoom(null);
      setIsHost(false);
      setPlayers([]);
      setScreen("home");
    }
    function playAgain() {
      newGameState();
      if (room && self) writeSelf(room, self, "playing");
      setScreen("play");
    }
    const screenKey = screen === "playWin" ? "play" : screen;
    return /* @__PURE__ */ React.createElement("div", { style: S.root }, /* @__PURE__ */ React.createElement("div", { className: "wrap" }, /* @__PURE__ */ React.createElement(Header, { online, onLeave: room ? leaveRoom : null }), screenKey === "home" && /* @__PURE__ */ React.createElement(Home, { self, busy, error, online, onCreate: createRoom, onJoin: joinRoom }), screenKey === "lobby" && /* @__PURE__ */ React.createElement(Lobby, { room, self, players, online, error, onStart: startGame }), screen === "play" && /* @__PURE__ */ React.createElement(Draft, { slot: draftSlot, pos: roundPos, candidates: draftCandidates, selected, setSelected, confirm: confirmDraft, squad, self }), screen === "playWin" && /* @__PURE__ */ React.createElement(WindowView, { windowIdx, stage: winStage, squad, card, curIdx, sell, continueReview, freeAgents, emptySlots, buyReplacement, skipSlot, lastSold, realized, self }), screenKey === "done" && /* @__PURE__ */ React.createElement(Results, { self, players, room, online, onAgain: playAgain, onLeave: leaveRoom })));
  }
  function Header({ online, onLeave }) {
    return /* @__PURE__ */ React.createElement("div", { style: S.header }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("div", { style: S.badge }, /* @__PURE__ */ React.createElement(Trophy, { size: 17, color: T.bg })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.brand }, "THE TRANSFER ROOM"), /* @__PURE__ */ React.createElement("div", { style: S.brandSub }, online === false ? /* @__PURE__ */ React.createElement("span", { style: S.netTag }, /* @__PURE__ */ React.createElement(WifiOff, { size: 10 }), " solo mode") : /* @__PURE__ */ React.createElement("span", { style: S.netTag }, /* @__PURE__ */ React.createElement(Wifi, { size: 10 }), " online lobby")))), onLeave && /* @__PURE__ */ React.createElement("button", { className: "ghost", style: S.ghostBtn, onClick: onLeave }, /* @__PURE__ */ React.createElement(LogOut, { size: 13 }), " Leave"));
  }
  function Home({ self, busy, error, online, onCreate, onJoin }) {
    const [mode, setMode] = useState(null);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    useEffect(() => {
      if ((self == null ? void 0 : self.name) && !name) setName(self.name);
    }, [self]);
    const ready = name.trim().length >= 1;
    if (!mode) {
      return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .45s ease both" } }, /* @__PURE__ */ React.createElement("div", { style: S.heroEyebrow }, "THE FANTASY TRANSFER MARKET"), /* @__PURE__ */ React.createElement("h1", { style: S.h1 }, "Spot the rising star", /* @__PURE__ */ React.createElement("br", null), "before anyone knows the name."), /* @__PURE__ */ React.createElement("p", { style: S.lead }, "Build a seven-a-side squad from ", /* @__PURE__ */ React.createElement("em", null, "anonymous"), " dossiers \u2014 age, league and stats only. You're shown the ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, "2016"), " value; ride three windows (", /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, "2018 \xB7 2020 \xB7 2022"), ") and cash out by", " ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, "2024"), ". Most options lose value, so choose well. Everyone plays the same market on their own phone \u2014 biggest profit wins."), /* @__PURE__ */ React.createElement("div", { style: S.menuRow }, /* @__PURE__ */ React.createElement("button", { className: "cta", style: S.menuBtn, onClick: () => setMode("create") }, /* @__PURE__ */ React.createElement(Plus, { size: 20 }), " Host a game"), /* @__PURE__ */ React.createElement("button", { className: "ghost", style: S.menuBtnAlt, onClick: () => setMode("join") }, /* @__PURE__ */ React.createElement(LogIn, { size: 18 }), " Join a game")), /* @__PURE__ */ React.createElement("div", { style: S.howRow }, /* @__PURE__ */ React.createElement(HowStep, { n: "01", t: "Blind draft", d: "Pick by the numbers alone." }), /* @__PURE__ */ React.createElement(HowStep, { n: "02", t: "Three windows", d: "Hold your nerve or cash out." }), /* @__PURE__ */ React.createElement(HowStep, { n: "03", t: "Live board", d: "Highest profit takes it." })), online === false && /* @__PURE__ */ React.createElement("p", { style: S.soloNote }, "Shared lobbies aren't available here \u2014 you'll play solo. Deploy to Netlify (or open in the Claude app) to invite friends."));
    }
    const isJoin = mode === "join";
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .35s ease both" } }, /* @__PURE__ */ React.createElement("button", { className: "ghost", style: { ...S.ghostBtn, marginBottom: 18 }, onClick: () => setMode(null) }, "\u2190 Back"), /* @__PURE__ */ React.createElement("div", { style: S.card }, /* @__PURE__ */ React.createElement("div", { style: S.heroEyebrow }, isJoin ? "JOIN A GAME" : "HOST A GAME"), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Your manager name"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        value: name,
        maxLength: 14,
        placeholder: "e.g. The Scout",
        autoFocus: true,
        onChange: (e) => setName(e.target.value)
      }
    ), isJoin && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: { ...S.label, marginTop: 16 } }, "Room code"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: { ...S.input, ...S.codeInput },
        value: code,
        maxLength: 4,
        placeholder: "ABCD",
        onChange: (e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
      }
    )), error && /* @__PURE__ */ React.createElement("div", { style: S.errorBox }, error), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "cta",
        disabled: !ready || busy,
        style: { ...S.cta, ...!ready || busy ? S.ctaOff : {} },
        onClick: () => isJoin ? onJoin(name, code) : onCreate(name)
      },
      busy ? /* @__PURE__ */ React.createElement(Loader2, { size: 18, className: "spin" }) : isJoin ? /* @__PURE__ */ React.createElement(LogIn, { size: 18 }) : /* @__PURE__ */ React.createElement(Plus, { size: 18 }),
      isJoin ? "Join room" : "Create room"
    )));
  }
  function HowStep({ n, t, d }) {
    return /* @__PURE__ */ React.createElement("div", { style: S.howStep }, /* @__PURE__ */ React.createElement("div", { style: S.howNum }, n), /* @__PURE__ */ React.createElement("div", { style: S.howTitle }, t), /* @__PURE__ */ React.createElement("div", { style: S.howDesc }, d));
  }
  function Lobby({ room, self, players, online, error, onStart }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
      try {
        navigator.clipboard.writeText(room);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (e) {
      }
    };
    const share = () => {
      const text = `Join my Transfer Room game \u2014 code ${room}`;
      if (navigator.share) navigator.share({ title: "The Transfer Room", text }).catch(() => {
      });
      else copy();
    };
    const list = players.length ? players : self ? [{ ...self, status: "lobby" }] : [];
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .4s ease both" } }, /* @__PURE__ */ React.createElement("div", { style: S.heroEyebrow }, online ? "ROOM OPEN \xB7 SHARE THE CODE" : "SOLO SESSION \xB7 NO SHARED ROOM"), /* @__PURE__ */ React.createElement("div", { style: S.codeCard }, /* @__PURE__ */ React.createElement("div", { style: { ...S.codeBig, ...online ? {} : { color: T.mute, letterSpacing: 4 } } }, room || "\u2014 \u2014 \u2014 \u2014"), online ? /* @__PURE__ */ React.createElement("div", { style: S.codeBtns }, /* @__PURE__ */ React.createElement("button", { className: "ghost", style: S.codeBtn, onClick: copy }, copied ? /* @__PURE__ */ React.createElement(Check, { size: 14, color: T.green }) : /* @__PURE__ */ React.createElement(Copy, { size: 14 }), " ", copied ? "Copied" : "Copy"), /* @__PURE__ */ React.createElement("button", { className: "ghost", style: S.codeBtn, onClick: share }, /* @__PURE__ */ React.createElement(Share2, { size: 14 }), " Share")) : /* @__PURE__ */ React.createElement("p", { style: S.soloCodeNote }, "This code can't be shared right now \u2014 no live multiplayer backend is connected, so nobody else can join. Deploy with the included Netlify function (or open this inside the Claude app) to get a real, shareable room code.")), error && /* @__PURE__ */ React.createElement("div", { style: S.errorBox }, error), /* @__PURE__ */ React.createElement("div", { style: S.lobbyHead }, /* @__PURE__ */ React.createElement("span", { style: S.eyebrow }, /* @__PURE__ */ React.createElement(Users, { size: 12, style: { marginRight: 6, verticalAlign: -2 } }), "IN THE ROOM"), /* @__PURE__ */ React.createElement("span", { style: S.lobbyCount }, list.length)), /* @__PURE__ */ React.createElement("div", { className: "players" }, list.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.pid, style: { ...S.playerRow, borderColor: p.pid === (self == null ? void 0 : self.pid) ? p.color : T.line } }, /* @__PURE__ */ React.createElement("span", { style: { ...S.dot, background: p.color } }), /* @__PURE__ */ React.createElement("span", { style: S.playerName }, p.name || "\u2014", p.pid === (self == null ? void 0 : self.pid) && /* @__PURE__ */ React.createElement("span", { style: S.youTag }, " you")), /* @__PURE__ */ React.createElement("span", { style: S.playerStatus }, p.status === "done" ? "finished" : p.status === "playing" ? "scouting\u2026" : "ready")))), /* @__PURE__ */ React.createElement("p", { style: S.lobbyHint }, online ? "Everyone scouts the same market independently \u2014 no turns to wait on. Start when ready; late joiners can still jump in and the board keeps updating." : "Play through the market and see your profit. Deploy this to Netlify to open real rooms for friends."), /* @__PURE__ */ React.createElement("button", { className: "cta sticky", style: S.cta, onClick: onStart }, "Start scouting ", /* @__PURE__ */ React.createElement(ChevronRight, { size: 18 })));
  }
  function Draft({ slot, pos, candidates, selected, setSelected, confirm, squad, self }) {
    var _a;
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .35s ease both" } }, /* @__PURE__ */ React.createElement(ProgressDots, { total: 7, done: slot, self }), /* @__PURE__ */ React.createElement("div", { style: S.phaseBar }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.eyebrow }, "SLOT ", slot + 1, " OF 7"), /* @__PURE__ */ React.createElement("div", { style: S.phaseTitle }, POS_LABEL[pos]), /* @__PURE__ */ React.createElement("div", { style: S.phaseSub }, "Market values shown as of ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.gold } }, YEARS[0]))), /* @__PURE__ */ React.createElement(SlotPips, { squad })), /* @__PURE__ */ React.createElement("div", { className: "cards" }, candidates.map((c) => /* @__PURE__ */ React.createElement(Dossier, { key: c.id, c, valueIdx: 0, selected: selected === c.id, onClick: () => setSelected(selected === c.id ? null : c.id) }))), /* @__PURE__ */ React.createElement("div", { className: "actionbar" }, /* @__PURE__ */ React.createElement("div", { style: S.actionHint }, selected == null ? "Tap a dossier to line up your signing." : `Sign for ${money((_a = candidates.find((c) => c.id === selected)) == null ? void 0 : _a.v[0])} (${YEARS[0]})`), /* @__PURE__ */ React.createElement("button", { className: "cta", disabled: selected == null, style: { ...S.ctaSm, ...selected == null ? S.ctaOff : {} }, onClick: confirm }, "Confirm ", /* @__PURE__ */ React.createElement(ChevronRight, { size: 16 }))));
  }
  function SlotPips({ squad }) {
    return /* @__PURE__ */ React.createElement("div", { style: S.pips }, squad.slice(-7).map((h) => /* @__PURE__ */ React.createElement("span", { key: h.hid, style: S.pip }, /* @__PURE__ */ React.createElement(Lock, { size: 9, style: { marginRight: 3 } }), h.slotPos)));
  }
  function ProgressDots({ total, done, self }) {
    return /* @__PURE__ */ React.createElement("div", { style: S.progress }, Array.from({ length: total }).map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { ...S.pdot, background: i < done ? (self == null ? void 0 : self.color) || T.gold : T.line } })));
  }
  function Dossier({ c, valueIdx, selected, onClick, cur, buy, buyIdx }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "dossier",
        onClick,
        style: { ...S.dossier, borderColor: selected ? T.gold : T.line, boxShadow: selected ? `0 0 0 1.5px ${T.gold}, 0 14px 30px -14px ${T.gold}66` : S.dossier.boxShadow }
      },
      /* @__PURE__ */ React.createElement("div", { style: S.dossTop }, /* @__PURE__ */ React.createElement("span", { style: S.dossPos }, c.p), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: S.dossVal }, money(c.v[valueIdx])), /* @__PURE__ */ React.createElement("div", { style: S.dossYear }, "VALUE \xB7 ", YEARS[valueIdx]))),
      /* @__PURE__ */ React.createElement("div", { style: S.nameBar }, /* @__PURE__ */ React.createElement("span", { style: S.redact }), /* @__PURE__ */ React.createElement(Lock, { size: 12, color: T.mute }), /* @__PURE__ */ React.createElement("span", { style: { ...S.redact, width: "30%" } })),
      /* @__PURE__ */ React.createElement("div", { style: S.metaRow }, /* @__PURE__ */ React.createElement(Meta, { k: "Age", v: c.age }), /* @__PURE__ */ React.createElement(Meta, { k: "Height", v: `${c.h}cm` }), /* @__PURE__ */ React.createElement(Meta, { k: "League", v: c.lg })),
      /* @__PURE__ */ React.createElement("div", { style: S.statRows }, Object.entries(c.s).map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: S.statRow }, /* @__PURE__ */ React.createElement("span", { style: S.statKey }, k), /* @__PURE__ */ React.createElement("span", { style: S.statVal }, v)))),
      cur != null && /* @__PURE__ */ React.createElement("div", { style: S.dossDelta }, /* @__PURE__ */ React.createElement("span", { style: S.deltaBuy }, "in ", money(buy), " \u2019", String(YEARS[buyIdx]).slice(2)), /* @__PURE__ */ React.createElement(DeltaPill, { delta: cur - buy, cur })),
      selected && /* @__PURE__ */ React.createElement("span", { style: S.check }, /* @__PURE__ */ React.createElement(Check, { size: 14, color: T.bg }))
    );
  }
  function Meta({ k, v }) {
    return /* @__PURE__ */ React.createElement("div", { style: S.metaCell }, /* @__PURE__ */ React.createElement("div", { style: S.metaKey }, k), /* @__PURE__ */ React.createElement("div", { style: S.metaVal }, v));
  }
  function DeltaPill({ delta, cur }) {
    const up = delta >= 0;
    return /* @__PURE__ */ React.createElement("span", { style: { ...S.deltaPill, color: up ? T.green : T.red, background: up ? "rgba(55,224,139,.10)" : "rgba(255,107,107,.10)", borderColor: up ? "rgba(55,224,139,.35)" : "rgba(255,107,107,.35)" } }, up ? /* @__PURE__ */ React.createElement(TrendingUp, { size: 12 }) : /* @__PURE__ */ React.createElement(TrendingDown, { size: 12 }), money(cur), " (", signed(delta), ")");
  }
  function WindowView({ windowIdx, stage, squad, card, curIdx, sell, continueReview, freeAgents, emptySlots, buyReplacement, skipSlot, lastSold, realized, self }) {
    const year = WINDOW_YEARS[windowIdx];
    if (stage === "replace") {
      const slot = emptySlots[0];
      const agents = freeAgents(slot.slotPos);
      return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .3s ease both" } }, /* @__PURE__ */ React.createElement("div", { style: S.phaseBar }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.eyebrow }, "WINDOW ", windowIdx + 1, " \xB7 ", year, " \xB7 ", emptySlots.length, " TO FILL"), /* @__PURE__ */ React.createElement("div", { style: S.phaseTitle }, "Replace your ", POS_LABEL[slot.slotPos].toLowerCase()), /* @__PURE__ */ React.createElement("div", { style: S.phaseSub }, "Prices shown as of ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.gold } }, year)))), lastSold && /* @__PURE__ */ React.createElement("div", { style: S.soldBanner }, /* @__PURE__ */ React.createElement(Eye, { size: 15 }), /* @__PURE__ */ React.createElement("span", null, "Sold ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, lastSold.name)), /* @__PURE__ */ React.createElement("span", { style: { color: lastSold.profit >= 0 ? T.green : T.red, fontWeight: 700, marginLeft: "auto" } }, signed(lastSold.profit))), agents.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: S.empty }, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, color: T.mute } }, "No free agents left here."), /* @__PURE__ */ React.createElement("button", { className: "cta", style: { ...S.ctaSm, margin: "14px auto 0" }, onClick: skipSlot }, "Leave slot open")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "cards" }, agents.map((c) => /* @__PURE__ */ React.createElement(Dossier, { key: c.id, c, valueIdx: curIdx, onClick: () => buyReplacement(c.id) }))), /* @__PURE__ */ React.createElement("div", { className: "actionbar" }, /* @__PURE__ */ React.createElement("div", { style: S.actionHint }, "Tap a dossier to sign them at the ", year, " price."), /* @__PURE__ */ React.createElement("button", { className: "ghost", style: S.ghostBtn, onClick: skipSlot }, "Leave open"))));
    }
    const live = squad.reduce((s, h) => s + card(h.cardId).v[curIdx], 0);
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .3s ease both" } }, /* @__PURE__ */ React.createElement("div", { style: S.phaseBar }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: S.eyebrow }, "TRANSFER WINDOW ", windowIdx + 1, " OF 3"), /* @__PURE__ */ React.createElement("div", { style: S.phaseTitle }, year, " valuations"), /* @__PURE__ */ React.createElement("div", { style: S.phaseSub }, "Final cash-out at ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.gold } }, YEARS[4]))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: S.miniKey }, "VALUE NOW"), /* @__PURE__ */ React.createElement("div", { style: { ...S.miniVal, color: (self == null ? void 0 : self.color) || T.gold } }, money(live)))), /* @__PURE__ */ React.createElement("div", { style: S.ledger }, /* @__PURE__ */ React.createElement(Led, { k: "Realized", v: signed(realized), c: realized >= 0 ? T.green : T.red, icon: /* @__PURE__ */ React.createElement(Banknote, { size: 13 }) }), /* @__PURE__ */ React.createElement(Led, { k: "Holdings", v: `${squad.length}`, c: T.ink, icon: /* @__PURE__ */ React.createElement(Coins, { size: 13 }) })), /* @__PURE__ */ React.createElement("div", { className: "cards" }, squad.map((h) => {
      const c = card(h.cardId);
      return /* @__PURE__ */ React.createElement("div", { key: h.hid, style: { position: "relative", paddingBottom: 22 } }, /* @__PURE__ */ React.createElement(Dossier, { c, valueIdx: curIdx, cur: c.v[curIdx], buy: h.buyValue, buyIdx: h.buyIdx }), /* @__PURE__ */ React.createElement("button", { className: "sellBtn", style: S.sellBtn, onClick: () => sell(h.hid) }, "Sell & reveal"));
    })), /* @__PURE__ */ React.createElement("div", { className: "actionbar" }, /* @__PURE__ */ React.createElement("div", { style: S.actionHint }, "Sell to bank profit and replace, or hold toward ", YEARS[4], "."), /* @__PURE__ */ React.createElement("button", { className: "cta", style: S.ctaSm, onClick: continueReview }, emptySlots.length ? "Sign replacements" : windowIdx < 2 ? "Next window" : "Full time", " ", /* @__PURE__ */ React.createElement(ChevronRight, { size: 16 }))));
  }
  function Led({ k, v, c, icon }) {
    return /* @__PURE__ */ React.createElement("div", { style: S.ledCell }, /* @__PURE__ */ React.createElement("div", { style: S.ledKey }, icon, /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 6 } }, k)), /* @__PURE__ */ React.createElement("div", { style: { ...S.ledVal, color: c } }, v));
  }
  function Results({ self, players, room, online, onAgain, onLeave }) {
    const [open, setOpen] = useState(null);
    const finished = players.filter((p) => p.status === "done" && typeof p.total === "number");
    const scouting = players.filter((p) => p.status !== "done");
    const ranked = [...finished].sort((a, b) => b.total - a.total);
    const meDone = ranked.find((p) => p.pid === (self == null ? void 0 : self.pid));
    let steal = { delta: -Infinity };
    finished.forEach((p) => (p.squad || []).forEach((s) => {
      const d = s.fin - s.buy;
      if (d > steal.delta) steal = { delta: d, n: s.n, mgr: p.name };
    }));
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeUp .4s ease both" } }, /* @__PURE__ */ React.createElement("div", { style: S.ftRow }, /* @__PURE__ */ React.createElement(Trophy, { size: 15, color: T.gold }), /* @__PURE__ */ React.createElement("span", { style: S.eyebrow }, "FULL TIME \xB7 ", YEARS[4], " \xB7 LIVE BOARD")), meDone && /* @__PURE__ */ React.createElement("div", { style: S.yourScore }, /* @__PURE__ */ React.createElement("span", { style: S.yourLabel }, "Your profit"), /* @__PURE__ */ React.createElement("span", { style: { ...S.yourVal, color: meDone.total >= 0 ? T.green : T.red } }, signed(meDone.total))), ranked.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { color: T.mute } }, "Waiting for the first manager to finish\u2026"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, ranked.map((p, i) => {
      const me = p.pid === (self == null ? void 0 : self.pid), isOpen = open === p.pid;
      return /* @__PURE__ */ React.createElement("div", { key: p.pid, style: { ...S.boardRow, borderColor: i === 0 ? T.gold : me ? p.color : T.line, background: i === 0 ? "linear-gradient(180deg,rgba(231,185,74,.10),rgba(231,185,74,.02))" : T.surface } }, /* @__PURE__ */ React.createElement("button", { style: S.boardHead, onClick: () => setOpen(isOpen ? null : p.pid) }, /* @__PURE__ */ React.createElement("span", { style: S.rankNum }, i === 0 ? /* @__PURE__ */ React.createElement(Crown, { size: 18, color: T.gold }) : `#${i + 1}`), /* @__PURE__ */ React.createElement("span", { style: { ...S.dot, background: p.color } }), /* @__PURE__ */ React.createElement("span", { style: S.boardName }, p.name, me && /* @__PURE__ */ React.createElement("span", { style: S.youTag }, " you")), /* @__PURE__ */ React.createElement("span", { style: { ...S.boardTotal, color: p.total >= 0 ? T.green : T.red } }, signed(p.total)), /* @__PURE__ */ React.createElement(ChevronRight, { size: 16, color: T.mute, style: { transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" } })), isOpen && /* @__PURE__ */ React.createElement("div", { style: S.revealGrid }, (p.squad || []).map((s, j) => /* @__PURE__ */ React.createElement(RevealCard, { key: j, s }))));
    })), scouting.length > 0 && /* @__PURE__ */ React.createElement("div", { style: S.stillRow }, /* @__PURE__ */ React.createElement(Loader2, { size: 13, className: "spin" }), /* @__PURE__ */ React.createElement("span", null, scouting.map((p) => p.name).join(", "), " still scouting\u2026")), steal.delta > -Infinity && /* @__PURE__ */ React.createElement("div", { style: S.stealBanner }, /* @__PURE__ */ React.createElement(TrendingUp, { size: 15, color: T.green }), /* @__PURE__ */ React.createElement("span", null, "Signing of the game \xB7 ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.ink } }, steal.mgr), "'s ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.gold } }, steal.n), " ", /* @__PURE__ */ React.createElement("span", { style: { color: T.green, fontWeight: 700 } }, signed(steal.delta)))), /* @__PURE__ */ React.createElement("div", { style: S.endBtns }, /* @__PURE__ */ React.createElement("button", { className: "cta", style: S.ctaSm, onClick: onAgain }, /* @__PURE__ */ React.createElement(RotateCcw, { size: 15 }), " Play again"), /* @__PURE__ */ React.createElement("button", { className: "ghost", style: S.ghostBtn, onClick: onLeave }, /* @__PURE__ */ React.createElement(LogOut, { size: 13 }), " Leave room")), online && room && /* @__PURE__ */ React.createElement("p", { style: S.codeFootnote }, "Room ", /* @__PURE__ */ React.createElement("strong", { style: { color: T.gold } }, room), " \xB7 share the code to add managers"));
  }
  function RevealCard({ s }) {
    var _a;
    const delta = s.fin - s.buy, up = delta >= 0;
    return /* @__PURE__ */ React.createElement("div", { style: S.revealCard }, /* @__PURE__ */ React.createElement("div", { style: S.revTop }, /* @__PURE__ */ React.createElement("span", { style: S.dossPos }, s.p), /* @__PURE__ */ React.createElement(DeltaPill, { delta, cur: s.fin })), /* @__PURE__ */ React.createElement("div", { style: S.revName }, s.n), /* @__PURE__ */ React.createElement("div", { style: S.revMeta }, s.nat, " \xB7 ", s.lg), /* @__PURE__ */ React.createElement(Sparkline, { values: s.v, up }), /* @__PURE__ */ React.createElement("div", { style: S.revFoot }, /* @__PURE__ */ React.createElement("span", { style: S.revFootK }, "in ", money(s.buy), " \u2019", String(YEARS[(_a = s.buyIdx) != null ? _a : 0]).slice(2)), /* @__PURE__ */ React.createElement("span", { style: S.revFootK }, "out ", money(s.fin), " \u2019", String(YEARS[4]).slice(2))));
  }
  function Sparkline({ values, up }) {
    const W = 188, H = 44, pad = 3, base = H - 11;
    const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
    const pts = values.map((v, i) => [pad + i * (W - pad * 2) / (values.length - 1), base - pad - (v - min) / span * (base - pad * 2)]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
    const col = up ? T.green : T.red;
    return /* @__PURE__ */ React.createElement("svg", { width: "100%", viewBox: `0 0 ${W} ${H}`, style: { display: "block", marginTop: 6 } }, /* @__PURE__ */ React.createElement("path", { d: `${d} L${pts[pts.length - 1][0]},${base} L${pts[0][0]},${base} Z`, fill: col, opacity: "0.10" }), /* @__PURE__ */ React.createElement("path", { d, fill: "none", stroke: col, strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }), pts.map((p, i) => /* @__PURE__ */ React.createElement("circle", { key: i, cx: p[0], cy: p[1], r: "2.1", fill: col })), YEARS.map((y, i) => /* @__PURE__ */ React.createElement("text", { key: y, x: pts[i][0], y: H - 1, fill: T.mute, fontSize: "7", fontFamily: "monospace", textAnchor: "middle" }, String(y).slice(2))));
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
    codeFootnote: { fontSize: 12, color: T.mute, marginTop: 14, textAlign: "center" }
  };
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(TransferRoom, null));
})();
