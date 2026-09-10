<div align="center">

# 🦊 AgentFOXXY

### Un agente de IA que termina el trabajo

**Un agente. Cualquier modelo. Corre en tu terminal, en un servidor o desde tu teléfono.**

<p>
  <img src="https://img.shields.io/badge/Python-3.11-FB923C?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11">
  <img src="https://img.shields.io/badge/Plataformas-Linux%20%7C%20macOS%20%7C%20Windows-FBBF24?style=for-the-badge" alt="Plataformas">
  <img src="https://img.shields.io/badge/Proveedores-35%2B-EA580C?style=for-the-badge" alt="35+ proveedores de modelos">
  <img src="https://img.shields.io/badge/Herramientas-40%2B-F59E0B?style=for-the-badge" alt="40+ herramientas">
</p>

**Español** · [English](README.md) · [简体中文](README.zh-CN.md) · [اردو](README.ur-pk.md)

</div>

---

## La versión corta

La mayoría de las herramientas de IA responden preguntas. AgentFOXXY hace el trabajo.

Describes un trabajo en palabras simples. Planifica los pasos, escribe el código, lo ejecuta, lee los errores, los corrige y sigue hasta que el trabajo esté terminado — usando una terminal real, un navegador real y archivos reales en tu máquina.

Luego hace algo inusual: **escribe lo que aprendió.** La próxima vez que aparezca un trabajo similar, ya sabe cómo hacerlo.

---

## Míralo funcionar

**Dale un trabajo y aléjate:**

```bash
agentfoxxy -z "lee ventas.csv, encuentra los 5 peores meses, grafícalos, guarda como reporte.png"
```

Abre el archivo, calcula los números, escribe el código de gráficos, lo ejecuta, mira la imagen que produjo y corrige el gráfico si salió mal.

**Déjalo conducir un navegador:**

```bash
agentfoxxy
> inicia sesión en el panel de administración, exporta los pedidos del mes pasado y envíame los totales por correo
```

No es scraping de HTML — un navegador real que puede ver, hacer clic y escribir.

**Envíale mensajes desde tu teléfono:**

```bash
agentfoxxy gateway start
```

Ahora envíale mensajes en Telegram, Discord, Slack, WhatsApp o Signal. Mismo agente, misma memoria, misma conversación que dejaste abierta en la terminal.

**Dale una orden permanente:**

```
> todos los días de la semana a las 8am, revisa mis repositorios en busca de compilaciones fallidas y envíame un resumen
```

Sin sintaxis cron. Configura el horario por sí mismo.

---

## Lo que lo hace diferente

Muchas herramientas se llaman agentes. Aquí está lo que realmente es diferente, y cómo funciona.

### 🧠 Mejora — y puedes leer por qué

Cuando AgentFOXXY resuelve algo complicado, guarda el método como una **habilidad**: un archivo markdown simple en tu carpeta de habilidades. Puedes abrirlo, editarlo, eliminarlo o enviárselo a un colega. Nada está encerrado en una caja negra.

También mantiene sus propias notas con búsqueda y puede revisar cada conversación pasada, así que dejas de re-explicar tu configuración cada mañana.

### 🔌 No está atado a una sola compañía de IA

35+ proveedores funcionan listos para usar — OpenAI, Anthropic, Gemini, DeepSeek, Qwen, xAI, Bedrock, Azure, OpenRouter, Ollama, y cualquier endpoint compatible con OpenAI que le apuntes.

```bash
agentfoxxy model        # elige un proveedor y modelo, o cambia a mitad de conversación
```

Un comando para cambiar. Sin cambios de código. Si un proveedor se cae, se pone lento o se vuelve caro, cambias — y tu historial, habilidades y configuración vienen contigo.

### 🐝 Los trabajos grandes se dividen

Cuando un trabajo tiene partes independientes, inicia agentes auxiliares que se ejecutan al mismo tiempo (el enjambre TeamFOXXY) y recopila sus resultados. Una refactorización de diez archivos no tiene que ser diez pasos seguidos.

### 🖥️ Es un programa real, no una caja de chat

Una aplicación de terminal apropiada: entrada multilínea, autocompletado de comandos con slash, salida de herramientas que fluye en vivo, y puedes interrumpir y redirigirlo a mitad de pensamiento. También hay una aplicación de escritorio para Windows y un panel web.

### 🌍 Se ejecuta donde lo necesites

Tu laptop, Docker, un VPS de $5 por SSH, un sandbox en la nube, o Termux en Android. Windows nativo es totalmente compatible — no se necesita WSL.

---

## 🚀 Instalar

Tres formas de entrar. Elige una.

### 1. Aplicación de escritorio — la más fácil (Windows · macOS)

Descarga, doble clic, listo. Sin terminal.

**➡️ [Obtén la última versión](https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest)**

| Archivo | Úsalo para |
|---|---|
| **Windows** | |
| `AgentFOXXY-*-win-x64.exe` | Instalación normal — comienza aquí |
| `AgentFOXXY-*-win-x64.msi` | Despliegue empresarial / silencioso |
| **macOS** | |
| `AgentFOXXY-*-mac-arm64.dmg` | Apple Silicon (M1/M2/M3) |
| `AgentFOXXY-*-mac-x64.dmg` | Mac Intel |

