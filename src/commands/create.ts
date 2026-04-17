import { Command } from "commander";
import { input, select, checkbox, Separator } from "@inquirer/prompts";
import { runCreate } from "../core/create.js";
import { getConfig } from "../core/config.js";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCommand = new Command("create")
  .description("Scaffold a new project")
  .argument("[name]", "Name of your project")
  .option("-t, --template <type>", "Template to use")
  .option("--skip-install", "Skip dependency installation")
  .option("--git", "Initialize a git repository")
  .option("--open", "Open the project in VS Code")
  .action(async (nameArg, options) => {
    try {
      const config = await getConfig();

      let projectName = nameArg || await input({ message: "Project name:", default: "my-app" });

      let template = options.template || await select({
        message: "Select an Elite Template:",
        choices: [
          new Separator(chalk.yellow("--- 🌐 FRONTEND ---")),
          { name: "React (Vite)", value: "react-vite" },
          { name: "Vue.js 3", value: "vue-app" },
          new Separator(chalk.blue("--- ⚙️ BACKEND ---")),
          { name: "Node.js Express API", value: "node-api" },
          { name: "Python Script", value: "python-script" },
          new Separator(chalk.magenta("--- ☁️ REMOTE ---")),
          { name: "GitHub Repository", value: "github-prompt" }
        ],
      });

      const author = await input({ message: "Author Name:", default: config.defaultAuthor });
      const license = await select({
        message: "Select License:",
        choices: [
          { name: "MIT", value: "MIT" },
          { name: "ISC", value: "ISC" },
          { name: "Apache-2.0", value: "Apache-2.0" }
        ],
        default: config.defaultLicense
      });

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
        git: options.git || config.autoGit,
        open: options.open,
        variables: { author, license }
      });

    } catch (error) {
      console.log("\nExiting Forgix...");
      process.exit(1);
    }
  });
