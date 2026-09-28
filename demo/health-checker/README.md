# Health-checker fixture

This is a small, synthetic HTTP service for the health-checker exercise. It is
not a production monitoring target and says nothing about the health of a real
website. It binds to loopback only: `127.0.0.1:4175`.

The local course reader can show this guide at
`/content/demo/health-checker/README.md`. The reader serves it from the
checkout; it does not turn the fixture into an internet service.

## Start the fixture

Run this **from the course root** (the directory containing `demo/`):

```sh
bun demo/health-checker/server.mjs
```

The same command works on macOS, Linux, and Windows when Bun is installed. A
clean start prints one line:

```text
Health-checker fixture ready at http://127.0.0.1:4175
```

The fixture also uses the standard `node:http` API and can be started with
`node demo/health-checker/server.mjs` when Node is the available runtime. Do
not start it from inside the learner's empty Git repository: it is a separate
fixture process. Stop it with **Ctrl+C**.

Importing `server.mjs` does not bind a port. The server starts only when the
file is run directly, so a learner program or a focused test can import its
`createServer()` seam without leaving a background service behind.

## Fixed routes

Every route below is a `GET`. Query strings do not customize any response; the
path selects the fixed behavior. Unknown paths return the same 404 status as
`/missing`.

| Path | Status | Body or header | Timing |
| --- | ---: | --- | --- |
| `/` | 200 | Readable HTML index listing the routes | Immediate |
| `/healthy` | 200 | `Workshop service ready` | Immediate |
| `/wrong-body` | 200 | `Maintenance in progress` | Immediate |
| `/missing` | 404 | `Not Found` | Immediate |
| `/error` | 500 | `Synthetic server error` | Immediate |
| `/redirect` | 302 | `Location: /healthy`; body `Redirecting to /healthy` | Immediate |
| `/slow` | 200 | `Workshop service ready` | After 2,000 ms |

Non-`GET` methods return 405. `/slow` cancels its pending timer when the
client disconnects before the response is ready; it does not send a late
response or leave timer work running.

## Canonical checker contract

The first checker should make one request:

- Accept one `http` or `https` URL and issue `GET`.
- Expect status `200`.
- Expect the literal, case-sensitive substring `Workshop service ready` in
the response body.
- Apply a `1000` ms timeout to the whole operation: connection, response, and
body reading. `/slow` should therefore time out.
- Do not follow redirects. `/redirect` must be reported as a 302 failure,
not silently changed into a check of `/healthy`.
- Measure elapsed time with a monotonic clock through body completion or
failure. Report milliseconds, but do not assert an exact duration.
- Report the observed HTTP status when a response exists. A transport error or
timeout has no invented HTTP status; report its reason instead.
- Restrict checks to local or owned/authorized endpoints. This fixture is
local and safe for the exercise.

Use these exit codes for a command-line checker:

| Code | Meaning |
| ---: | --- |
| `0` | The check completed and passed. |
| `1` | The check completed but the status/body check failed, or it timed out/failed during transport. |
| `2` | Input or configuration is invalid; no check was run. |

For the common expectation above, the six exercise endpoints have a useful
baseline: only `/healthy` passes; `/wrong-body` has the wrong text;
`/missing` and `/error` have the wrong status; `/redirect` is a failure
because redirects are not followed; and `/slow` exceeds the timeout.

The checker should not add retries, concurrency, authentication, or cookies
to this first contract. Those features change what a result means and are not
needed to exercise status, body, timeout, and redirect handling.

## Multi-target configuration

A later lesson may accept a JSON array. Each entry must contain **exactly**
these fields:

```json
{
  "name": "healthy",
  "url": "http://127.0.0.1:4175/healthy",
  "expectedStatus": 200,
  "expectedText": "Workshop service ready",
  "timeoutMs": 1000
}
```

Validate the whole array before making any request:

- The array must be non-empty.
- `name` must be a non-empty string, and names must be unique.
- `url` must be an `http` or `https` URL.
- `expectedStatus` must be an integer from 100 through 599.
- `expectedText` must be a non-empty string.
- `timeoutMs` must be a positive integer.

If any entry is invalid, exit `2` and make zero requests, including for
entries that appeared earlier in the file. Once the complete configuration is
valid, run entries sequentially. Each result is independent: a failure for
one target must not skip later valid targets. Exit `0` only when all targets
pass; exit `1` when any target fails. Keep the same no-retry, no-redirect,
whole-request timeout and observed-status rules as the single-target check.

## Source and ownership

The fixture supplies predictable HTTP behavior; it is not starter code for the
checker. The checker belongs in the learner's own empty repository and can use
the language and runtime they already know. When a lesson asks the agent to
inspect this fixture, read the checked-out file from the filesystem. Do not
promise that a browser download, a copied URL, or a provider call has run the
source. The fixture makes no external network requests.
