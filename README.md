# Sudoku_Solver

A simple browser-based Sudoku helper/solver that draws a 9×9 grid on a canvas and provides a side input table for the initial puzzle. The solver uses an entropy-based approach to try values and backtrack using saved snapshots.

Features
- Interactive 9×9 canvas grid drawn by [`drawGrid`](worker2.js).
- Text inputs for each cell in [index.html](index.html) to enter the puzzle.
- "Load values" button that populates the canvas from the table using [`load`](worker2.js).
- "Solve" button that runs an iterative solver implemented in [`run`](worker2.js) / [`solve`](worker2.js).
- Internal representation and rendering provided by the [`Cell`](worker2.js) class.
- Basic block grouping using [`load_blocks`](worker2.js).
- Snapshot/backtracking using [`copy`](worker2.js).

Files
- [index.html](index.html) — UI layout (canvas + input table + buttons).
- [styles.css](styles.css) — Visual styles for canvas and table.
- [script.js](script.js) — Registers the worker / bootstrap script.
- [worker2.js](worker2.js) — Main logic: grid drawing, cell model, solver functions.

Usage
1. Open [index.html](index.html) in a browser (double-click or serve via a local static server).
2. Enter at least 17 starting numbers in the table (required by the current check).
3. Click "Load values" to render the initial puzzle on the canvas.
4. Click "Solve" to run the solver animation.

Notes and caveats
- The project is intentionally simple and uses an entropy/backtracking approach; it may not handle every puzzle reliably.
- Some DOM/worker usage exists in [script.js](script.js) and [worker2.js](worker2.js); if you plan to run worker2.js as a real Web Worker, remove direct DOM access (e.g., `document.getElementById`) or run it on the main thread.

Contributing
- Fixes and improvements are welcome. Focus areas:
  - Make solver deterministic and robust for all valid puzzles.
  - Refactor worker usage and separate UI from logic.
  - Add validation and clearer user feedback for invalid inputs.

License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Karthik Tirumanidas