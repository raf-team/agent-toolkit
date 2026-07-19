// Duplicated-content parity checks: paired files that must stay semantically
// identical so drift between them (e.g. Claude Code vs Cursor surfaces of the
// same instructions) fails CI instead of shipping silently.
import { readFileSync } from "node:fs";

const parseFrontmatter = (path) => {
  const text = readFileSync(path, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  return {
    frontmatter: match ? match[1] : null,
    body: match ? text.slice(match[0].length).trim() : text.trim(),
  };
};

const stripLeadingHeading = (text) => text.replace(/^#[^\n]*\n+/, "").trim();

const CHECKS = [
  {
    files: ["skills/raf-provider-needs/SKILL.md", "rules/raf-provider-needs.mdc"],
    run: ([skill, rule]) => {
      const failures = [];
      const skillDescription = skill.frontmatter?.match(/^description: (.*)$/m)?.[1];
      const ruleDescription = rule.frontmatter?.match(/^description: (.*)$/m)?.[1];
      if (!skillDescription) failures.push("skill missing description");
      if (!ruleDescription) failures.push("rule missing description");
      if (skillDescription && ruleDescription && skillDescription !== ruleDescription) {
        failures.push("descriptions differ");
      }
      if (skill.body !== rule.body) failures.push("bodies differ");
      return failures;
    },
  },
  {
    files: ["hooks/session-context.md", "rules/raf-session-context.mdc"],
    run: ([hook, rule]) => {
      const failures = [];
      if (stripLeadingHeading(hook.body) !== rule.body) failures.push("bodies differ");
      return failures;
    },
  },
];

let failed = false;
for (const { files, run } of CHECKS) {
  const parsed = files.map(parseFrontmatter);
  const failures = run(parsed);
  if (failures.length > 0) {
    failed = true;
    console.error(`Parity check failed (${files.join(" vs ")}): ${failures.join("; ")}`);
  } else {
    console.log(`Parity OK: ${files.join(" vs ")}`);
  }
}

if (failed) process.exit(1);