> **Windows:** puede advertir sobre un "editor desconocido" la primera vez — haz clic en **Más información → Ejecutar de todos modos**. Esa advertencia significa que el instalador no está firmado con pago aún, no que haya algo mal con él.
> 
> **macOS:** haz clic derecho en la aplicación → Abrir (solo la primera vez) para omitir Gatekeeper, o ejecuta `xattr -cr /Applications/AgentFOXXY.app` en Terminal.

### 2. Un comando (Linux · macOS · WSL2 · Termux)

```bash
curl -fsSL https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.sh | bash
```

**Windows PowerShell:**

```powershell
iex (irm https://raw.githubusercontent.com/usmanxg58-byte/AgentFOXXY/main/scripts/install.ps1)
```

El instalador trae su propio `uv`, Python 3.11, Node.js, ripgrep y ffmpeg — más un Git Bash portable en Windows. Sin derechos de administrador, y deja solo lo que ya está en tu sistema.

Luego:

```bash
source ~/.bashrc    # o: source ~/.zshrc
agentfoxxy
```

### 3. Desde el código fuente (desarrolladores)

```bash
git clone https://github.com/usmanxg58-byte/AgentFOXXY.git
cd AgentFOXXY
uv pip install -e ".[all]"
agentfoxxy
```

---

## 🎯 Tus primeros cinco minutos

```bash
agentfoxxy setup        # un asistente: modelo, claves, herramientas — todo
agentfoxxy              # empieza a hablar
```

Útil después de eso:

```bash
agentfoxxy model        # cambia proveedor o modelo
agentfoxxy tools        # activa y desactiva herramientas
agentfoxxy gateway      # conecta Telegram / Discord / Slack / WhatsApp / Signal
agentfoxxy -z "..."     # ejecuta un trabajo y sale — sin chat
agentfoxxy update       # actualiza en el lugar
agentfoxxy doctor       # ¿algo roto? empieza aquí
```

---

## 🧰 Lo que realmente puede hacer

| | |
|---|---|
| **Código** | Lee, escribe y ejecuta código. Ejecuta comandos de shell. Ediciones de proyecto completo, no fragmentos. |
| **Navegador** | Conduce un navegador real — ve la página, hace clic, escribe, inicia sesión. |
| **Computadora** | Toma el control de un escritorio completo cuando un navegador no es suficiente. |
| **Medios** | Crea imágenes, video y voz desde texto. |
| **Búsqueda** | Busca en la web y X, luego abre y lee los resultados. |
| **Memoria** | Sus propias notas, más búsqueda en cada conversación que has tenido. |
| **Habilidades** | 16 integradas, y 21 paquetes opcionales — finanzas, seguridad, devops, investigación y más. |
| **Horarios** | Trabajos recurrentes descritos en palabras simples. |
| **MCP** | Conecta cualquier servidor del Protocolo de Contexto de Modelo para agregar más herramientas. |

Más de 40 herramientas en total.

---

## 💬 Terminal o teléfono — mismo agente

Dos puertas de entrada a un agente. La mayoría de los comandos slash funcionan en ambos.

| Lo que quieres | Terminal | Telegram · Discord · Slack · WhatsApp · Signal |
|---|---|---|
| Iniciar | `agentfoxxy` | `agentfoxxy gateway setup`, luego `gateway start`, luego mensaje al bot |
| Empezar de nuevo | `/new` | `/new` |
| Cambiar modelo | `/model` | `/model` |
| Cambiar personalidad | `/personality` | `/personality` |
| Reintentar / deshacer | `/retry`, `/undo` | `/retry`, `/undo` |
| Reducir contexto / ver costo | `/compress`, `/usage` | `/compress`, `/usage` |
| Ejecutar una habilidad | `/skills`, `/<nombre>` | `/<nombre>` |
| Detenerlo | `Ctrl+C` | `/stop` |

---

## 🔍 Bueno saber

- **Pregunta antes de ejecutar comandos arriesgados.** Aprueba una vez, o agrega un patrón a tu lista de permitidos para que deje de preguntar. `agentfoxxy approvals` incluso sugerirá entradas de lista de permitidos basadas en lo que sigues aprobando.
- **Tus claves son tuyas.** Tú eliges el proveedor y el agente le habla directamente. Existen gateways compartidos y enrutamiento de suscripción si prefieres tener una factura en lugar de diez claves API — pero son opcionales, nunca el predeterminado.
- **Trae tu propio modelo.** Apúntalo a Ollama en tu propia máquina y nada sale del edificio.
- **Requisitos:** Python 3.11+ en Linux, macOS o Windows. El instalador maneja el resto.

---

## 🤝 Contribuir

Ejecuta el instalador, luego trabaja desde el checkout que crea:

```bash
cd "${AGENTFOXXY_HOME:-$HOME/.agentfoxxy}/agentfoxxy-agent"
uv pip install -e ".[all,dev]"
scripts/run_tests.sh
```

---

## 📄 Licencia

MIT. Construido sobre el proyecto de código abierto Hermes Agent — ve [NOTICE.md](NOTICE.md) para atribución.

<div align="center">

🦊 **AgentFOXXY** — construido y mantenido por [@usmanxg58-byte](https://github.com/usmanxg58-byte)

</div>
