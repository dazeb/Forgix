<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=Forgix%20🚀&fontSize=80&animation=fadeIn&fontAlignY=35" width="100%" alt="Forgix Animated Banner" />
  <br />
  <p><b>Instant project scaffolding — from template to ready-to-code in seconds.</b></p>

  <img src="https://img.shields.io/npm/v/@7h41c/forgix.svg?style=flat-square&color=cb3837" alt="NPM Version" />
  <img src="https://img.shields.io/badge/Node.js-22+-green.svg?style=flat-square" alt="Node Support" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
</div>

---

## ⚡ What is Forgix?

Forgix is a **CLI tool** that scaffolds new projects from templates — automatically.

```bash
# Before (manual setup)
git clone <repo> my-app
cd my-app && rm -rf .git
# Edit configs, npm install, git init, open VS Code

# After (one command)
forgix create my-app
```

---

## 📦 Templates (11 Built-in)

### ⚛️ React
| Template | Stack |
|---------|-------|
| `react-vite` | React 18 + Vite |
| `react-vite-ts` | React 18 + Vite + TypeScript |
| `shadcn-next` | React + Next.js 14 + shadcn/ui + Tailwind |

### 💚 Vue
| Template | Stack |
|---------|-------|
| `vue-app` | Vue 3 + Vite |

### 🟢 Next.js
| Template | Stack |
|---------|-------|
| `nextjs` | Next.js 14 (App Router) |

### 🧡 Svelte
| Template | Stack |
|---------|-------|
| `svelte` | Svelte 4 + Vite |

### 🔷 Node.js Backend
| Template | Stack |
|---------|-------|
| `node-api` | Node.js + Express |
| `express-ts` | Express + TypeScript |

### 🐍 Python
| Template | Stack |
|---------|-------|
| `python-script` | Python (plain script) |
| `fastapi` | FastAPI + Uvicorn |

### 🌐 Remote
| Template | Description |
|---------|-------------|
| `github:user/repo` | Clone any public GitHub repo |

---

## 🧩 CLI Flags

```bash
forgix create my-app [options]
```

| Flag | Description |
|------|-------------|
| `-t, --template <name>` | Choose a template |
| `--pm <npm\|yarn\|pnpm>` | Package manager |
| `--ts` | Use TypeScript |
| `--css <tailwind\|sass>` | CSS framework |
| `--docker` | Add Docker support |
| `--eslint` | Add ESLint config |
| `--prettier` | Add Prettier config |
| `--test` | Add Jest testing |
| `--ci` | Add GitHub Actions CI |
| `--git` | Initialize git repo |
| `--open` | Open in VS Code |
| `--skip-install` | Skip dependency install |

---

## 🔌 Plugins (5 Available)

| Plugin | Description |
|--------|-------------|
| `docker` | Dockerfile + docker-compose |
| `tailwind` | Tailwind CSS setup |
| `eslint` | ESLint setup |
| `prettier` | Prettier setup |
| `jest` | Jest testing setup |

---

## ⚙️ Config Options

Run `forgix config` to set defaults:

| Option | Description |
|--------|-------------|
| Default Template | Your preferred template |
| Default Package Manager | npm, yarn, or pnpm |
| Default Flags | Auto-apply flags (--git, --open, etc.) |

---

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `forgix create` | Create a new project |
| `forgix config` | Set global defaults |
| `forgix doctor` | Check Node, Git, NPM, VS Code |
| `forgix list` | Show templates and plugins |
| `forgix add <plugin>` | Add plugin to current project |
| `forgix link <name>` | Link a local folder as template |

---

## 🚀 Quick Start

```bash
# Install
npm install -g @7h41c/forgix

# Interactive mode
forgix create

# One-liner
forgix create my-app --template react-vite --pm pnpm --ts --eslint --docker --ci --git --open
```

---

## 🧩 Variable Injection

| Placeholder | Replaced With |
|-------------|----------------|
| `{{projectName}}` | Your project folder name |
| `{{author}}` | Your name (from `forgix config`) |
| `{{license}}` | Your license (from `forgix config`) |

---

## 📋 Changelog

- **v1.0.8** — CLI flags, package managers, new templates, config options, shadcn/ui support
- **v1.0.7** — Global config profile
- **v1.0.6** — Plugin selection
- **v1.0.5** — Custom template linking
- **v1.0.4** — Categorized menus
- **v1.0.3** — Diagnostics & variable injection

---

## 🔒 Security

- **Remote templates:** Only use trusted sources
- **Check package.json:** Look for suspicious `preinstall`/`postinstall` scripts
- Forgix removes `.git` from cloned repos
- Config file permissions set to `0600`

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add something"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ by T7h41</p>
</div>