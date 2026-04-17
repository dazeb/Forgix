import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import os from "os";

// This is where we will store the links on the user's computer
const CONFIG_PATH = path.join(os.homedir(), ".forgix-links.json");

export const linkCommand = new Command("link")
  .description("Link a local folder as a custom Forgix template")
  .argument("<name>", "The nickname for your template")
  .argument("[path]", "The folder path (defaults to current directory)", ".")
  .action(async (name, folderPath) => {
    const absolutePath = path.resolve(folderPath);

    if (!fs.existsSync(absolutePath)) {
      console.log(chalk.red(`\n❌ Error: The path '${absolutePath}' does not exist.`));
      process.exit(1);
    }

    // Load existing links or start fresh
    // FIXED: Added 'Record<string, string>' to satisfy TypeScript
    let links: Record<string, string> = {};

    if (fs.existsSync(CONFIG_PATH)) {
      try {
        links = fs.readJsonSync(CONFIG_PATH);
      } catch (err) {
        // If file is corrupted, we start with an empty record
        links = {};
      }
    }

    // Add or update the link
    links[name] = absolutePath;
    fs.writeJsonSync(CONFIG_PATH, links, { spaces: 2 });

    console.log(chalk.green(`\n✅ Success! '${name}' is now linked to: ${absolutePath}`));
    console.log(chalk.gray(`You can now use: forgix create my-project --template ${name}\n`));
  });
