<div align="center">

# 🦊 AgentFOXXY

### The self-improving autonomous AI agent

**One agent. Every model. Real work — in your terminal, on a server, or from your phone.**

<p>
  <img src="https://img.shields.io/badge/Python-3.11-FB923C?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
  <img src="https://img.shields.io/badge/Platforms-Linux%20%7C%20macOS%20%7C%20Windows-FBBF24?style=for-the-badge" alt="Platforms">
  <img src="https://img.shields.io/badge/Tools-40%2B-EA580C?style=for-the-badge" alt="40+ tools">
</p>

</div>

---

## What is AgentFOXXY?

AgentFOXXY is an autonomous AI agent that actually gets things done. It writes and runs code, controls a browser, generates media, searches the web, remembers what matters, and spawns its own helper agents for parallel work — all from a single command.

It is **model-agnostic**: bring OpenAI, OpenRouter, a local endpoint, or any OpenAI-compatible gateway. Switch with one command, no code changes, no lock-in.

And it is **self-improving**: it builds skills from experience, sharpens them as it uses them, searches its own past conversations, and builds a deeper model of who you are across every session.

---

## ✨ Highlights

| | |
|---|---|
| 🧠 **A closed learning loop** | Creates and refines its own skills, curates persistent memory, and recalls past sessions with full-text search. It gets better the more you use it. |
| 🦾 **A real terminal UI** | Multiline editing, slash-command autocomplete, conversation history, interrupt-and-redirect, and live streaming tool output. |
| 💬 **Lives where you do** | Talk to it from the CLI, Telegram, Discord, Slack, WhatsApp, or Signal — one gateway, continuous conversations across platforms. |
| 🐝 **Delegates and parallelizes** | Spawns isolated sub-agents (the TeamFOXXY swarm) for parallel workstreams and multi-step pipelines. |
| ⏰ **Scheduled automations** | A built-in cron scheduler runs daily reports, nightly backups, and weekly audits unattended — described in plain language. |
| 🌍 **Runs anywhere** | Local, Docker, SSH, or serverless sandboxes. Put it on a $5 VPS or a GPU cluster — it is not tied to your laptop. |

---

## 🚀 Quick Install

### Linux · macOS · WSL2 · Termux

```bash
curl -fsSL https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.sh | bash
```

### Windows (native, PowerShell)

```powershell
iex (irm https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.ps1)
```

The installer sets up everything for you — `uv`, Python 3.11, Node.js, ripgrep, ffmpeg, and a portable Git Bash on Windows (no admin required, fully isolated from any system Git). Native Windows is fully supported: CLI, gateway, TUI, and tools all run without WSL.

Then reload your shell and start chatting:

```bash
source ~/.bashrc    # or: source ~/.zshrc
agentfoxxy
```

---

## 🎯 Getting Started

```bash
agentfoxxy              # Interactive CLI — start a conversation
agentfoxxy model        # Choose your LLM provider and model
agentfoxxy tools        # Configure which tools are enabled
agentfoxxy gateway      # Start the messaging gateway (Telegram, Discord, …)
agentfoxxy setup        # Full setup wizard — configure everything at once
agentfoxxy update       # Update to the latest version
agentfoxxy doctor       # Diagnose any issues
```

Point AgentFOXXY at any provider you like:

```bash
agentfoxxy model        # pick a provider + model interactively
agentfoxxy -z "build me a REST API in FastAPI with tests"   # one-shot task
```

---

## 🧰 What it can do

- **Code & computer work** — read, write, and run code; execute shell commands; drive a real browser; control a full desktop.
- **Sub-agents** — delegate big jobs to a swarm of specialist agents working in parallel.
- **Media** — generate images, video, and speech from text.
- **Web & search** — search the web and X, fetch and read pages.
- **Memory** — persistent, self-curated memory plus full-text search over past sessions.
- **MCP** — connect any Model Context Protocol server to extend its abilities.
- **40+ built-in tools** — terminal, code execution, todo tracking, messaging, skills, and more.

---

## 💬 CLI vs Messaging

AgentFOXXY has two front doors: the terminal UI (`agentfoxxy`), or the gateway you talk to from Telegram, Discord, Slack, WhatsApp, or Signal. Most slash commands work in both.

| Action | CLI | Messaging |
|---|---|---|
| Start chatting | `agentfoxxy` | `agentfoxxy gateway setup` + `gateway start`, then message the bot |
| Fresh conversation | `/new` or `/reset` | `/new` or `/reset` |
| Change model | `/model [provider:model]` | `/model [provider:model]` |
| Set a personality | `/personality [name]` | `/personality [name]` |
| Retry / undo | `/retry`, `/undo` | `/retry`, `/undo` |
| Context & usage | `/compress`, `/usage` | `/compress`, `/usage` |
| Skills | `/skills` or `/<skill-name>` | `/<skill-name>` |
| Interrupt | `Ctrl+C` or new message | `/stop` or new message |

---

## 🤝 Contributing

Use the installer, then work from the git checkout it creates at
`$AGENTFOXXY_HOME/agentfoxxy-agent` (usually `~/.agentfoxxy/agentfoxxy-agent`):

```bash
cd "${AGENTFOXXY_HOME:-$HOME/.agentfoxxy}/agentfoxxy-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

<div align="center">

🦊 **AgentFOXXY** — built and maintained by [@usmanxg58-byte](https://github.com/usmanxg58-byte)

</div>
