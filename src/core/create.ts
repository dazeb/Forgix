import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import { replaceVariablesInDir } from "./template-engine.js";
import { installDependencies } from "./install.js";
import { execa } from "execa"; // Added execa for git commands

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runCreate(options: { name: string; template: string }) {
  const { name, template } = options;
  const targetPath = path.join(process.cwd(), name);

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red(`\n❌ Error: Folder '${name}' already exists.\n`));
    process.exit(1);
  }

  console.log(""); 
  const spinner = ora(`Fetching ${template} template...`).start();

  try {
    // --- NEW: REMOTE VS LOCAL LOGIC ---
    if (template.startsWith("github:")) {
      // Handle GitHub remote templates
      const repoPath = template.replace("github:", "");
      const repoUrl = `https://github.com/${repoPath}.git`;
      
      spinner.text = `Cloning remote template from ${repoUrl}...`;
      // Clone only the latest commit to make it blazing fast
      await execa("git", ["clone", "--depth", "1", repoUrl, targetPath]);
      
      // Delete the .git folder so the user can start their own git history
      fs.rmSync(path.join(targetPath, ".git"), { recursive: true, force: true });

    } else {
      // Handle Local templates
      const templatePath = path.join(__dirname, "../../templates", template);
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Local template '${template}' not found.`);
      }
      fs.copySync(templatePath, targetPath);
    }

    // 2. Inject variables (works on both local and remote!)
    spinner.text = "Injecting project variables...";
    await replaceVariablesInDir(targetPath, { projectName: name });

    // 3. Install dependencies (only if it's a Node project)
    if (fs.existsSync(path.join(targetPath, "package.json"))) {
      spinner.text = "Installing dependencies...";
      await installDependencies(targetPath);
    }

    spinner.succeed(chalk.green("Project created successfully!"));
    console.log(`\n🚀 ${chalk.cyan(name)} is ready!\n`);

  } catch (error: any) {
    spinner.fail(chalk.red("Failed to create project."));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
