// Skill/rule parity check: the Claude skill and the Cursor-style rule must
// stay semantically identical — same trigger description, byte-identical body.
import { readFileSync } from "node:fs";

const FILES = ["skills/raf-provider-needs/SKILL.md", "rules/raf-provider-needs.mdc"];

const parse = (path) => {
  const text = readFileSync(path, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${path}: missing frontmatter`);
  const description = match[1].match(/^description: (.*)$/m)?.[1];
  if (!description) throw new Error(`${path}: missing description`);
  return { description, body: text.slice(match[0].length).trim() };
};

const [skill, rule] = FILES.map(parse);
const failures = [];
if (skill.description !== rule.description) failures.push("descriptions differ");
if (skill.body !== rule.body) failures.push("bodies differ");

if (failures.length > 0) {
  console.error(`Parity check failed (${FILES.join(" vs ")}): ${failures.join("; ")}`);
  process.exit(1);
}
console.log("Parity OK: skill and rule share one description and one body.");
