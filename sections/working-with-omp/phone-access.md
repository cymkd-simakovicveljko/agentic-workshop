# 5.3 Working from your phone

**A phone is a client, not the machine running the agent.** OMP's Collab browser client shows and, with the right link, controls a session that remains on the host computer. The host keeps the working directory, provider login, files, tools, and costs.

## Prerequisites

- Start an interactive OMP session on the machine that has the repository and provider authentication.
- Keep that machine and the OMP process running. If it sleeps, exits, or loses its network, the phone cannot continue local work.
- The host must reach the configured Collab relay; the phone must reach the browser link. The default relay is `wss://my.omp.sh`. A restrictive network or proxy can block the WebSocket connection.
- Prompts from the phone use the host session's model and provider account. They spend that account's quota or budget; the phone does not supply a separate model login.

No mobile app, SSH tunnel, or unauthenticated local port is needed. Do not expose a random terminal or browser-control port to the network.

## Join from a phone

1. On the host, check the project and current transcript, then run `/collab view` for a read-only link. Use `/collab` only when you genuinely need to prompt, interrupt, or manage subagents.
2. OMP prints a browser URL and QR code. Open the URL on the phone or scan the QR code. The browser client needs no OMP installation.
3. Use view-only access to read the transcript, tool cards, and subagent activity. A full-control link can prompt the agent, interrupt it, answer host questions, and use Agent Hub against its subagents.
4. When finished, run `/collab stop` on the host. A new room/link is needed later.

Both link types can reveal the session's existing transcript. Full control also lets the holder steer work on the host machine, so treat either URL and its QR code as secrets: send them only through a private channel, never commit or paste them into an issue, and stop sharing immediately if one leaks. The link is the trust boundary even though session payloads are encrypted before reaching the relay.

## A safe first use

```text
Host:  /collab view
Phone: open the printed browser link
Phone: read the latest result and note the next question
Host:  /collab stop
```

Start read-only. Upgrade to a full-control link only for a bounded action you are ready to review on the host afterward.

[Back to Key productivity tips](index.md) · [Previous: Keyboard and steering](keyboard-and-steering.md) · [Next: Managing agents](managing-agents.md)

## Sources

- [OMP collaboration](https://github.com/can1357/oh-my-pi/blob/main/docs/collab.md) — browser joins, access levels, relay, encryption, and guest limits.
- [OMP CLI reference](https://github.com/can1357/oh-my-pi/blob/main/docs/cli-reference.md) — `omp join` and launch/session commands.
- [OMP README](https://github.com/can1357/oh-my-pi/blob/main/README.md) — current OMP capabilities and installation.
