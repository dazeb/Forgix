<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=Forgix%20🚀&fontSize=80&animation=fadeIn&fontAlignY=35" width="100%" alt="Forgix Animated Banner" />
  <br />
  <p><b>The elite, blazing-fast project scaffolding engine designed to eliminate boilerplate fatigue.</b></p>

  <img src="https://img.shields.io/npm/v/@7h41c/forgix.svg?style=flat-square&color=cb3837" alt="NPM Version" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-green.svg?style=flat-square" alt="Node Support" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
</div>

---

## ⚡ What is Forgix?

Forgix is not just a cloner — it's an intelligent **Project Architect**.

Instead of manually copying files and editing configurations, Forgix automates the entire project creation process:
- Injects your personal details
- Sets up your environment
- Opens your workspace instantly
- Remembers who you are with global config

---

## ✨ Elite Features

- 🆔 **Developer Profile**  
  Set your global identity once with `forgix config`. No more re-typing your name or license for every project.

- 🎨 **Visual Identity**  
  Sleek ASCII art branding and categorized, easy-to-read terminal menus.

- 🩺 **Smart Doctor**  
  Built-in diagnostics that don't just find problems—they help fix them.

- 👤 **Personalization Engine**  
  Automatically injects your **name** and **license** into:
  - `package.json`
  - `index.html`
  - `README.md`

- 📂 **Smart Scaffolding**  
  - Use pre-built templates (React, Vue, Node, Python)  
  - Or clone any public GitHub repository
  - Or link any custom folder on your drive

- 🧩 **Plugin Injection**  
  Select multiple plugins (Docker, Tailwind, etc.) during project creation.

- 🚀 **Elite Flow**  
  - `--git` → auto initialize repository  
  - `--open` → launch VS Code instantly  

---

## 🚀 Installation

### Run instantly (no install)
```bash
npx @7h41c/forgix create
```

### Install globally
```bash
npm install -g @7h41c/forgix
```

---

## 🛠️ CLI Commands

| Command | Description |
|--------|-------------|
| `forgix config` | Set your global developer name, license, and editor |
| `forgix doctor` | Run system diagnostics with auto-fix capabilities |
| `forgix list` | Show available templates, plugins, and custom links |
| `forgix create` | Start interactive scaffolding wizard |
| `forgix add <plugin>` | Inject a plugin (e.g. Docker) |
| `forgix link <name>` | Link any folder on your PC as a custom template |

All commands support `--non-interactive` (or `-n`) and `FORGIX_NON_INTERACTIVE=1` for CI/agent use. See [🤖 Agent Mode](#-agent-mode) below.

---

## 💻 Usage Examples

### 1. Interactive Mode (Standard)
```bash
forgix create
```

### 2. Speed Mode (Skip Prompts)
```bash
forgix create my-app --template react-vite --git --open
```

### 3. Remote GitHub Template
```bash
forgix create remote-app --template github:user/repo
```

### 4. Configure Once, Create Forever
```bash
forgix config
forgix create my-app --git --open
```

### 5. Non-Interactive / Agent Mode
```bash
forgix create my-app --non-interactive --template react-vite --git --author "Jane Doe" --license MIT
forgix create my-app -n --template react-vite-ts --git --eslint --prettier --docker
forgix config --set defaultAuthor="Jane Doe" defaultTemplate=react-vite
forgix list --json
forgix doctor --fix
```

---

## 🧩 Variable Injection

Forgix scans template files and replaces placeholders automatically:

| Variable | Description |
|----------|------------|
| `{{projectName}}` | Your project folder name |
| `{{author}}` | Your name |
| `{{license}}` | Selected license (MIT, ISC, Apache) |

---

## 🤖 Agent Mode

Forgix is fully agent-friendly — AI assistants, CI pipelines, and scripts can use every command without interactive prompts.

### Environment Variable

Set `FORGIX_NON_INTERACTIVE=1` to force non-interactive mode globally (e.g. in Dockerfiles or CI).

### Create Flags

| Flag | Description |
|------|-------------|
| `-n, --non-interactive` | Skip all prompts, use defaults |
| `-a, --author <name>` | Author name |
| `-l, --license <type>` | License (MIT, ISC, Apache-2.0, GPL-3.0) |
| `-p, --plugins <plugins...>` | Plugins to inject (space-separated) |
| `--trust-remote` | Auto-accept remote GitHub template clones |
| `--pm, --package-manager <pm>` | Package manager (npm, yarn, pnpm) |

All other flags (`--git`, `--eslint`, `--docker`, `--ts`, `--ci`, etc.) work in both interactive and non-interactive mode.

### Config Flags

| Flag | Description |
|------|-------------|
| `--show` | Display current config |
| `--json` | Output config as JSON |
| `--set <key=value...>` | Set config values non-interactively |

### Doctor Flags

| Flag | Description |
|------|-------------|
| `--fix` | Auto-fix issues without prompting |
| `-n, --non-interactive` | Report only, no prompts |

### JSON Output

`forgix list --json` returns machine-readable template/plugin data. `forgix create --non-interactive` outputs a JSON summary on success.

**Full reference:** See [`AGENT.md`](./AGENT.md) for complete agent integration documentation.

---

## 💡 Pro Tips

- 🧼 **Keep it clean**  
  Run:
  ```bash
  forgix doctor
  ```

- ⚡ **Auto open project**
  ```bash
  --open
  ```

- ⏭️ **Skip dependency install**
  ```bash
  --skip-install
  ```

- 🆔 **Set your identity once**
  ```bash
  forgix config
  ```

---

## 🗺️ Roadmap

- [x] v1.0.7 — Global Config Profile & Smart Doctor Fixes
- [x] v1.0.6 — Interactive Plugin Selection
- [x] v1.0.5 — Custom template linking (`forgix link`)
- [x] v1.0.4 — ASCII branding & categorized menus
- [x] v1.0.3 — System diagnostics & variable injection
- [x] v1.0.8 — CLI flags, package managers, default config, agent mode
- [ ] v1.0.9 — Forgix Cloud - Sync templates across machines

---

## 🤝 Contributing

Contributions are welcome and help improve Forgix.

### Steps:

1. Fork the repository  
2. Create a branch  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to your branch  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request  

---

<div align="center">
  <p>Built with ❤️ by T7h41 and the Forgix Community.</p>
</div>