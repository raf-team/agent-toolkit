---
description: Show raf status — saved connections and anything waiting on an approval click.
---

# raf status

Report the current raf state to the user.

1. Call the `raf` MCP server's `execute` tool with code `return await tools.executor.coreTools.connections.list({})`.
2. Summarize the saved connections briefly: integration, owner/name, and the `address` each is callable at. Connection listings never include credential values — do not go looking for them.
3. If this session has a pending approval ticket from an earlier `tools.use` press, remind the user of its approval URL and offer to press again — `tools.use` returns ready once the click lands.
4. If the `raf` MCP server is not available, say so and point the user at https://registry.rafads.com/agent-setup.
