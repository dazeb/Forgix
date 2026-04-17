import { Command } from "commander";
import { input, select, confirm, checkbox } from "@inquirer/prompts";
import chalk from "chalk";
import { saveConfig, getConfig, ForgixConfig } from "../core/config.js";

export const configCommand = new Command("config")
  .description("Configure your global Forgix Developer Profile")
  .action(async () => {
    const current = await getConfig();

    console.log(chalk.cyan("\n🛠️  Forgix Profile Configuration\n"));

    const defaultAuthor = await input({ 
      message: "Default Author Name:", 
      default: current.defaultAuthor 
    });

    const defaultLicense = await select({
      message: "Default License:",
      choices: [
        { name: "MIT", value: "MIT" },
        { name: "ISC", value: "ISC" },
        { name: "Apache-2.0", value: "Apache-2.0" },
        { name: "GPL-3.0", value: "GPL-3.0" }
      ],
      default: current.defaultLicense
    });

    const preferredEditor = await select({
      message: "Preferred Editor Command:",
      choices: [
        { name: "VS Code (code)", value: "code" },
        { name: "Cursor (cursor)", value: "cursor" },
        { name: "Vim", value: "vim" },
        { name: "None", value: "none" }
      ],
      default: current.preferredEditor
    });

    const autoGit = await confirm({
      message: "Always initialize Git by default?",
      default: current.autoGit
    });

    const defaultTemplate = await select({
      message: "Default Template:",
      choices: [
        { name: "React + Vite", value: "react-vite" },
        { name: "React + Vite (TypeScript)", value: "react-vite-ts" },
        { name: "Vue.js 3", value: "vue-app" },
        { name: "Next.js", value: "nextjs" },
        { name: "Svelte", value: "svelte" },
        { name: "Node.js Express API", value: "node-api" },
        { name: "Express + TypeScript", value: "express-ts" },
        { name: "Python Script", value: "python-script" },
        { name: "Python FastAPI", value: "fastapi" }
      ],
      default: current.defaultTemplate
    });

    const packageManagerChoice = await select({
      message: "Default Package Manager:",
      choices: [
        { name: "npm", value: "npm" },
        { name: "yarn", value: "yarn" },
        { name: "pnpm", value: "pnpm" }
      ],
      default: current.defaultPackageManager
    });
    const defaultPackageManager = packageManagerChoice as "npm" | "yarn" | "pnpm";

    const defaultFlags = await checkbox({
      message: "Default Flags (select all you want always applied):",
      choices: [
        { name: "--git (auto git init)", value: "--git" },
        { name: "--open (auto open VS Code)", value: "--open" },
        { name: "--eslint (add ESLint)", value: "--eslint" },
        { name: "--prettier (add Prettier)", value: "--prettier" },
        { name: "--test (add Jest)", value: "--test" },
        { name: "--docker (add Docker)", value: "--docker" },
        { name: "--ci (add GitHub Actions)", value: "--ci" },
        { name: "--ts (TypeScript)", value: "--ts" }
      ]
    });

    await saveConfig({ 
      defaultAuthor, 
      defaultLicense, 
      preferredEditor, 
      autoGit,
      defaultTemplate,
      defaultPackageManager,
      defaultFlags
    });

    console.log(chalk.green("\n✨ Profile saved! Forgix is now personalized to you.\n"));
  });