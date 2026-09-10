<div align="center">

# 🦊 AgentFOXXY

### An AI agent that finishes the job

**One agent. Any model. Runs in your terminal, on a server, or from your phone.**

<p>
  <img src="https://img.shields.io/badge/Python-3.11-FB923C?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
  <img src="https://img.shields.io/badge/Platforms-Linux%20%7C%20macOS%20%7C%20Windows-FBBF24?style=for-the-badge" alt="Platforms">
  <img src="https://img.shields.io/badge/Providers-35%2B-EA580C?style=for-the-badge" alt="35+ model providers">
  <img src="https://img.shields.io/badge/Tools-40%2B-F59E0B?style=for-the-badge" alt="40+ tools">
</p>

**English** · [简体中文](README.zh-CN.md) · [اردو](README.ur-pk.md)

</div>

---

## The short version

Most AI tools answer questions. AgentFOXXY does the work.

You describe a job in plain words. It plans the steps, writes the code, runs it, reads the errors, fixes them, and keeps going until the job is done — using a real terminal, a real browser, and real files on your machine.

Then it does something unusual: **it writes down what it learned.** The next time a similar job comes up, it already knows how.

---

## See it work

**Give it a job and walk away:**

```bash
agentfoxxy -z "read sales.csv, find the 5 worst months, chart them, save as report.png"
```

It opens the file, works out the numbers, writes the plotting code, runs it, looks at the image it produced, and fixes the chart if it came out wrong.

**Let it drive a browser:**

```bash
agentfoxxy
> log into the admin panel, export last month's orders, and email me the totals
```

Not HTML scraping — a real browser it can see, click, and type into.

**Message it from your phone:**

```bash
agentfoxxy gateway start
```

Now text it on Telegram, Discord, Slack, WhatsApp, or Signal. Same agent, same memory, same conversation you left open in the terminal.

**Give it a standing order:**

```
> every weekday at 8am, check my repos for failed builds and message me a summary
```

No cron syntax. It sets the schedule up itself.

---

## What makes it different

Plenty of tools call themselves agents. Here is what is actually different, and how it works.

### 🧠 It gets better — and you can read why

When AgentFOXXY works out something awkward, it saves the method as a **skill**: a plain markdown file in your skills folder. You can open it, edit it, delete it, or send it to a colleague. Nothing is locked in a black box.

It also keeps its own searchable notes and can look back through every past conversation, so you stop re-explaining your setup every morning.

### 🔌 It is not tied to one AI company

35+ providers work out of the box — OpenAI, Anthropic, Gemini, DeepSeek, Qwen, xAI, Bedrock, Azure, OpenRouter, Ollama, and any OpenAI-compatible endpoint you point it at.

```bash
agentfoxxy model        # pick a provider and model, or switch mid-conversation
```

One command to switch. No code changes. If a provider goes down, gets slow, or gets expensive, you move — and your history, skills, and settings come with you.

### 🐝 Big jobs get split up

When a job has independent parts, it starts helper agents that run at the same time (the TeamFOXXY swarm) and gathers their results. A ten-file refactor does not have to be ten steps in a row.

### 🖥️ It is a real program, not a chat box

A proper terminal app: multi-line input, slash-command autocomplete, tool output that streams live, and you can cut in and redirect it mid-thought. There is a Windows desktop app and a web dashboard too.

### 🌍 It runs where you need it

Your laptop, Docker, a $5 VPS over SSH, a cloud sandbox, or Termux on Android. Native Windows is fully supported — no WSL needed.

---

## 🚀 Install

Three ways in. Pick one.

### 1. Desktop app — easiest (Windows · macOS)

Download, double-click, done. No terminal.

**➡️ [Get the latest release](https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest)**

| File | Use it for |
|---|---|
| **Windows** | |
| `AgentFOXXY-*-win-x64.exe` | Normal install — start here |
| `AgentFOXXY-*-win-x64.msi` | Company / silent deployment |
| **macOS** | |
| `AgentFOXXY-*-mac-arm64.dmg` | Apple Silicon (M1/M2/M3) |
| `AgentFOXXY-*-mac-x64.dmg` | Intel Mac |

