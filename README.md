# 🚀 Forgix

An elite, blazing-fast project scaffolding CLI designed to eliminate project setup fatigue.

## 🧠 Why it exists
[cite_start]Starting a new project shouldn't mean spending 20 minutes copying boilerplate, changing variables, and resetting git histories. [cite_start]Forgix automates the entire process so you can go straight from an idea to writing code.

## ✨ Features
* [cite_start]**Interactive Prompts:** Clean, modern CLI interface for selecting project types.
* **Intelligent Templating:** Automatically injects your project name into configuration files.
* **Remote GitHub Cloning:** Pull down *any* public GitHub repository to use as a starting point.
* **Auto-Install:** Automatically installs your dependencies so you are ready to code immediately.
* **Power-User Flags:** Bypass prompts entirely for instant scaffolding.

## 💻 Demo Commands

[cite_start]Scaffold a local template interactively:
\`\`\`bash
forgix create
\`\`\`

[cite_start]Bypass prompts using flags:
\`\`\`bash
forgix create my-new-app --template node-api
\`\`\`

Clone a remote repository from GitHub directly:
\`\`\`bash
forgix create remote-app --template github:fireship-io/react-firebase-chat
\`\`\`

## 🗺️ Roadmap
- [ ] [cite_start]Add \`--no-install\` flag to skip dependency installation.
- [ ] [cite_start]Implement a plugin system (e.g., \`forgix add docker\`).
- [ ] [cite_start]Add official React, Vue, and Python templates.
