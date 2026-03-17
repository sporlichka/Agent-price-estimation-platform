# Implementation Plan - CFO Bot

This document outlines the step-by-step implementation plan for the CFO Bot (Price Estimation Platform) using React + Vite.

## 1. Project Initialization & Setup
- [x] Initialize React project with Vite
  - `npm create vite@latest . -- --template react`
- [x] Install dependencies
  - `npm install -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
  - `npm install jspdf` (for report generation)
  - `npm install -D vitest` (for unit testing)

## 2. Architecture & File Structure

The project will follow a modular structure separating logic from presentation.

```
src/
├── components/          # Reusable UI components
│   ├── ModelSelector.jsx
│   ├── HostingSelector.jsx
│   ├── Sliders.jsx
│   ├── ResultDisplay.jsx
│   └── Header.jsx
├── logic/
│   └── calculator.js    # Core pricing logic & constants (Pure JS)
├── App.jsx              # Main application container & state management
├── main.jsx             # Entry point
└── tests/               # Unit tests
    └── calculator.test.js
```

## 3. Implementation Details

### 3.1. Logic Layer (`src/logic/calculator.js`)

This module will encapsulate all business logic and constants from `SSOT.md`.

- **Constants:**
  - `MODELS`: Array of objects `{ id, name, multiplier, baseRate, ... }`
  - `HOSTING`: Array of objects `{ id, name, fixedCost, trafficCost }`
- **Functions:**
  - `calculateMonthlyCost(params)`: Returns `{ total, breakdown }`
    - params: `{ requests, avgTokens, modelId, hostingId, dbReads, dbWrites, bandwidth }`
  - `calculateLongTermProjection(monthlyCost, months, growthRate)`: Returns array of costs per month + total.

### 3.2. Presentation Layer (`src/App.jsx`)

The UI will implement the "Apple Aesthetic" requirements (Monochrome, San Francisco font, clean layout).

- **State Management:**
  - `useState` for all inputs:
    - `selectedModel` (default: 'gpt-4o')
    - `selectedHosting` (default: 'firebase-spark')
    - `requests` (1k - 100M)
    - `avgTokens` (default: 1000)
    - `storageGB` (optional, default: 0)
- **Layout:**
  - **Header:** Title + Description
  - **Main:**
    - Top Section: Model & Hosting Cards (Selectors)
    - Middle Section: Input Sliders (Requests, Tokens)
    - Bottom Section: Cost Breakdown & "Estimated Total"
  - **Footer:** Export Button (generate PDF)

## 4. Testing Strategy (Unit Tests)

We will use Vitest to ensure the calculation formula matches the SSOT exactly.

### Test Suite: `src/tests/calculator.test.js`

**Objective:** Verify formula correctness for specific edge cases and standard scenarios.

**Key Test Case: Gemini 3 Flash @ 1,000 Requests**

From `SSOT.md`:
- **Model:** Gemini 3 Flash (Preview)
- **Multiplier (M):** 0.33x
- **Base Rate:** $0.10 per 1M tokens
- **Formula Part:** `(Req * T_avg / 10^6) * Rate * M`

**Example Test Scenario:**
- **Requests:** 1,000
- **Avg Tokens:** 1,000 (Assumption for test calculation ease)
- **Hosting:** None (Pure model cost capability check)
- **DB Operations:** 0

**Manual Verification Calculation:**
- Tokens Total = 1,000 * 1,000 = 1,000,000 (1M)
- Model Cost = (1M / 1M) * $0.10 * 0.33 = **$0.033**

**Planned Test Code Snippet:**

```javascript
import { describe, it, expect } from 'vitest';
import { calculateMonthlyCost } from '../logic/calculator';

describe('Pricing Calculator Logic', () => {
  it('should correctly calculate cost for Gemini 3 Flash with 1,000 requests', () => {
    // Setup
    const params = {
      modelId: 'gemini-3-flash',  // Rate: $0.10, Multiplier: 0.33
      hostingId: 'none',          // Cost: $0.00
      requests: 1000,
      avgTokens: 1000,            // Total 1M tokens
      dbRead: 0,
      dbWrite: 0,
      bandwidth: 0
    };

    // Execute
    const result = calculateMonthlyCost(params);

    // Verify
    // 1M tokens * $0.10 * 0.33 = $0.033
    expect(result.modelCost).toBeCloseTo(0.033, 4);
    expect(result.total).toBeCloseTo(0.033, 4);
  });
});
```

## 5. Development Roadmap

1.  **Phase 1: Setup:** ✅ Completed.
2.  **Phase 2: Logic:** ✅ Completed (`calculateMonthlyCost`, constants, and projection helper).
3.  **Phase 3: TDD:** ✅ Completed (`vitest` tests added and passing).
4.  **Phase 4: UI:** ✅ Completed (componentized UI in `src/components/`).
5.  **Phase 5: Integration:** ✅ Completed (state + calculator wiring in `src/App.jsx`).
6.  **Phase 6: Export:** ✅ Completed (`jsPDF` report generation integrated).
