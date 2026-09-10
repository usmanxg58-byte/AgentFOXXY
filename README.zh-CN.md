<div align="center">

# 🦊 AgentFOXXY

### 一个能完成工作的 AI 智能体

**一个智能体。任意模型。在你的终端、服务器或手机上运行。**

<p>
  <img src="https://img.shields.io/badge/Python-3.11-FB923C?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
  <img src="https://img.shields.io/badge/平台-Linux%20%7C%20macOS%20%7C%20Windows-FBBF24?style=for-the-badge" alt="平台">
  <img src="https://img.shields.io/badge/提供商-35%2B-EA580C?style=for-the-badge" alt="35+ 模型提供商">
  <img src="https://img.shields.io/badge/工具-40%2B-F59E0B?style=for-the-badge" alt="40+ 工具">
</p>

**简体中文** · [English](README.md) · [Español](README.es.md) · [اردو](README.ur-pk.md)

</div>

---

## 简短版本

大多数 AI 工具回答问题。AgentFOXXY 完成工作。

你用简单的语言描述一项工作。它规划步骤、编写代码、运行代码、读取错误、修复错误，并持续工作直到完成 — 使用真实的终端、真实的浏览器和你机器上的真实文件。

然后它做了一件不寻常的事：**它记录下学到的东西。** 下次出现类似工作时，它已经知道怎么做了。

---

## 看它如何工作

**给它一个工作然后离开：**

```bash
agentfoxxy -z "读取 sales.csv，找出最差的 5 个月，绘制图表，保存为 report.png"
```

它打开文件、计算数字、编写绘图代码、运行代码、查看生成的图像，如果图表有问题就修复它。

**让它驾驶浏览器：**

```bash
agentfoxxy
> 登录管理面板，导出上个月的订单，并将总计通过电子邮件发送给我
```

不是 HTML 抓取 — 而是一个它可以看到、点击和输入的真实浏览器。

**从你的手机向它发消息：**

```bash
agentfoxxy gateway start
```

现在在 Telegram、Discord、Slack、WhatsApp 或 Signal 上向它发消息。同一个智能体，同样的记忆，你在终端中留下的同一个对话。

**给它一个固定指令：**

```
> 每个工作日早上 8 点，检查我的仓库是否有失败的构建并给我发送摘要
```

无需 cron 语法。它自己设置时间表。

---

## 使它与众不同的地方

很多工具自称智能体。这是真正不同的地方，以及它如何工作。

### 🧠 它会变得更好 — 而且你可以看到原因

当 AgentFOXXY 解决了一些棘手的问题时，它会将方法保存为**技能**：你的技能文件夹中的一个简单 markdown 文件。你可以打开它、编辑它、删除它或发送给同事。没有任何东西被锁在黑盒子里。

它还保留自己的可搜索笔记，并可以回顾每一次过去的对话，所以你不用每天早上重新解释你的设置。

### 🔌 它不绑定到一家 AI 公司

35+ 提供商开箱即用 — OpenAI、Anthropic、Gemini、DeepSeek、Qwen、xAI、Bedrock、Azure、OpenRouter、Ollama，以及你指向的任何兼容 OpenAI 的端点。

```bash
agentfoxxy model        # 选择提供商和模型，或在对话中途切换
```

一条命令即可切换。无需更改代码。如果提供商宕机、变慢或变贵，你就切换 — 你的历史记录、技能和设置都会跟着你。

### 🐝 大工作会被拆分

当一个工作有独立部分时，它会启动同时运行的辅助智能体（TeamFOXXY 集群）并收集它们的结果。十个文件的重构不必是连续的十个步骤。

### 🖥️ 它是一个真正的程序，而不是聊天框

一个合适的终端应用：多行输入、斜杠命令自动完成、实时流式输出工具输出，你可以在它思考时中断并重定向它。还有 Windows 桌面应用和 Web 仪表板。

### 🌍 它可以在你需要的地方运行

你的笔记本电脑、Docker、通过 SSH 的 $5 VPS、云沙盒或 Android 上的 Termux。完全支持原生 Windows — 不需要 WSL。

---

## 🚀 安装

三种方式。选择一种。

### 1. 桌面应用 — 最简单（Windows · macOS）

下载、双击、完成。无需终端。

**➡️ [获取最新版本](https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest)**

| 文件 | 用途 |
|---|---|
| **Windows** | |
| `AgentFOXXY-*-win-x64.exe` | 正常安装 — 从这里开始 |
| `AgentFOXXY-*-win-x64.msi` | 企业 / 静默部署 |
| **macOS** | |
| `AgentFOXXY-*-mac-arm64.dmg` | Apple Silicon (M1/M2/M3) |
| `AgentFOXXY-*-mac-x64.dmg` | Intel Mac |

