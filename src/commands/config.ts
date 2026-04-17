import { Command } from "commander";
import { input, select, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { saveConfig, getConfig } from "../core/config.js";

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
        { name: "Apache-2.0", value: "Apache-2.0" }
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

    await saveConfig({ defaultAuthor, defaultLicense, preferredEditor, autoGit });

    console.log(chalk.green("\n✨ Profile saved! Forgix is now personalized to you.\n"));
  });
