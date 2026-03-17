export const MODELS = [
  { id: 'gpt-4.1', name: 'GPT-4.1', multiplier: 0, baseRate: 0.00 },
  { id: 'gpt-4o', name: 'GPT-4o', multiplier: 0, baseRate: 0.00 },
  { id: 'gpt-5-mini', name: 'GPT-5 mini', multiplier: 0, baseRate: 0.00 },
  { id: 'raptor-mini', name: 'Raptor mini (Preview)', multiplier: 0, baseRate: 0.00 },
  { id: 'claude-haiku', name: 'Claude Haiku 4.5', multiplier: 0.33, baseRate: 0.25 },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', multiplier: 1, baseRate: 3.50 },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash (Preview)', multiplier: 0.33, baseRate: 0.10 },
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro (Preview)', multiplier: 1, baseRate: 3.50 },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro (Preview)', multiplier: 1, baseRate: 3.50 }
];

export const HOSTING = [
  { id: 'none', name: 'None (Model only)', fixedCost: 0, dbReadCost: 0, dbWriteCost: 0, bandwidthCost: 0 },
  { id: 'firebase-spark', name: 'Firebase: Spark (Free)', fixedCost: 0, dbReadCost: 0, dbWriteCost: 0, bandwidthCost: 0 },
  { id: 'firebase-blaze', name: 'Firebase: Blaze (Pay-as-you-go)', fixedCost: 0, dbReadCost: 0.036, dbWriteCost: 0.108, bandwidthCost: 0.15 },
  { id: 'azure-b1s', name: 'Azure: Standard B1s', fixedCost: 7.50, dbReadCost: 0, dbWriteCost: 0, bandwidthCost: 0 },
  { id: 'digital-ocean', name: 'Digital Ocean: Basic Droplet', fixedCost: 4.00, dbReadCost: 0, dbWriteCost: 0, bandwidthCost: 0 },
  { id: 'ps-cloud', name: 'PS Cloud (Kazakhstan): Standard VPS', fixedCost: 7.80, dbReadCost: 0, dbWriteCost: 0, bandwidthCost: 0 }
];

export function calculateMonthlyCost({ 
  requests = 0, 
  avgTokens = 0, 
  modelId = '', 
  hostingId = '', 
  dbRead = 0, 
  dbWrite = 0, 
  bandwidth = 0 
}) {
  const model = MODELS.find(m => m.id === modelId) || MODELS[0];
  const hosting = HOSTING.find(h => h.id === hostingId) || HOSTING[0];

  const tokensTotal = requests * avgTokens;
  const modelCost = (tokensTotal / 1000000) * model.baseRate * model.multiplier;
  
  const hostingCost = hosting.fixedCost + 
                      ((dbRead / 100000) * hosting.dbReadCost) + 
                      ((dbWrite / 100000) * hosting.dbWriteCost) + 
                      (bandwidth * hosting.bandwidthCost);

  const total = modelCost + hostingCost;

  return {
    modelCost,
    hostingCost,
    total
  };
}

export function calculateLongTermProjection(monthlyCost, months = 12, growthRate = 0) {
  const normalizedMonths = Math.max(0, Number(months) || 0);
  const normalizedGrowth = Number(growthRate) || 0;
  const safeMonthlyCost = Number(monthlyCost) || 0;

  const costs = [];

  for (let index = 0; index < normalizedMonths; index += 1) {
    const month = index + 1;
    const projectedCost = safeMonthlyCost * (1 + normalizedGrowth) ** index;
    costs.push({ month, cost: projectedCost });
  }

  const total = costs.reduce((sum, item) => sum + item.cost, 0);

  return {
    costs,
    total
  };
}
