<div align="center">

# 🦊 AgentFOXXY

### 自我进化的自主 AI 智能代理

**一个代理，任意模型。在终端、服务器，或手机上完成真实工作。**

<p>
  <img src="https://img.shields.io/badge/Python-3.11-FB923C?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
  <img src="https://img.shields.io/badge/Platforms-Linux%20%7C%20macOS%20%7C%20Windows-FBBF24?style=for-the-badge" alt="Platforms">
  <img src="https://img.shields.io/badge/Tools-40%2B-EA580C?style=for-the-badge" alt="40+ tools">
</p>

[English](README.md) · **简体中文** · [اردو](README.ur-pk.md)

</div>

---

## AgentFOXXY 是什么？

AgentFOXXY 是一个真正能干活的自主 AI 智能代理。它能编写并运行代码、操作浏览器、生成多媒体内容、搜索网络、记住重要信息，还能派生自己的子代理来并行工作——这一切只需一条命令。

它是 **模型无关** 的：可以接入 OpenAI、OpenRouter、本地端点，或任何兼容 OpenAI 的网关。一条命令即可切换，无需改代码，无厂商锁定。

它还会 **自我进化**：从经验中构建技能，在使用中不断打磨，检索自己过去的对话，并在每一次会话中加深对你的理解。

---

## ✨ 亮点

| | |
|---|---|
| 🧠 **闭环学习** | 自主创建并优化技能，维护持久记忆，并支持对历史会话做全文检索。用得越多，它越好用。 |
| 🦾 **真正的终端 UI** | 多行编辑、斜杠命令自动补全、对话历史、随时打断并改变方向，以及工具输出的实时流式显示。 |
| 💬 **在你所在的地方** | 通过 CLI、Telegram、Discord、Slack、WhatsApp 或 Signal 与它对话——一个网关，跨平台连续会话。 |
| 🐝 **分派与并行** | 派生相互隔离的子代理（TeamFOXXY 集群）来处理并行工作流与多步流水线。 |
| ⏰ **定时自动化** | 内置 cron 调度器，用自然语言描述即可无人值守地跑日报、夜间备份和每周审计。 |
| 🌍 **随处运行** | 本地、Docker、SSH 或无服务器沙箱。放在 5 美元的 VPS 或 GPU 集群上都行——它不绑定你的笔记本。 |

---

## 🚀 下载与安装

获取 AgentFOXXY 有三种方式，任选其一。

### 1. 🖥️ 桌面应用（最简单 — Windows）

下载安装包，双击，完成。无需终端。

**➡️ [下载最新版本](https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest)**

| 文件 | 适用场景 |
|---|---|
| `AgentFOXXY-*-win-x64.exe` | 常规安装（推荐） |
| `AgentFOXXY-*-win-x64.msi` | 企业 / 静默部署 |

> 首次启动时 Windows 可能提示「未知发布者」——点击 **更多信息 → 仍要运行**。应用本身是安全的，只是没有购买代码签名证书。

### 2. ⌨️ 命令行安装（Linux · macOS · WSL2 · Termux · Windows）

**Linux / macOS / WSL2 / Termux：**

```bash
curl -fsSL https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.sh | bash
```

**Windows（原生，PowerShell）：**

```powershell
iex (irm https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.ps1)
```

安装程序会替你准备好一切——`uv`、Python 3.11、Node.js、ripgrep、ffmpeg，以及 Windows 上的便携版 Git Bash（无需管理员权限，与系统 Git 完全隔离）。原生 Windows 获得完整支持：CLI、网关、TUI 和各类工具都无需 WSL 即可运行。

然后重新加载 shell 并开始对话：

```bash
source ~/.bashrc    # 或：source ~/.zshrc
agentfoxxy
```

### 3. 🛠️ 从源码安装（开发者）

```bash
git clone https://github.com/usmanxg58-byte/AgentFOXXY.git
cd AgentFOXXY
uv pip install -e ".[all]"
agentfoxxy
```

---

## 🎯 快速开始

```bash
agentfoxxy              # 交互式 CLI —— 开始一段对话
agentfoxxy model        # 选择 LLM 提供商和模型
agentfoxxy tools        # 配置启用哪些工具
agentfoxxy gateway      # 启动消息网关（Telegram、Discord 等）
agentfoxxy setup        # 完整设置向导 —— 一次配置好所有内容
agentfoxxy update       # 更新到最新版本
agentfoxxy doctor       # 诊断问题
```

把 AgentFOXXY 指向任意你喜欢的提供商：

```bash
agentfoxxy model        # 交互式选择提供商 + 模型
agentfoxxy -z "用 FastAPI 给我写一个带测试的 REST API"   # 一次性任务
```

---

## 🧰 它能做什么

- **编码与计算机操作** —— 读写并运行代码；执行 shell 命令；驱动真实浏览器；控制完整桌面。
- **子代理** —— 把大任务分派给一群并行工作的专职代理。
- **多媒体** —— 由文本生成图像、视频和语音。
- **网络与搜索** —— 搜索网络与 X，抓取并阅读网页。
- **记忆** —— 持久的自主维护记忆，外加对历史会话的全文检索。
- **MCP** —— 接入任意 Model Context Protocol 服务器来扩展能力。
- **40+ 内置工具** —— 终端、代码执行、待办跟踪、消息收发、技能系统等等。

---

## 💬 CLI 与消息网关

AgentFOXXY 有两个入口：终端 UI（`agentfoxxy`），或者通过 Telegram、Discord、Slack、WhatsApp、Signal 与之对话的网关。大多数斜杠命令在两边都能用。

| 操作 | CLI | 消息网关 |
|---|---|---|
| 开始对话 | `agentfoxxy` | `agentfoxxy gateway setup` + `gateway start`，然后给机器人发消息 |
| 新建对话 | `/new` 或 `/reset` | `/new` 或 `/reset` |
| 切换模型 | `/model [provider:model]` | `/model [provider:model]` |
| 设置人格 | `/personality [name]` | `/personality [name]` |
| 重试 / 撤销 | `/retry`、`/undo` | `/retry`、`/undo` |
| 上下文与用量 | `/compress`、`/usage` | `/compress`、`/usage` |
| 技能 | `/skills` 或 `/<skill-name>` | `/<skill-name>` |
| 打断 | `Ctrl+C` 或发送新消息 | `/stop` 或发送新消息 |

---

## 🤝 参与贡献

先用安装程序安装，然后在它创建的 git 检出目录
`$AGENTFOXXY_HOME/agentfoxxy-agent`（通常是 `~/.agentfoxxy/agentfoxxy-agent`）中开发：

```bash
cd "${AGENTFOXXY_HOME:-$HOME/.agentfoxxy}/agentfoxxy-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

## 📄 许可证

MIT —— 见 [LICENSE](LICENSE)。

基于 Hermes Agent 开源项目构建 —— 署名信息见 [NOTICE.md](NOTICE.md)。

---

<div align="center">

🦊 **AgentFOXXY** —— 由 [@usmanxg58-byte](https://github.com/usmanxg58-byte) 构建与维护

</div>

