import type { Metadata } from "./metadata.js";
import type { HexDefinition } from "./hexDefinition.js";
import type { PathDefinition } from "./pathDefinition.js";
export type Statement = Metadata | HexDefinition | PathDefinition;
