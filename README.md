# The Transfer Room — static site

A multi-file, no-build version. Four files:

```
index.html    page shell, links everything
styles.css    all global CSS
players.js     the player database (window.PLAYERS) — edit this to add players
app.js         the compiled game (no Babel needed in the browser)
```

The only external dependency is React, loaded from a CDN, so an internet
connection is needed on first load.

## Run it
- **Quickest:** open `index.html` in a browser. Plays as a single-player
  market challenge (same draft → 3 windows → reveal).
- **Properly (recommended):** serve the folder over HTTP so paths resolve cleanly:
  ```bash
  npx serve .        # or: python3 -m http.server
  ```

## Multiplayer rooms
`app.js` auto-detects a `/api/room` endpoint. By itself this static site has no
server, so rooms run in solo mode. To enable real join-by-code rooms, host these
files alongside the Netlify function from the `transfer-room` project (drop these
four files into its `public/` folder, or point its build at them). When `/api/room`
responds, the lobby + live leaderboard switch on automatically — no code changes.

## Add players
Edit `players.js`. Each entry:
```js
{ n: "Name", p: "GK"|"CB"|"MID"|"ATT", age: <2016 age>, h: <cm>,
  nat: "Country", lg: "League",
  s: { /* a couple of position stats shown on the card */ },
  v: [v2016, v2018, v2020, v2022, v2024] }   // market value €M
```
Keep the mix balanced: the game guarantees at least 3 of every 5 options decline
in value, so each position needs enough players whose final value (`v[4]`) is
below their entry value (`v[0]`).

Leagues currently covered: Premier League, La Liga, Serie A, Bundesliga,
Ligue 1, Eredivisie, FC Porto / Liga Portugal.

Values are game-balanced approximations, not a live feed.
