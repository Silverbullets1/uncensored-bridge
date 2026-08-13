<div align="center">

# 🔓 Uncensored Bridge

### *Your Model · Your Hardware · We Host Nothing.*

**A 100% client-side chat UI that connects your browser straight to your own Ollama.**
**No backend. No database. No logs. No censorship. No limits.**

[![MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Static](https://img.shields.io/badge/type-100%25%20static-blue.svg)](.)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.)

</div>

---

## 🚀 Why Uncensored Bridge?

Big AI chat apps **read your chats**, **censor your prompts**, and **rent you compute** you already own.
Uncensored Bridge flips the model:

| | 🔓 This Tool | Open WebUI | LibreChat |
|--|-------------|------------|-----------|
| Backend server | ❌ None | ✅ Docker | ✅ Node |
| Can anyone read your chats? | ❌ **Impossible** (no server) | ⚠️ Admins can | ⚠️ Admins can |
| Your RAM / CPU used | ✅ Yours | Server's | Server's |
| Censorship | ❌ None | Manual | Manual |
| Mobile (PWA) | ✅ Native-like | ⚠️ Web | ⚠️ Web |
| Cost to run | **$0 forever** | Server bill | Server bill |

> 🔑 **Unique by architecture:** because there is literally no server, nobody — not us, not any admin — can log, read, or filter what you type. Privacy isn't a setting here. It's impossible to break.

---

## ✨ Features

- 🔥 **Uncensored out of the box** — ships with Hinglish "Lucifer", Dolphin, Coder & Roleplay presets
- 🧠 **Bring Any Model** — point it at your Ollama, pick any model you pulled
- 📱 **PWA** — "Add to Home Screen" on iOS/Android, feels like a native app
- 🎤 **Voice input** — speak to your model (WebSpeech)
- 💡 **Thinking display** — watch Qwen3 reason in real time
- 💎 **Freemium ready** — free forever; Pro license hooks built in for future tiers
- 🛡️ **Zero telemetry** — no analytics, no cookies, no storage of your chats

---

## ⚡ Quick Start

### 🖥️ A. Local Ollama (Desktop — Chrome / Edge / Firefox)

```bash
# 1. Install Ollama  →  https://ollama.com/download
# 2. Allow browser access (REQUIRED):
export OLLAMA_ORIGINS="*"          # macOS / Linux
$env:OLLAMA_ORIGINS="*"            # Windows PowerShell

# 3. Pull an uncensored model & run:
ollama pull qwen3-4b-65k            # fast + uncensored
ollama serve                       # start the API

# 4. Open the tool → it auto-connects → pick a model → chat 🔥
```

> ⚠️ **Safari / iPhone** block `localhost` over HTTP from an HTTPS page. Use **Option B** or the iOS tunnel below.

---

### ☁️ B. Free Cloud Ollama (Render / Railway) — works on iPhone ✅

Deploy **your own** Ollama to a free tier (RAM-limited → use 1B–4B models):

- **Render:** use the included `render.yaml` → *New → Blueprint* → deploy. Get `https://you.onrender.com`.
- **Railway:** `railway up` with the included `Dockerfile`.
- Paste that **HTTPS** URL into the tool's Endpoint field.

> Free tiers ≈ 512MB–2GB RAM → stick to `llama3.2:1b`, `qwen3:4b-abliterated`, `dolphin-2.9`.

---

### 📱 C. iPhone with your HOME Ollama (HTTPS tunnel)

```bash
# On the desktop running Ollama:
ollama serve
cloudflared tunnel --url http://localhost:11434
# Copy the https://*.trycloudflare.com URL → open in iPhone Safari → Add to Home Screen
```

---

## 🧠 Best Uncensored Models

Abliterated models strip refusal but lose a little quality. For the best result, prefer **Dolphin fine-tunes** or **abliterated Qwen3**:

```bash
ollama pull qwen3-4b-65k          # fast, uncensored (used by presets)
ollama pull dolphin-llama3:8b     # stronger, trained uncensored
ollama pull llama3.2:1b           # tiny, for free cloud tiers
```

---

## 🌐 Deploy the Tool (optional)

It's just static files — host it **free** anywhere:

- **Vercel / Netlify / GitHub Pages:** push this repo → auto-deploys.
- **Your VPS:** `python3 -m http.server 8080` inside the folder.

No env vars, no secrets, no build step.

---

## 💎 Freemium Roadmap

| Tier | Price | Includes |
|------|-------|----------|
| **Free** (forever) | $0 | BYO model · chat · presets · voice · PWA |
| **Pro** (future) | $5 / device | Premium personas · multi-Ollama swarm · browser tool-use · cloud sync |

Free tier stays serverless and **never paywalled** — that is the core privacy promise. Pro adds convenience only.

---

## 🛡️ Privacy

- Zero backend. Every request goes **browser → your Ollama**.
- No analytics, no cookies, no server-side storage of conversations.
- Your endpoint + license live only in your browser's `localStorage`.

---

## 🤝 Contributing

PRs welcome! Add a persona, a UI tweak, a deploy template. Keep it **client-only**.

## 📄 License

[MIT](LICENSE) © Silverbullets1
