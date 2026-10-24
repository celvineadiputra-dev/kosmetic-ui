# Project Guidelines & Agent Instructions

## 1. Always Use Superpowers Skills
- Strictly adhere to `using-superpowers` workflows.
- Before starting creative work, planning, or modifying features: invoke `brainstorming`.
- Before bug-fixing: invoke `systematic-debugging`.
- For execution: use `executing-plans` or `subagent-driven-development`.
- For features/fixes: practice `test-driven-development`.
- Before claiming completion: run `verification-before-completion`.
- Announce active skills before acting: "Using [skill] to [purpose]".

## 2. Always Use CodeGraph for Code Intelligence
- Use `codegraph` (`/home/celvine/.local/bin/codegraph`) as the primary tool for repository understanding and navigation.
- **Explore & Context**:
  - `codegraph explore "<query>"`: Explore an area, symbol definitions, and call paths.
  - `codegraph context "<task>"`: Build relevant context, symbols, and code blocks for a task.
  - `codegraph node "<symbol or file>"`: Inspect symbol source, caller/callee trails, or files.
- **Dependency & Impact Analysis**:
  - `codegraph callers <symbol>` / `codegraph callees <symbol>`: Trace call hierarchies.
  - `codegraph impact <symbol>`: Analyze affected code before refactoring or modifying symbols.
  - `codegraph affected [files...]`: Find affected tests and dependents for modified files.
- **Index Maintenance**:
  - Run `codegraph sync` whenever files are modified to keep the graph database up-to-date.
