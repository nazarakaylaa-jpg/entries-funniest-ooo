// The Funniest Out-of-Office — make.fun entry.
// Writes a single-line out-of-office auto-reply to /output/entry.txt.
// No dependencies, Node 22+.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Out of office until Monday. My inbox hit 400 unread emails and started replying to itself. If it promises you anything, it's lying.";

const MAX_CHARS = 140;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(
    `Entry must be 1 to ${MAX_CHARS} characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote entry (${ENTRY.length} characters) to ${join(outDir, "entry.txt")}`);
