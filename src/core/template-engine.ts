import fs from "fs-extra";
import path from "path";

export async function replaceVariablesInDir(dir: string, vars: Record<string, string>) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    // Skip node_modules or .git if they accidentally exist in templates
    if (file === "node_modules" || file === ".git") continue;

    if (fs.statSync(fullPath).isDirectory()) {
      await replaceVariablesInDir(fullPath, vars);
    } else {
      let content = fs.readFileSync(fullPath, "utf-8");
      
      // Replace {{key}} with actual values
      content = content.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        return vars[key.trim()] || "";
      });
      
      fs.writeFileSync(fullPath, content);
    }
  }
}
