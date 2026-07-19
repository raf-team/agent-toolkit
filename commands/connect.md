---
description: Press the raf button — resolve and connect a provider for a stated capability or brand.
argument-hint: <need, e.g. "transactional email" or "resend">
---

# Connect a provider through raf

Resolve the stated need through the raf MCP server.

1. If no need was given in the arguments, ask the user what capability or brand they want, then proceed.
2. Call the `raf` MCP server's `execute` tool with code `return await tools.use({ need: "$ARGUMENTS" })`. Pass the need in the user's phrasing; brands pass verbatim.
3. Act on the reply:
   - **Working tool**: report what got connected and how to call it.
   - **Pending ticket**: give the user the single approval URL, then press again once they say they have clicked — it returns ready when the click lands.
   - **No-match**: report honestly what the catalog covers; do not substitute a provider from memory.
4. Never wire credentials by hand — secrets are minted through the browser handoff, never through chat.
