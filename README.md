# Raf agent toolkit

**Raf** lets your coding agent fulfill external service needs — sending email,
a database, auth, payments, DNS, hosting — by resolving each need to a
verified provider from the open catalog at
[registry.rafads.com](https://registry.rafads.com), connecting it (secrets go
through a browser handoff, never through chat), and calling it.

This repo is the agent-toolkit distribution: a Claude Code plugin (also a
Cursor plugin) bundling the Raf MCP server and the trigger skill.

## Install — one command, whichever agent you use

```sh
npx plugins add raf-team/agent-toolkit
```

The [open-plugin CLI](https://github.com/vercel-labs/plugins) auto-detects
every agent installed on your machine — **Claude Code, Cursor, Codex, Grok
Build, Kimi Code, GitHub Copilot CLI, and VS Code** — and installs the Raf
plugin (trigger skill, rule, and MCP server) natively into each, with
auto-updates. Restart your agent sessions afterwards.

Per-agent notes:

- **Claude Code** — native alternative: `claude plugin marketplace add
  raf-team/agent-toolkit`, then `claude plugin install raf@agent-toolkit`.
- **Cursor** — approve the `raf` server when it prompts on first use.
- **Codex** — prompts per tool call by default; for unattended runs set
  `default_tools_approval_mode = "approve"` under `[mcp_servers.raf]`.
- **VS Code** — agent plugins are a Preview feature; enable
  `chat.plugins.enabled` if your organization manages that setting.

### No plugin support?

`npx rafads@latest install` writes the configs directly (Claude Code, Codex,
Cursor — and it's the only path that asks about telemetry interactively).

Or install the trigger skill from this repo:

```sh
npx skills add https://github.com/raf-team/agent-toolkit --skill raf-provider-needs --yes --global
```

…and register the MCP server in your agent's MCP config:

```json
"raf": {
  "command": "npx",
  "args": ["-y", "rafads", "mcp"],
  "env": { "RAFADS_CATALOG": "https://registry.rafads.com/raf-catalog.json" }
}
```

Full per-agent instructions: https://registry.rafads.com/agent-setup
(agent-readable: https://registry.rafads.com/agent-setup.md)

## What your agent gets

- `execute` — run TypeScript in a sandbox with typed access to every
  connected integration's tools, plus the make-it-work button:
  `await tools.use({ need: "transactional email" })` returns a working
  integration, a pending ticket with the one human credential click, or an
  honest no-match. Replies name one verified provider (sponsored entries
  always labeled) and the count of alternatives; override with
  `not: ["<id>"]`, or `compare: true` for the full ranked set. Brand asks
  (`use({ need: "resend" })`) are honored verbatim.
- `skills` — the how-to guides: `execute` (calling convention) and `resolve`
  (the button's details plus the stepwise manual flow).
- `resume` — continue an execution paused for user interaction.

Serving has two lanes. The default is the **free lane**: organic-only
answers, no payouts, no fingerprinting. `raf ads on` opts into the
**earning lane**: one labeled sponsored default may serve when its quality
clears the best organic candidate's bar, and qualifying agent activity
accrues pool rent locally (`raf ads status` shows the ledger). Nobody sees
an ad they aren't being paid to see.

Telemetry is off by default. Opting in (`RAFADS_TELEMETRY=1` on the MCP
entry, or answering yes to `npx rafads@latest install`) ships the resolve
funnel — need stated, default shown, integration added, connected — and
nothing else: no code, no prompts, no credentials.

## License

MIT
