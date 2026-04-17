import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import { runCreate } from "../core/create.js";

export const createCommand = new Command("create")
  .description("Scaffold a new project")
  .argument("[name]", "Name of your project (optional)")
  .option("-t, --template <type>", "Template to use (e.g., node-api, github:user/repo)")
  .action(async (nameArg, options) => {
    try {
      // 1. Check if name was passed as an argument, otherwise prompt
      let projectName = nameArg;
      if (!projectName) {
        projectName = await input({
          message: "Project name:",
          default: "my-app",
        });
      }

      // 2. Check if template was passed as a flag, otherwise prompt
      let template = options.template;
      if (!template) {
        template = await select({
          message: "Select template:",
          choices: [
            { name: "Node.js API", value: "node-api" },
            { name: "React (Vite)", value: "react-vite" },
            { name: "Python Script", value: "python-script" }
          ],
        });
      }

      // 3. Execute core logic
      await runCreate({ name: projectName, template });
    } catch (error) {
      console.log("\nExiting Forgix...");
      process.exit(1);
    }
  });
