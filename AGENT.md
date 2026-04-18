# AGENT.md — Forgix Agent Integration Guide

> This file enables AI agents (Claude, GPT, Copilot, etc.) to use Forgix non-interactively.

## Quick Reference

Forgix supports **full non-interactive mode** for agent-driven project scaffolding. Set `--non-interactive` (or `-n`) on any command, or set the environment variable `FORGIX_NON_INTERACTIVE=1`.

## Available Templates

| Template ID | Stack |
|---|---|
| `react-vite` | React 18 + Vite |
| `react-vite-ts` | React 18 + Vite + TypeScript |
| `shadcn-next` | React + Next.js 14 + shadcn/ui + Tailwind |
| `vue-app` | Vue 3 + Vite |
| `nextjs` | Next.js 14 (App Router) |
| `svelte` | Svelte 4 + Vite |
| `node-api` | Node.js + Express |
| `express-ts` | Express + TypeScript |
| `python-script` | Python (plain script) |
| `fastapi` | FastAPI + Uvicorn |
| `github:<owner>/<repo>` | Clone any public GitHub repo |

## Available Plugins

`docker`, `eslint`, `jest`, `prettier`, `tailwind`

## Agent Commands

### Create a project (non-interactive)

```bash
# Minimal — uses all defaults
forgix create my-app --non-interactive

# Full specification
forgix create my-app \
  --non-interactive \
  --template react-vite \
  --author "Jane Doe" \
  --license MIT \
  --pm npm \
  --git \
  --typescript \
  --eslint \
  --prettier \
  --test \
  --docker \
  --ci \
  --plugins eslint prettier

# From a GitHub repo (auto-accept remote clone)
forgix create my-app \
  --non-interactive \
  --trust-remote \
  --template github:user/repo

# Skip npm install
forgix create my-app --non-interactive --template node-api --skip-install
```

### List templates and plugins (JSON)

```bash
forgix list --json
```

Returns:
```json
{
  "templates": ["react-vite", "react-vite-ts", "..."],
  "plugins": ["docker", "eslint", "..."],
  "customLinks": {}
}
```

### Configure defaults (non-interactive)

```bash
# Set individual values
forgix config --set defaultAuthor="Jane Doe" defaultTemplate=react-vite

# Show current config as JSON
forgix config --json

# Show current config (human-readable)
forgix config --show
```

Valid config keys: `defaultAuthor`, `defaultLicense`, `preferredEditor`, `autoGit`, `defaultTemplate`, `defaultPackageManager`, `defaultFlags`

For `defaultFlags`, use comma-separated: `defaultFlags=--git,--eslint`

For `autoGit`, use `true` or `false`.

### Link a custom template

```bash
forgix link my-template /path/to/template/dir --non-interactive
```

### Health check (JSON output)

```bash
# Report only, no prompts
forgix doctor --non-interactive

# Auto-fix issues
forgix doctor --fix
```

### Add a plugin to existing project

```bash
# Already non-interactive — no prompts
forgix add docker
```

## CLI Flags Reference

### `forgix create`

| Flag | Description |
|---|---|
| `-t, --template <type>` | Template name or `github:owner/repo` |
| `-a, --author <name>` | Author name |
| `-l, --license <type>` | License (MIT, ISC, Apache-2.0, GPL-3.0) |
| `-p, --plugins <plugins...>` | Plugins (space-separated) |
| `--pm, --package-manager <pm>` | Package manager (npm, yarn, pnpm) |
| `--ts, --typescript` | Add TypeScript config |
| `--js, --javascript` | Use JavaScript (default) |
| `--css <framework>` | CSS framework (tailwind, sass) |
| `--docker` | Add Docker support |
| `--eslint` | Add ESLint configuration |
| `--prettier` | Add Prettier configuration |
| `--test` | Add Jest testing setup |
| `--ci` | Add GitHub Actions CI workflow |
| `--git` | Initialize git repository |
| `--open` | Open in VS Code after creation |
| `--skip-install` | Skip npm install |
| `--trust-remote` | Auto-accept remote template clones |
| `-n, --non-interactive` | Skip prompts, use defaults (also env: `FORGIX_NON_INTERACTIVE=1`) |

### `forgix config`

| Flag | Description |
|---|---|
| `--show` | Display current config |
| `--json` | Output config as JSON |
| `--set <key=value...>` | Set config values non-interactively |
| `-n, --non-interactive` | Skip interactive prompts |

### `forgix doctor`

| Flag | Description |
|---|---|
| `--fix` | Auto-fix issues without prompting |
| `-n, --non-interactive` | Skip prompts, report only |

### `forgix list`

| Flag | Description |
|---|---|
| `--json` | Output as JSON |

### `forgix link`

| Flag | Description |
|---|---|
| `-n, --non-interactive` | Output JSON result |

## Environment Variable

| Variable | Description |
|---|---|
| `FORGIX_NON_INTERACTIVE=1` | Force non-interactive mode globally |

## Post-Creation JSON Output

When using `--non-interactive`, `forgix create` outputs a JSON summary on success:

```json
{
  "status": "created",
  "name": "my-app",
  "template": "react-vite",
  "path": "/home/user/projects/my-app",
  "packageManager": "npm",
  "git": true,
  "plugins": ["eslint"]
}
```

## Security Notes

- Sensitive directories (`.ssh`, `.gnupg`, `.aws`, `.npm`, `.cache`) are blocked from being linked as templates
- `~/.forgix-config.json` and `~/.forgix-links.json` are set to mode `0600` (owner-only)
- Remote GitHub templates require explicit `--trust-remote` or interactive confirmation
- Path traversal (`..`) in custom links is rejected