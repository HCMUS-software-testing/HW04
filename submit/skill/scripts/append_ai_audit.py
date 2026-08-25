#!/usr/bin/env python3
"""Append một entry AI Audit Report cho HW04 vào submit/ai-audit-report.md."""

from __future__ import annotations

import argparse
import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


DEFAULT_STUDENT_NAME = "Lê Mai Hoài Bảo"
DEFAULT_STUDENT_ID = "23127326"
DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh"


def read_value(value: str | None, file_path: str | None, field_name: str) -> str:
    if value and file_path:
        raise SystemExit(f"Chỉ dùng một trong hai: --{field_name} hoặc --{field_name}-file.")
    if file_path:
        return Path(file_path).read_text(encoding="utf-8").strip()
    return (value or "").strip()


def find_repo_root() -> Path:
    path = Path.cwd().resolve()
    for current in [path, *path.parents]:
        if (current / "docs" / "HW04_ASSIGNMENT_VI.md").exists() or (current / "submit").is_dir():
            return current
    return path


def md_table_cell(text: str) -> str:
    one_line = re.sub(r"\s+", " ", text.strip())
    return one_line.replace("|", "\\|")


def md_block(text: str) -> str:
    cleaned = text.strip()
    if not cleaned:
        return "(empty)"
    return cleaned.replace("```", "'''")


def next_interaction_number(existing: str) -> int:
    numbers = [
        int(match)
        for match in re.findall(r"^### (?:Tương tác|Interaction) (\d+)\b", existing, re.MULTILINE)
    ]
    return max(numbers, default=0) + 1


def ensure_header(audit_file: Path, student_name: str, student_id: str) -> str:
    if audit_file.exists():
        return audit_file.read_text(encoding="utf-8")

    header = f"""# Báo cáo AI Audit

Khai báo: Em có sử dụng công cụ AI cho các nhiệm vụ sau.

## Thông tin sinh viên

- Họ và tên: {student_name}
- MSSV: {student_id}
- Bài tập: HW04 - Kiểm thử tự động

## Bảng tóm tắt

| STT | Công cụ AI | Ngày giờ | Mục đích | Prompt | Tóm tắt output AI | Review / chỉnh sửa của sinh viên |
| ---: | --- | --- | --- | --- | --- | --- |

## Log tương tác đầy đủ
"""
    audit_file.parent.mkdir(parents=True, exist_ok=True)
    audit_file.write_text(header, encoding="utf-8")
    return header


def append_entry(args: argparse.Namespace) -> Path:
    repo_root = find_repo_root()
    audit_file = (
        Path(args.audit_file)
        if args.audit_file
        else repo_root / "submit" / "ai-audit-report.md"
    )
    if not audit_file.is_absolute():
        audit_file = repo_root / audit_file

    prompt = read_value(args.prompt, args.prompt_file, "prompt")
    output = read_value(args.output, args.output_file, "output")
    if not prompt:
        raise SystemExit("Thiếu prompt. Hãy truyền --prompt hoặc --prompt-file.")
    if not output:
        raise SystemExit("Thiếu output. Hãy truyền --output hoặc --output-file.")

    existing = ensure_header(audit_file, args.student_name, args.student_id)
    number = next_interaction_number(existing)
    timezone = ZoneInfo(args.timezone)
    timestamp = datetime.now(timezone).isoformat(timespec="seconds")

    table_row = (
        f"| {number} | {md_table_cell(args.tool)} | {md_table_cell(timestamp)} | "
        f"{md_table_cell(args.purpose)} | {md_table_cell(prompt)} | "
        f"{md_table_cell(output)} | {md_table_cell(args.human_review)} |\n"
    )
    detail = f"""
### Tương tác {number}

- Công cụ AI: {args.tool}
- Ngày giờ: {timestamp}
- Mục đích: {args.purpose}
- Prompt:

```text
{md_block(prompt)}
```

- Output AI:

```text
{md_block(output)}
```

- Review / chỉnh sửa của sinh viên: {args.human_review}
"""

    content = audit_file.read_text(encoding="utf-8")
    marker = "\n## Log tương tác đầy đủ\n"
    if marker in content:
        content = content.replace(marker, table_row + marker, 1)
        content = content.rstrip() + "\n" + detail
    else:
        content = content.rstrip() + "\n\n" + table_row + detail
    audit_file.write_text(content, encoding="utf-8")
    return audit_file


def main() -> None:
    parser = argparse.ArgumentParser(description="Append một entry AI Audit Report cho HW04.")
    parser.add_argument("--tool", default="Codex")
    parser.add_argument("--purpose", default="Hỗ trợ HW04 bằng AI")
    parser.add_argument("--prompt")
    parser.add_argument("--prompt-file")
    parser.add_argument("--output")
    parser.add_argument("--output-file")
    parser.add_argument("--human-review", default="Chờ sinh viên review.")
    parser.add_argument("--audit-file")
    parser.add_argument("--student-name", default=DEFAULT_STUDENT_NAME)
    parser.add_argument("--student-id", default=DEFAULT_STUDENT_ID)
    parser.add_argument("--timezone", default=DEFAULT_TIMEZONE)
    args = parser.parse_args()

    audit_file = append_entry(args)
    print(f"Đã append entry AI Audit vào {audit_file}")


if __name__ == "__main__":
    main()