> **Windows：** 第一次可能会警告"未知发布者" — 点击**更多信息 → 仍要运行**。该警告意味着安装程序尚未付费签名，而不是有什么问题。
> 
> **macOS：** 右键点击应用 → 打开（仅第一次）以绕过 Gatekeeper，或在终端中运行 `xattr -cr /Applications/AgentFOXXY.app`。

### 2. 一条命令（Linux · macOS · WSL2 · Termux）

```bash
curl -fsSL https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.sh | bash
```

**Windows PowerShell：**

```powershell
iex (irm https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.ps1)
```

安装程序自带 `uv`、Python 3.11、Node.js、ripgrep 和 ffmpeg — 在 Windows 上还有便携式 Git Bash。无需管理员权限，并且不会影响你系统上已有的任何东西。

然后：

```bash
source ~/.bashrc    # 或：source ~/.zshrc
agentfoxxy
```

### 3. 从源代码（开发者）

```bash
git clone https://github.com/usmanxg58-byte/AgentFOXXY.git
cd AgentFOXXY
uv pip install -e ".[all]"
agentfoxxy
```

---

## 🎯 你的前五分钟

```bash
agentfoxxy setup        # 一个向导：模型、密钥、工具 — 全部
agentfoxxy              # 开始对话
```

之后方便的命令：

```bash
agentfoxxy model        # 切换提供商或模型
agentfoxxy tools        # 打开和关闭工具
agentfoxxy gateway      # 连接 Telegram / Discord / Slack / WhatsApp / Signal
agentfoxxy -z "..."     # 运行一个工作并退出 — 无聊天
agentfoxxy update       # 原地更新
agentfoxxy doctor       # 有问题？从这里开始
```

---

## 🧰 它实际能做什么

| | |
|---|---|
| **代码** | 读取、编写和运行代码。运行 shell 命令。整个项目编辑，而不是片段。 |
| **浏览器** | 驾驶真实浏览器 — 看到页面、点击、输入、登录。 |
| **计算机** | 当浏览器不够用时，接管整个桌面。 |
| **媒体** | 从文本创建图像、视频和语音。 |
| **搜索** | 搜索网络和 X，然后打开并阅读结果。 |
| **记忆** | 它自己的笔记，加上你拥有的每次对话的搜索。 |
| **技能** | 16 个内置，21 个可选包 — 金融、安全、开发运维、研究等。 |
| **时间表** | 用简单的语言描述的重复工作。 |
| **MCP** | 插入任何模型上下文协议服务器以添加更多工具。 |

总共超过 40 个工具。

---

## 💬 终端或手机 — 同一个智能体

通往一个智能体的两扇门。大多数斜杠命令在两者中都有效。

| 你想要什么 | 终端 | Telegram · Discord · Slack · WhatsApp · Signal |
|---|---|---|
| 启动 | `agentfoxxy` | `agentfoxxy gateway setup`，然后 `gateway start`，然后向机器人发消息 |
| 重新开始 | `/new` | `/new` |
| 更改模型 | `/model` | `/model` |
| 更改个性 | `/personality` | `/personality` |
| 重试 / 撤销 | `/retry`、`/undo` | `/retry`、`/undo` |
| 缩小上下文 / 查看成本 | `/compress`、`/usage` | `/compress`、`/usage` |
| 运行技能 | `/skills`、`/<名称>` | `/<名称>` |
| 停止它 | `Ctrl+C` | `/stop` |

---

## 🔍 需要知道的

- **它会在运行危险命令之前询问。** 批准一次，或将模式添加到你的允许列表，这样它就不再询问。`agentfoxxy approvals` 甚至会根据你一直批准的内容建议允许列表条目。
- **你的密钥是你的。** 你选择提供商，智能体直接与其通信。如果你不想收集五个单独的 API 密钥，可以选择共享网关和订阅路由 — 但它们是可选的，永远不是默认的。
- **带上你自己的模型。** 将其指向你自己机器上的 Ollama，什么都不会离开大楼。
- **要求：** Linux、macOS 或 Windows 上的 Python 3.11+。安装程序处理其余部分。

---

## 🤝 贡献

运行安装程序，然后从它创建的检出工作：

```bash
cd "${AGENTFOXXY_HOME:-$HOME/.agentfoxxy}/agentfoxxy-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

## 📄 许可证

MIT。基于 Hermes Agent 开源项目构建 — 请参阅 [NOTICE.md](NOTICE.md) 了解署名。

<div align="center">

🦊 **AgentFOXXY** — 由 [@usmanxg58-byte](https://github.com/usmanxg58-byte) 构建和维护

</div>
