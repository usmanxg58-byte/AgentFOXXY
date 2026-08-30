# AgentFOXXY CLI Reference

Live sources when anything looks stale: `agentfoxxy --help`, `agentfoxxy <command> --help`,
https://hermes-agent.nousresearch.com/docs/reference/cli-commands

### Global Flags

```
agentfoxxy [flags] [command]        (no subcommand = interactive chat)

  --version, -V             Show version
  -z, --oneshot PROMPT      One-shot: print ONLY the final response (for scripts/pipes)
  -m MODEL  --provider P    Model/provider override for this invocation
  -t, --toolsets LIST       Comma-separated toolsets for this invocation
  --resume, -r SESSION      Resume session by ID or title
  --continue, -c [NAME]     Resume by name, or most recent session
  --worktree, -w            Isolated git worktree mode (parallel agents)
  --skills, -s SKILL        Preload skills (comma-separate or repeat)
  --profile, -p NAME        Use a named profile
  --yolo                    Skip dangerous command approval
  --tui / --cli             Force the Ink TUI / classic REPL
  --ignore-rules            Skip AGENTS.md/SOUL.md/memory/skill injection
  --safe-mode               Disable ALL customizations (troubleshooting)
  --pass-session-id         Include session ID in system prompt
```

### Chat

```
agentfoxxy chat [flags]
  -q, --query TEXT          Single query, non-interactive
  --image PATH              Attach a local image to a single query
  -Q, --quiet               Suppress banner, spinner, tool previews
  --checkpoints             Enable filesystem checkpoints (/rollback)
  --max-turns N             Cap tool-calling iterations
  --source TAG              Session source tag (default: cli)
```
(plus the global flags above)

### Configuration

```
agentfoxxy setup [section]      Wizard (model|tts|terminal|gateway|tools|agent)
agentfoxxy model                Interactive model/provider picker
agentfoxxy fallback [add|remove|list]  Fallback provider chain
agentfoxxy config [show|edit|get|set|unset|path|env-path|check|migrate]
agentfoxxy login / logout       OAuth sign-in / clear stored auth
agentfoxxy doctor [--fix]       Check dependencies and config
agentfoxxy status [--all]       Component status
```

### Tools & Skills

```
agentfoxxy tools [list|enable NAME|disable NAME]   Per-platform toolsets (curses UI with no args)

agentfoxxy skills list|browse|search QUERY|inspect ID
agentfoxxy skills install ID    Hub identifier OR a direct https://…/SKILL.md URL
agentfoxxy skills config        Enable/disable skills per platform
agentfoxxy skills check|update|uninstall|publish PATH
agentfoxxy skills tap add REPO  Add a GitHub repo as a skill source
agentfoxxy bundles              Skill bundles (one /<name> alias loads several skills)
```

### MCP Servers

```
agentfoxxy mcp add NAME (--url or --command) | remove | list | test NAME
agentfoxxy mcp catalog | install NAME     Curated catalog install
agentfoxxy mcp configure NAME             Toggle tool selection
agentfoxxy mcp serve                      Run AgentFOXXY as an MCP server
```
Details (transport, tool discovery, catalog): `references/native-mcp.md`.

### Gateway (Messaging Platforms)

```
agentfoxxy gateway run|install|start|stop|restart|status|setup
```

20+ platforms: Telegram, Discord, Slack, WhatsApp (Baileys + Business Cloud API), iMessage (Photon — `agentfoxxy photon setup`), Signal, Email, SMS, Matrix, Mattermost, Teams, LINE, SimpleX, ntfy, Google Chat, Home Assistant, DingTalk, Feishu, WeCom, Weixin, API Server, Webhooks. Open WebUI connects via the API Server adapter. Most adapters ship under `plugins/platforms/`.
Docs: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/

### Sessions

```
agentfoxxy sessions list|browse|rename ID TITLE|delete ID|export OUT|prune|stats
```

### Cron / Webhooks

```
agentfoxxy cron list|create SCHED|edit ID|pause|resume|run ID|remove|status
    Schedules: '30m', 'every 2h', '0 9 * * *', ISO timestamp
agentfoxxy webhook subscribe NAME|list|remove NAME|test NAME
```
Webhook payloads/routes: `references/webhooks.md`.

### Profiles

```
agentfoxxy profile list|create NAME (--clone|--clone-all|--clone-from)|use|show|delete
agentfoxxy profile rename A B | alias NAME | export NAME | import FILE
```

### Credentials & Pools

```
agentfoxxy auth                 Interactive credential manager
agentfoxxy auth add [PROVIDER]  Add OAuth or API-key credential (nous, openai-codex, qwen-oauth, …)
agentfoxxy auth list|remove P IDX|reset PROVIDER|status
```
Multiple credentials per provider form a pool that rotates automatically and skips exhausted keys.

### Other

```
agentfoxxy desktop / gui        Native desktop app
agentfoxxy dashboard            Web admin panel + embedded chat (--stop / --status)
agentfoxxy proxy                OpenAI-compatible local proxy backed by an OAuth provider
agentfoxxy portal               Quick setup / sign in via Nous Portal
agentfoxxy kanban <verb>        Multi-agent work-queue board
agentfoxxy project              Named multi-folder workspaces
agentfoxxy skin list|use|set    Switch/tweak skins (see references/themes.md)
agentfoxxy pets <verb>          Pet mascots (see references/petdex.md)
agentfoxxy memory setup|status|off|reset   Memory provider
agentfoxxy secrets bitwarden|onepassword   External secret stores
agentfoxxy moa                  Mixture-of-Agents slots
agentfoxxy hooks / security / backup / import / checkpoints / console
agentfoxxy logs [-f] [errors]   View agent/error logs
agentfoxxy send                 One-off message through a gateway platform
agentfoxxy pairing / plugins / insights / journey / computer-use
agentfoxxy acp                  ACP server (IDE integration)
agentfoxxy completion bash|zsh|fish
agentfoxxy update / uninstall / claw migrate
```

Plugin- and provider-supplied subcommands (e.g. `agentfoxxy photon setup`) only appear once their plugin is installed/active.

### Where to Find Things

| Looking for... | Location |
|---|---|
| Config options | `agentfoxxy config edit` · [Configuration docs](https://hermes-agent.nousresearch.com/docs/user-guide/configuration) |
| Tools / toolsets | `agentfoxxy tools list` · [Tools reference](https://hermes-agent.nousresearch.com/docs/reference/tools-reference) |
| Skills catalog | `agentfoxxy skills browse` · [Skills catalog](https://hermes-agent.nousresearch.com/docs/reference/skills-catalog) |
| Provider setup | `agentfoxxy model` · [Providers guide](https://hermes-agent.nousresearch.com/docs/integrations/providers) |
| Env variables | `agentfoxxy config env-path` · [Env vars reference](https://hermes-agent.nousresearch.com/docs/reference/environment-variables) |
| Gateway logs | `~/.agentfoxxy/logs/gateway.log` (or `agentfoxxy logs`) |
| Sessions | `agentfoxxy sessions browse` (reads state.db) |
