import { describe, it, expect } from 'vitest';
import { calculateLongTermProjection, calculateMonthlyCost } from '../logic/calculator.js';

describe('Pricing Calculator Logic', () => {
  it('should correctly calculate cost for Gemini 3 Flash with 1,000 requests', () => {
    // Setup - based on SSOT params
    const params = {
      modelId: 'gemini-3-flash',  // Rate: $0.10, Multiplier: 0.33
      hostingId: 'none',
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
    
    // Total should match modelCost if hosting is zero
    expect(result.total).toBeCloseTo(0.033, 4);
  });

  it('should return zero costs for zero usage on free hosting', () => {
    const result = calculateMonthlyCost({
      modelId: 'gpt-4o',
      hostingId: 'firebase-spark',
      requests: 0,
      avgTokens: 0,
      dbRead: 0,
      dbWrite: 0,
      bandwidth: 0
    });

    expect(result.modelCost).toBe(0);
    expect(result.hostingCost).toBe(0);
    expect(result.total).toBe(0);
  });

  it('should include fixed hosting cost when model is free', () => {
    const result = calculateMonthlyCost({
      modelId: 'gpt-4o',
      hostingId: 'azure-b1s',
      requests: 1000,
      avgTokens: 1000
    });

    expect(result.modelCost).toBe(0);
    expect(result.hostingCost).toBeCloseTo(7.5, 4);
    expect(result.total).toBeCloseTo(7.5, 4);
  });

  it('should calculate long-term projection with growth', () => {
    const projection = calculateLongTermProjection(100, 3, 0.1);

    expect(projection.costs[0].cost).toBeCloseTo(100, 4);
    expect(projection.costs[1].cost).toBeCloseTo(110, 4);
    expect(projection.costs[2].cost).toBeCloseTo(121, 4);
    expect(projection.total).toBeCloseTo(331, 4);
  });
});
