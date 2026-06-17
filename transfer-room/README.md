# The Transfer Room

A fantasy football transfer-market party game. Build a seven-a-side squad from
**anonymous** player dossiers (age, league, stats — no names), ride three transfer
windows (2018 · 2020 · 2022), and cash out at 2024. Everyone joins the same room
on their own phone and plays the identical market; biggest profit wins.

Most of the five options each round **lose** value, so blind picking is punished.

## Run locally

```bash
npm install
npm run dev          # plain Vite (rooms fall back to solo mode)
# or, with working multiplayer rooms locally:
npm install -g netlify-cli
netlify dev          # serves the app + the /api/room function + Blobs
```

Open the printed URL on your phone and a laptop to test a real room.

## Deploy to Netlify

The repo is deploy-ready — no env vars required.

**Option A — drag & drop won't work** (it needs the function + a build), so use Git or the CLI.

**Git (recommended):**
1. Push this folder to a GitHub/GitLab repo.
2. In Netlify: *Add new site → Import an existing project* and pick the repo.
3. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Deploy. Done.

**CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init        # link/create a site
netlify deploy --build --prod
```

Rooms are stored in **Netlify Blobs**, which is enabled automatically for sites
with functions — nothing to configure.

## How rooms work

`netlify/functions/room.js` is a single endpoint at `/api/room`:

| action    | does                                            |
|-----------|-------------------------------------------------|
| `meta`    | check a room code exists                        |
| `create`  | create the room + write the host player         |
| `upsert`  | write/update one player (status, score, squad)  |
| `players` | list everyone in the room                       |

Each player is a separate blob key (`CODE:p:PID`) so simultaneous writes don't
overwrite each other. The frontend polls `players` every 3s for the live lobby
and leaderboard.

The frontend (`src/App.jsx`) auto-detects its backend: the Netlify function when
deployed, the Claude artifact's shared storage inside Claude, or solo mode offline.

## About the data

Players are real footballers, but the market-value timelines in `src/App.jsx`
(`POOL`) are **game-balanced approximations**, not a live feed. There is no free
official Transfermarkt API for historical values, and api-sports.io provides
stats/fixtures but **not** market values. To wire in live data later:

1. Add a function that fetches stats from `v3.football.api-sports.io` using your
   key (store it as a Netlify env var, never in the client).
2. Pair each player with a value source keyed by player id.
3. Replace the `POOL` array's `v: [...]` arrays with the fetched values.

The UI only needs each player's `v` to be `[2016, 2018, 2020, 2022, 2024]` values.

## Tune the game

In `src/App.jsx`:
- `POOL` — add/remove players or edit value timelines.
- `YEARS` / `WINDOW_YEARS` — change the seasons.
- `CARDS_PER_ROUND` / `FALLERS_MIN` — how many options per pick and how many of
  them must decline (default 5 options, ≥3 fallers).
- `DRAFT_ROUNDS` — the squad shape (default GK, CB, CB, MID, MID, ATT, ATT).
