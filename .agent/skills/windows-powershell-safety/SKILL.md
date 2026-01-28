---
name: windows-powershell-safety
description: Guidelines for running commands safely on Windows PowerShell, using proper command chaining syntax.
---

# Windows PowerShell Safety

You are running in a Windows PowerShell environment where the `&&` operator is NOT supported.

## Critical Rules

1.  **Use semicolons (`;`) to chain commands in PowerShell.**
    *   ❌ **BAD:** `git add . && git commit -m "msg" && git push`
    *   ✅ **GOOD:** `git add . ; git commit -m "msg" ; git push`
    *   *Reason:* PowerShell uses `;` as the statement separator, not `&&`.

2.  **PowerShell Command Chaining Operators**
    *   `;` - Always runs the next command (equivalent to bash `;`)
    *   `-and` - Runs next command only if previous succeeded (equivalent to bash `&&`)
    *   `-or` - Runs next command only if previous failed (equivalent to bash `||`)

3.  **Git Workflows**
    *   **Single line (simple):** `git add . ; git commit -m "message" ; git push`
    *   **Single line (with error handling):** `git add . -and git commit -m "message" -and git push`
    *   **Separate calls:** Use multiple `run_command` calls if you need to check output between steps.

4.  **Error Handling**
    *   Use `;` when you want all commands to run regardless of success.
    *   Use `-and` when you want to stop on the first failure (safer for git workflows).
    *   Running commands separately still allows the most granular error checking.

## When to use
This rule applies **ALWAYS** when the Operating System is **Windows**.

## Examples
```powershell
# Simple chaining (always runs all)
git add . ; git commit -m "Update docs" ; git push

# Safe chaining (stops on first error)
git add . -and git commit -m "Update docs" -and git push

# Complex example
npm install ; npm test ; npm run build
```