import { execa } from "execa";

export async function installDependencies(dir: string) {
  try {
    await execa("npm", ["install"], {
      cwd: dir,
    });
  } catch (error) {
    throw new Error("Dependency installation failed.");
  }
}
