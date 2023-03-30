#!/usr/bin/env node

import * as fs from "fs";
import { Legendary } from "./index.js";

function usage() {
	process.stdout.write("      _ \n");
	process.stdout.write("  _ /   \\\n");
	process.stdout.write("/   \\ _ /  Legendary\n");
	process.stdout.write("\\ _ /   \\  usage: legendary input_file\n");
	process.stdout.write("    \\ _ /\n");
	process.exit();
}

const args = process.argv.slice(2);
if (!args[0]) usage();

const input = fs.readFileSync(args[0]!, "utf-8");
process.stdout.write(Legendary.convertToSvg(input));
