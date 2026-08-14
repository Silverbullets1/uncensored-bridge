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

## ⚡ Quick Start (3 ways)

### 🖥️ A. Local Ollama (Desktop — Chrome / Edge / Firefox)

```bash
# 1. Install Ollama  →  https://ollama.com/download
# 2. Allow browser access (REQUIRED so the web UI can talk to it)::
export OLLAMA_ORIGINS="*"          # macOS / Linux
$env:OLLAMA_ORIGINS="*"            # Windows PowerShell

# 3. Pull an uncensored model & run:
ollama pull llama3.2:1b            # tiny + uncensored
ollama pull qwen3:4b-abliterated   # stronger, uncensored
ollama serve                       # start the API on :11434

# 4. Open the tool → it auto-connects → pick a model → chat 🔥
```

> ⚠️ **Safari / iPhone** block `localhost` over HTTP from an HTTPS page. Use **Option B** (cloud) or the iOS tunnel below.

---

### ☁️ B. Your Own Cloud Ollama (Render / Railway) — works on iPhone ✅

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

## 🌐 Deploy THE TOOL Yourself (free, 2 min)

It's just static files — host it **free** anywhere. **You must set your own Ollama endpoint** (we don't host one for you):

### Option 1: Netlify (recommended, HTTPS works everywhere)
1. Fork this repo → **Netlify → Add new site → Import from Git** → select your fork
2. Build command: _(blank)_ · Publish dir: `.`
3. **Site settings → Environment variables → add:**
   ```
   OLLAMA_URL = https://your-ollama-url-here  (your own Ollama, HTTPS)
   ```
   _(If you skip this, the `/api/ollama` proxy has nothing to talk to — set it!)_
4. Deploy → open `https://yoursite.netlify.app` → tool auto-uses `/api/ollama` ✅

### Option 2: Vercel
1. Import repo → Framework `Other` · Build _(blank)_ · Output `.`
2. Add env var `OLLAMA_URL` = your Ollama HTTPS URL
3. Deploy → tool auto-uses `/api/ollama`

### Option 3: GitHub Pages / any static host
1. Enable Pages on your fork
2. Open the tool → ⚙ → set **Endpoint** manually to your Ollama URL (HTTPS for iPhone)
3. If you use plain HTTP Ollama, open the tool over **HTTP** too (mixed-content block on HTTPS)

### Option 4: Your own VPS (HTTP, no proxy)
```bash
cd uncensored-bridge
python3 -m http.server 8080
# open http://your-vps-ip:8080 → set Endpoint to http://your-vps-ip:11434
```

---

## 🔧 How It Works (architecture)

```
┌─────────────┐      fetch       ┌──────────────┐
│  Your Browser │ ──────────────▶ │  Your Ollama  │
│  (the tool)   │  (client-only)  │  (your model) │
└─────────────┘                  └──────────────┘
       │
       │  if hosted on HTTPS (Netlify/Vercel):
       │  /api/ollama/*  ──▶ serverless proxy ──▶ your Ollama URL
       │  (proxy reads OLLAMA_URL env, forwards request)
       └─  no logs, no storage, request passthrough only
```

- **The tool is 100% static** — HTML/CSS/JS only, no server code bundled.
- **The optional proxy** (`api/ollama.js`) is a thin pass-through. It reads `OLLAMA_URL` from **your** deploy's env vars. We never see your traffic.
- **Your endpoint + license** live only in your browser's `localStorage`.

---

## 🧠 Best Uncensored Models

Abliterated models strip refusal but lose a little quality. For the best result, prefer **Dolphin fine-tunes** or **abliterated Qwen3**:

```bash
ollama pull qwen3:4b-abliterated     # fast, uncensored
ollama pull dolphin-llama3:8b        # stronger, trained uncensored
ollama pull llama3.2:1b             # tiny, for free cloud tiers
```

---

## 💎 Freemium Roadmap

| Tier | Price | Includes |
|------|-------|----------|
| **Free** (forever) | $0 | BYO model · chat · presets · voice · PWA |
| **Pro** (future) | $5 / device | Premium personas · multi-Ollama swarm · browser tool-use · cloud sync |

Free tier stays serverless and **never paywalled** — that is the core privacy promise. Pro adds convenience only.

---

## 🛡️ Privacy

- Zero backend. Every request goes **browser → your Ollama** (or your proxy → your Ollama).
- No analytics, no cookies, no server-side storage of conversations.
- The proxy function stores **nothing** — it forwards and forgets.

---

## 🤝 Contributing

PRs welcome! Add a persona, a UI tweak, a deploy template. Keep it **client-only**.

## 📄 License

[MIT](LICENSE) © Silverbullets1
