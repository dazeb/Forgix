import { Command } from "commander";
import { input, select, checkbox, Separator } from "@inquirer/prompts";
import { runCreate } from "../core/create.js";
import { getConfig } from "../core/config.js";
import { PackageManager } from "../core/install.js";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCommand = new Command("create")
  .description("Scaffold a new project")
  .argument("[name]", "Name of your project")
  .option("-t, --template <type>", "Template to use (react-vite, vue-app, node-api, python-script, nextjs, express, svelte)")
  .option("--skip-install", "Skip dependency installation")
  .option("--git", "Initialize a git repository")
  .option("--open", "Open the project in VS Code")
  .option("--pm, --package-manager <pm>", "Package manager to use (npm, yarn, pnpm)", "npm")
  .option("--ts, --typescript", "Use TypeScript")
  .option("--js, --javascript", "Use JavaScript (default)")
  .option("--css <framework>", "CSS framework (tailwind, sass)")
  .option("--docker", "Add Docker support (Dockerfile + docker-compose)")
  .option("--eslint", "Add ESLint configuration")
  .option("--prettier", "Add Prettier configuration")
  .option("--test", "Add testing setup (Jest)")
  .option("--ci", "Add GitHub Actions CI workflow")
  .action(async (nameArg, options) => {
    try {
      const config = await getConfig();

      let projectName = nameArg || await input({ message: "Project name:", default: "my-app" });

      // Apply default config values if not provided via CLI
      const template = options.template || config.defaultTemplate || await select({
        message: "Select a Template:",
        choices: [
          new Separator(chalk.yellow("--- Frontend ---")),
          { name: "React (Vite)", value: "react-vite" },
          { name: "React + TypeScript (Vite)", value: "react-vite-ts" },
          { name: "Vue.js 3", value: "vue-app" },
          { name: "Next.js", value: "nextjs" },
          { name: "Svelte", value: "svelte" },
          new Separator(chalk.blue("--- Backend ---")),
          { name: "Node.js Express API", value: "node-api" },
          { name: "Express + TypeScript", value: "express-ts" },
          { name: "Python Script", value: "python-script" },
          { name: "Python FastAPI", value: "fastapi" },
          new Separator(chalk.magenta("--- Remote ---")),
          { name: "GitHub Repository", value: "github-prompt" }
        ],
      });

      // Validate package manager (use config default if not provided)
      const validPM: PackageManager[] = ["npm", "yarn", "pnpm"];
      const packageManagerInput = options.packageManager || config.defaultPackageManager || "npm";
      const packageManager = validPM.includes(packageManagerInput as PackageManager) 
        ? packageManagerInput as PackageManager 
        : "npm";

      // Apply default flags from config (only if not explicitly overridden)
      const configFlags = config.defaultFlags || [];
      const git = options.git !== undefined ? options.git : configFlags.includes("--git") || config.autoGit;
      const open = options.open !== undefined ? options.open : configFlags.includes("--open");
      const typescript = options.typescript !== undefined ? options.typescript : configFlags.includes("--ts");
      const eslint = options.eslint !== undefined ? options.eslint : configFlags.includes("--eslint");
      const prettier = options.prettier !== undefined ? options.prettier : configFlags.includes("--prettier");
      const test = options.test !== undefined ? options.test : configFlags.includes("--test");
      const docker = options.docker !== undefined ? options.docker : configFlags.includes("--docker");
      const ci = options.ci !== undefined ? options.ci : configFlags.includes("--ci");

      const author = await input({ message: "Author Name:", default: config.defaultAuthor });
      const license = await select({
        message: "Select License:",
        choices: [
          { name: "MIT", value: "MIT" },
          { name: "ISC", value: "ISC" },
          { name: "Apache-2.0", value: "Apache-2.0" },
          { name: "GPL-3.0", value: "GPL-3.0" }
        ],
        default: config.defaultLicense
      });

      // Plugins
      const pluginsPath = path.join(__dirname, "../../plugins");
      let availablePlugins: string[] = [];
      if (fs.existsSync(pluginsPath)) availablePlugins = fs.readdirSync(pluginsPath);

      const selectedPlugins = await checkbox({
        message: "Select Plugins to inject:",
        choices: availablePlugins.map(p => ({ name: p, value: p }))
      });

      await runCreate({
        name: projectName,
        template,
        skipInstall: options.skipInstall,
        git,
        open,
        variables: { author, license },
        plugins: selectedPlugins,
        packageManager,
        typescript,
        css: options.css,
        docker,
        eslint,
        prettier,
        test,
        ci
      });

    } catch (error) {
      console.log("\nExiting Forgix...");
      process.exit(1);
    }
  });