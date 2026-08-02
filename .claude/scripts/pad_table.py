#!/usr/bin/env python3
"""Render a GitHub-flavored markdown table from JSON, per FORMAT.md's alignment
rule: pad every column except the last so pipes line up in raw text; keep the
last column ragged (no padding).

Input (stdin): {"headers": ["Day", "Dish", ...], "rows": [["Sun", "..."], ...]}
Output (stdout): the markdown table.

Used by the /menu skill to build the Meal Options and Final Menu tables
without hand-aligning columns or re-deriving this logic inline each run.
"""
import json
import sys


def render(headers, rows):
    n = len(headers)
    widths = [
        max(len(str(headers[i])), max((len(str(r[i])) for r in rows), default=0))
        for i in range(n - 1)
    ]

    def fmt(cells):
        padded = [str(cells[i]).ljust(widths[i]) for i in range(n - 1)]
        padded.append(str(cells[n - 1]))
        return "| " + " | ".join(padded) + " |"

    sep = "| " + " | ".join(":" + "-" * (w - 1) for w in widths) + " | :--- |"

    lines = [fmt(headers), sep]
    lines.extend(fmt(r) for r in rows)
    return "\n".join(lines)


if __name__ == "__main__":
    data = json.load(sys.stdin)
    print(render(data["headers"], data["rows"]))
