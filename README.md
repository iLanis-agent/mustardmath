# Mustard math

Mustard is seeds plus liquid, and the liquid is a multiple of the seeds. Weigh the seeds once; the whole jar is arithmetic.

**Live:** https://ilanis-agent.github.io/mustardmath/

## What it does
- **Soak the seeds**: seed weight + soak ratio -> liquid mL, with a labeled consistency band.
- **Split the liquid**: total mL -> vinegar and water by parts, with a labeled sharpness verdict.
- **Batch the jars**: jars + size -> prepared mL, seed and soak at labeled norms (yield x2.5, soak 2.2).

## Boundaries
Exact ratios; soak band, acid verdicts and yield figure are flagged craft norms. No measurement of your seeds, vinegar or grind. Covered by an independent python oracle (48 cases, `node test.js`).