> **Windows:** may warn about an "unknown publisher" the first time — click **More info → Run anyway**. That warning means the installer is not paid-signed yet, not that something is wrong with it.
> 
> **macOS:** right-click the app → Open (first time only) to bypass Gatekeeper, or run `xattr -cr /Applications/AgentFOXXY.app` in Terminal.

### 2. One command (Linux · macOS · WSL2 · Termux)

```bash
curl -fsSL https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.sh | bash
```

**Windows PowerShell:**

```powershell
iex (irm https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.ps1)
```

The installer brings its own `uv`, Python 3.11, Node.js, ripgrep and ffmpeg — plus a portable Git Bash on Windows. No admin rights, and it leaves whatever is already on your system alone.

Then:

```bash
source ~/.bashrc    # or: source ~/.zshrc
agentfoxxy
```

### 3. From source (developers)

```bash
git clone https://github.com/usmanxg58-byte/AgentFOXXY.git
cd AgentFOXXY
uv pip install -e ".[all]"
agentfoxxy
```

---

## 🎯 Your first five minutes

```bash
agentfoxxy setup        # one wizard: model, keys, tools — all of it
agentfoxxy              # start talking
```

Handy after that:

```bash
agentfoxxy model        # switch provider or model
agentfoxxy tools        # turn tools on and off
agentfoxxy gateway      # connect Telegram / Discord / Slack / WhatsApp / Signal
agentfoxxy -z "..."     # run one job and exit — no chat
agentfoxxy update       # update in place
agentfoxxy doctor       # something broken? start here
```

---

## 🧰 What it can actually do

| | |
|---|---|
| **Code** | Read, write, and run code. Run shell commands. Whole-project edits, not snippets. |
| **Browser** | Drive a real browser — see the page, click, type, log in. |
| **Computer** | Take over a full desktop when a browser is not enough. |
| **Media** | Make images, video, and speech from text. |
| **Search** | Search the web and X, then open and read the results. |
| **Memory** | Its own notes, plus search across every conversation you have had. |
| **Skills** | 16 built in, and 21 optional packs — finance, security, devops, research, and more. |
| **Schedules** | Recurring jobs described in plain words. |
| **MCP** | Plug in any Model Context Protocol server to add more tools. |

Over 40 tools in total.

---

## 💬 Terminal or phone — same agent

Two front doors into one agent. Most slash commands work in both.

| What you want | Terminal | Telegram · Discord · Slack · WhatsApp · Signal |
|---|---|---|
| Start | `agentfoxxy` | `agentfoxxy gateway setup`, then `gateway start`, then message the bot |
| Start fresh | `/new` | `/new` |
| Change model | `/model` | `/model` |
| Change personality | `/personality` | `/personality` |
| Retry / undo | `/retry`, `/undo` | `/retry`, `/undo` |
| Shrink context / see cost | `/compress`, `/usage` | `/compress`, `/usage` |
| Run a skill | `/skills`, `/<name>` | `/<name>` |
| Stop it | `Ctrl+C` | `/stop` |

---

## 🔍 Good to know

- **It asks before it runs risky commands.** Approve once, or add a pattern to your allowlist so it stops asking. `agentfoxxy approvals` will even suggest allowlist entries based on what you keep approving.
- **Your keys are yours.** You pick the provider and the agent talks to it directly. Shared gateways and subscription routing exist if you would rather have one bill than ten API keys — but they are opt-in, never the default.
- **Bring your own model.** Point it at Ollama on your own machine and nothing leaves the building.
- **Requirements:** Python 3.11+ on Linux, macOS, or Windows. The installer handles the rest.

---

## 🤝 Contributing

Run the installer, then work from the checkout it creates:

```bash
cd "${AGENTFOXXY_HOME:-$HOME/.agentfoxxy}/agentfoxxy-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

## 📄 License

MIT. Built on the Hermes Agent open-source project — see [NOTICE.md](NOTICE.md) for attribution.

<div align="center">

🦊 **AgentFOXXY** — built and maintained by [@usmanxg58-byte](https://github.com/usmanxg58-byte)

</div>




