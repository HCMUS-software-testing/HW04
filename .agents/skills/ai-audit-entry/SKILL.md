---
name: ai-audit-entry
description: Offer to append an AI audit entry for software testing homework work. Use for every user prompt session in this repository before finishing the response, especially when Codex plans, edits files, generates reports/templates, reviews requirements, executes commands, or summarizes AI-assisted work for `src/reports/ai-audit-report.md`; ask the user whether to add the entry before writing.
---
# AI Audit Entry

## Workflow

Homework implementation lives under `src/`. Keep this skill at repo root, but write the audit report to:

`src/reports/ai-audit-report.md`

Do not use the old root path `submission/ai-audit/ai_audit_report.md`.

Ask the user whether they want to append an audit entry before writing to:

`src/reports/ai-audit-report.md`

If the user says no, do not run the append script. If the user says yes, run the bundled script before the final response whenever meaningful work was performed:

```bash
rtk python3 .agents/skills/ai-audit-entry/scripts/append_ai_audit_entry.py \
  --purpose "Short purpose of the session" \
  --prompt "Copy the user's prompt exactly, with no paraphrase or correction" \
  --output "Short factual summary of the AI output for the audit table" \
  --tool-model "Codex / GPT-5"
```

When the AI output is a single generated file, report, template, code file, Markdown artifact, or other contiguous artifact, use `--output-file path/to/artifact` instead of `--output`. In this case, the script must copy the artifact content verbatim into `2.2` `AI Output` because the AI-created result is continuous and can be fully quoted without reconstructing it from scattered conversation turns. The full output must be wrapped in a fenced code block so headings, tables, and lists inside the generated artifact do not become audit report sections. Keep using `--output` for fragmented outputs, multi-file work, command results, conclusions, or cases where a concise factual summary is clearer than a full artifact.

The `2.1` summary table stays short. Full generated artifacts belong only in `2.2` detail entries, inside fenced code blocks.

Follow the teacher-provided report sections exactly and number every top-level audit section:

- `1. Thông tin nhóm`
- `2. Bảng audit`
- `3. Tổng kết độ chính xác AI`
- `4. Kết luận`
- `5. Disclosure`

Inside `## 2. Bảng audit`, always maintain two numbered subsections:

- `### 2.1. Tóm tắt audit`
- `### 2.2. Chi tiết audit`

Each prompt session is one new numbered entry in both subsections. Before appending, the script must treat both subsections as authoritative deletion surfaces: if an existing entry was removed from either the summary table or the detailed entry list, do not recreate it from the other subsection. Keep only entries still present in both subsections, then rebuild both subsections from scratch with sequential numbering.

`2.1` is only a short summary table with these columns:

| STT | Prompt + Tool | Verdict |
| --- | --- | --- |

`2.2` is the full audit log. Each entry must use its own heading:

- `### 2.2.1 Entry 1`
- `### 2.2.2 Entry 2`
- ...

Under each `2.2.x` entry, write these fields in order:

- `Prompt + Tool`
- `AI Output`
- `Verdict`
- `Reasoning`
- `Student Fix`

Fill `STT` with the next sequential number. Before appending a new entry, renumber all surviving summary rows and detailed entries from `1` in their current order because the user may manually delete any entry in the middle. Fill `Prompt + Tool` with the timestamp, AI tool/model, and the user's full prompt exactly as provided; never summarize, truncate, paraphrase, or correct the prompt text. Fill `AI Output` with a concise summary for ordinary sessions; for a single contiguous generated artifact supplied through `--output-file`, fill `AI Output` with the full artifact content fenced as Markdown/code. Keep these fields as manual placeholders because the student will complete them:

- `Verdict`: `[Manual by user]`
- `Reasoning`: `[Manual by user]`
- `Student Fix`: `[Manual by user]`

Do not create or maintain legacy sections such as `AI Tool Usage Summary`, `Prompt and Output Log`, or `Integrity Notes`.

## Language and Encoding

Use Vietnamese with full accents for new audit metadata that the AI writes itself, such as `Purpose`, brief factual notes, or non-verbatim summaries, unless the user explicitly requests another language.

For each audit entry, keep prompts and output summaries in their original language. Do not remove accents, add accents, or correct character encoding. The prompt is always copied in full. For `--output`, provide a meaningful concise summary yourself; the script escapes Markdown table pipes and converts line breaks to `<br>`, but never silently truncates text or appends `...`. For `--output-file`, the script preserves the UTF-8 file content verbatim in the `2.2` detail entry and wraps it in a fenced code block.

Write and read the audit report as UTF-8. If using `--output-file`, the script copies that file as UTF-8 verbatim into the `Output` field.

## Entry Guidance

Use concise, factual text. Do not include private chain-of-thought, hidden policy, or long command outputs. Mention files changed or artifacts created when relevant.

`Prompt + Tool` must include the user's full prompt for that session. Do not translate, summarize, truncate, normalize spelling, add missing accents, or correct typos.

`AI Output` should be a short, factual, complete summary for ordinary sessions. Mention changed files, generated artifacts, results, and important limitations; do not pass a long transcript and rely on the script to shorten it. Never leave a truncated fragment or trailing `...`. If the artifact is continuous and available as a single file, include the full content with `--output-file`.

Always record the clearest available tool and model/version in `Tool/Model`. Use `--tool-model` when known, for example `GPT-5.4`, `GPT-5.5`, or `Claude Sonnet`. If the exact version is not visible, use the tool family plus the most specific known model name instead of a generic value.

If the report file does not exist, create its parent directories and initialize a minimal audit report structure with the required Vietnamese headings before appending.

The script removes legacy audit sections before saving, rewrites `2. Bảng audit` into the new `2.1` + `2.2` structure, upgrades the older single-table format, reconciles deletions between summary/detail subsections, and renumbers surviving audit entries before appending the next entry.

Do not commit changes unless the user explicitly asks.
