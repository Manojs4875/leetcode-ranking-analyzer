# LeetCode Contest Ranking Dashboard

A small Node.js/Express web app that fetches a LeetCode user's contest ranking history via LeetCode's public GraphQL API and visualizes their rating trend as a line chart.

## Features

- Enter any public LeetCode username and fetch their contest ranking history
- Queries LeetCode's GraphQL API (`userContestRankingInfo`) for contest ratings, rankings, and problem counts
- Renders rating trend over time using Chart.js
- Displays contest-by-contest history in a table (contest name, date, ranking, rating)
- Server-side rendered views using EJS

## Tech Stack

- **Backend:** Node.js, Express 5
- **Templating:** EJS
- **Charting:** Chart.js
- **Data Source:** LeetCode public GraphQL API

## Project Structure

```
├── app.js                     # Express app entry point
├── route/
│   ├── leetcode.js            # POST /submit -> fetches ranking data
│   └── static.js              # GET / and GET /display
├── service/
│   └── leetcodefetch.js       # GraphQL query to LeetCode API
├── controller/
│   └── leetcode.js            # (currently unused)
└── views/
    ├── home.ejs                # Username input form
    └── display.ejs             # Chart + table of contest history
```

## How It Works

1. `GET /` renders a form where the user enters a LeetCode username.
2. Submitting the form sends a `POST /submit` request.
3. The server queries LeetCode's GraphQL endpoint for that user's `userContestRankingHistory` (contest title, date, ranking, rating, problems solved).
4. The results are rendered in `display.ejs`, which draws a Chart.js line graph of rating over time and a table of each contest's details.

## Getting Started

### Prerequisites
- Node.js installed

### Installation
```bash
npm install
```

### Run locally
```bash
node app.js
```
The server starts on `http://localhost:8000`.

## Routes

| Method | Path       | Description                                  |
|--------|-----------|-----------------------------------------------|
| GET    | `/`        | Renders the username input form               |
| POST   | `/submit`  | Fetches contest ranking data and renders it    |
| GET    | `/display` | Alias route, also triggers a data fetch        |

## Performance

Load tested locally with [autocannon](https://github.com/mcollina/autocannon) against the `POST /submit` endpoint, which fetches live contest data from LeetCode's GraphQL API on every request (no caching).

**Test setup:** 50 concurrent connections, 10 second duration

```
autocannon -c 50 -d 10 -m POST -H "Content-Type: application/x-www-form-urlencoded" -b "username=<leetcode-username>" http://localhost:8000/submit
```

**Results (3 runs):**

| Metric | Run 1 | Run 2 | Run 3 |
|---|---|---|---|
| Requests | 680 in 10.17s | 920 in 10.18s | 962 in 10.17s |
| Avg Req/Sec | 63 | 87 | 95 |
| Avg Latency | 713 ms | 560 ms | — |
| Data Read | 6.35 MB | 8.77 MB | 9.19 MB |

**Average across runs: ~82 req/sec** (range: 63-95). Throughput varies run-to-run since it's bound by LeetCode's live GraphQL API response time rather than this server alone — every request triggers a fresh external fetch with no caching layer.

