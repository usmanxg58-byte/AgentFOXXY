<div align="center">

# 🦊 AgentFOXXY

### An AI agent that does real work — and gets better as it goes

**One agent. Any model. Works in your terminal, on a server, or from your phone.**

<p>
  <img src="https://img.shields.io/badge/Python-3.11-FB923C?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
  <img src="https://img.shields.io/badge/Platforms-Linux%20%7C%20macOS%20%7C%20Windows-FBBF24?style=for-the-badge" alt="Platforms">
  <img src="https://img.shields.io/badge/Tools-40%2B-EA580C?style=for-the-badge" alt="40+ tools">
</p>

</div>

---

## What is AgentFOXXY?

AgentFOXXY is an AI agent that actually finishes jobs. It writes and runs code, uses a browser, makes images and audio, searches the web, remembers what matters, and starts its own helper agents when a job is big — all from one command.

**It works with any model.** Use OpenAI, OpenRouter, a model on your own machine, or any OpenAI-compatible endpoint. Switch with one command. No code changes, no lock-in.

**It gets better as you use it.** It turns what it learns into reusable skills, improves them over time, searches its own past chats, and builds up a picture of how you like to work.

---

## ✨ Highlights

| | |
|---|---|
| 🧠 **It learns** | Turns experience into skills, keeps its own notes, and can search every past chat. The more you use it, the better it gets. |
| 🦾 **A proper terminal app** | Multi-line typing, slash-command autocomplete, chat history, stop-and-redirect any time, and tool output that streams live. |
| 💬 **Works where you are** | Talk to it from the terminal, Telegram, Discord, Slack, WhatsApp, or Signal — same conversation everywhere. |
| 🐝 **Splits big jobs** | Starts separate helper agents (the TeamFOXXY swarm) so several parts of a job run at once. |
| ⏰ **Runs on a schedule** | Built-in scheduler for daily reports, nightly backups, weekly checks. Just describe it in plain words. |
| 🌍 **Runs anywhere** | Your machine, Docker, SSH, or a cloud sandbox. A $5 VPS or a GPU cluster — it is not stuck on your laptop. |

---

## 🚀 Download & Install

There are three ways to get AgentFOXXY — pick whichever suits you.

### 1. 🖥️ Desktop App (easiest — Windows)

Download the installer, double-click, done. No terminal needed.

**➡️ [Download the latest release](https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest)**

| File | For |
|---|---|
| `AgentFOXXY-*-win-x64.exe` | Normal install (recommended) |
| `AgentFOXXY-*-win-x64.msi` | Company / silent deployment |

> On first launch Windows may show an "unknown publisher" notice — click **More info → Run anyway**. The app is safe; it just is not paid-signed.

### 2. ⌨️ Command-line install (Linux · macOS · WSL2 · Termux · Windows)

**Linux / macOS / WSL2 / Termux:**

```bash
curl -fsSL https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.sh | bash
```

**Windows (native, PowerShell):**

```powershell
iex (irm https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.ps1)
```

The installer sets up everything for you — `uv`, Python 3.11, Node.js, ripgrep, ffmpeg, and a portable Git Bash on Windows (no admin required, fully isolated from any system Git). Native Windows is fully supported: CLI, gateway, TUI, and tools all run without WSL.

Then reload your shell and start chatting:

```bash
source ~/.bashrc    # or: source ~/.zshrc
agentfoxxy
```

### 3. 🛠️ From source (developers)

```bash
git clone https://github.com/usmanxg58-byte/AgentFOXXY.git
cd AgentFOXXY
uv pip install -e ".[all]"
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

- **Code and computer work** — read, write, and run code; run shell commands; drive a real browser; control a whole desktop.
- **Helper agents** — hand a big job to a group of agents that work at the same time.
- **Media** — make images, video, and speech from text.
- **Web and search** — search the web and X, open and read pages.
- **Memory** — keeps its own notes, and can search everything you talked about before.
- **MCP** — plug in any Model Context Protocol server to add more abilities.
- **40+ built-in tools** — terminal, code running, to-do tracking, messaging, skills, and more.

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
