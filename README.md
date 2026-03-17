# CFO Bot Price Estimation Platform

Single-page calculator for estimating monthly LLM + hosting costs and exporting a PDF report.

## Stack

- React + Vite
- Tailwind CSS
- Vitest
- jsPDF

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run test
```

## Project structure

- `src/logic/calculator.js`: pricing formula, model/hosting constants, long-term projection.
- `src/components/`: reusable UI blocks (selectors, sliders, result card, header).
- `src/App.jsx`: state and integration of UI + logic + PDF export.
- `src/tests/calculator.test.js`: unit tests for core formula and projection.
