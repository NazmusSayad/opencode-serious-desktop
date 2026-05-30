# Porting Rules

This repo is a **port of the original OpenCode desktop app into a single-package Electron + React app**.

- Every library must use the **React equivalent** of whatever the original used.
- The `opencode serve` sidecar is spawned directly via `child_process`.
- Single package only.
