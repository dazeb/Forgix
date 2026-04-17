import { Command } from "commander";
import { createCommand } from "../commands/create.js";

const program = new Command();

program
  .name("forgix")
  .description("An elite project scaffolding CLI")
  .version("1.0.0");

// Attach our specific commands
program.addCommand(createCommand);

// Parse the arguments passed by the user
program.parse(process.argv);
