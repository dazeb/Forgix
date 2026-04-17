import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const listCommand = new Command("list")
  .description("List all available templates and plugins")
  .action(() => {
    const templatesPath = path.join(__dirname, "../../templates");
    const pluginsPath = path.join(__dirname, "../../plugins");

    console.log(chalk.cyan("\n📋 Available Project Templates:"));
    if (fs.existsSync(templatesPath)) {
      fs.readdirSync(templatesPath).forEach(t => console.log(`  - ${t}`));
    }

    console.log(chalk.magenta("\n🧩 Available Plugins:"));
    if (fs.existsSync(pluginsPath)) {
      fs.readdirSync(pluginsPath).forEach(p => console.log(`  - ${p}`));
    }

    // --- NEW: LINKED CUSTOM TEMPLATES ---
    const CONFIG_PATH = path.join(os.homedir(), ".forgix-links.json");
    if (fs.existsSync(CONFIG_PATH)) {
      const links = fs.readJsonSync(CONFIG_PATH);
      console.log(chalk.yellow("\n🔗 Linked Custom Templates:"));
      Object.keys(links).forEach(name => {
        console.log(`  - ${name} ${chalk.gray(`(${links[name]})`)}`);
      });
    }

    console.log(chalk.gray("\n💡 Use 'forgix create --template <name>' to start a new project."));
    console.log(chalk.gray("💡 Use 'forgix add <plugin>' inside an existing project.\n"));
  });
