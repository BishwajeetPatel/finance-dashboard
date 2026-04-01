

export function monthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function sumByMonth(transactions, typeFilter) {
  const map = new Map();
  for (const t of transactions) {
    if (typeFilter && t.type !== typeFilter) continue;
    const k = monthKey(t.date);
    map.set(k, (map.get(k) || 0) + Number(t.amount));
  }
  return map;
}

export function spendingByCategory(transactions, monthFilterKey) {
  const map = new Map();
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    if (monthFilterKey && monthKey(t.date) !== monthFilterKey) continue;
    map.set(t.category, (map.get(t.category) || 0) + Number(t.amount));
  }
  return map;
}

export function highestSpendingCategory(transactions, monthFilterKey) {
  const map = spendingByCategory(transactions, monthFilterKey);
  let max = 0;
  let cat = null;
  for (const [c, v] of map) {
    if (v > max) {
      max = v;
      cat = c;
    }
  }
  return { category: cat, amount: max };
}

/** Compare category spend vs previous month; returns insight string + meta */
export function smartCategoryInsight(transactions) {
  const now = new Date();
  const curKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;

  const curMap = spendingByCategory(transactions, curKey);
  const prevMap = spendingByCategory(transactions, prevKey);

  let best = null;
  let bestAbs = 0;

  for (const cat of curMap.keys()) {
    const c = curMap.get(cat) || 0;
    const p = prevMap.get(cat) || 0;
    if (p <= 0 && c <= 0) continue;
    const pct = p > 0 ? ((c - p) / p) * 100 : c > 0 ? 100 : 0;
    const abs = Math.abs(pct);
    if (abs > bestAbs && c > 0) {
      bestAbs = abs;
      best = { category: cat, current: c, previous: p, pctChange: pct };
    }
  }

  if (!best) {
    return {
      message: 'Add a few more transactions to unlock month-over-month category insights.',
      trend: 'neutral',
      category: null,
      pctChange: 0,
    };
  }

  const up = best.pctChange > 1;
  const down = best.pctChange < -1;
  const rounded = Math.round(Math.abs(best.pctChange));

  let message;
  if (best.previous <= 0 && best.current > 0) {
    message = `New spending recorded in ${best.category} this month — track it to stay on budget.`;
  } else if (up) {
    message = `You spent ${rounded}% more on ${best.category} than last month.`;
  } else if (down) {
    message = `You spent ${rounded}% less on ${best.category} than last month — nice work.`;
  } else {
    message = `${best.category} spending is steady vs last month.`;
  }

  return {
    message,
    trend: up ? 'up' : down ? 'down' : 'neutral',
    category: best.category,
    pctChange: best.pctChange,
  };
}

export function monthlyComparison(transactions) {
  const now = new Date();
  const curKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;

  let curSpend = 0;
  let prevSpend = 0;
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    const k = monthKey(t.date);
    if (k === curKey) curSpend += Number(t.amount);
    if (k === prevKey) prevSpend += Number(t.amount);
  }

  const pct = prevSpend > 0 ? ((curSpend - prevSpend) / prevSpend) * 100 : curSpend > 0 ? 100 : 0;
  return { current: curSpend, previous: prevSpend, pctChange: pct };
}

export function savingsRate(transactions) {
  const now = new Date();
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  let inc = 0;
  let exp = 0;
  for (const t of transactions) {
    if (monthKey(t.date) !== key) continue;
    if (t.type === 'income') inc += Number(t.amount);
    else exp += Number(t.amount);
  }
  if (inc <= 0) return { rate: 0, income: inc, expenses: exp };
  const rate = ((inc - exp) / inc) * 100;
  return { rate: Math.max(0, Math.min(100, rate)), income: inc, expenses: exp };
}

export function balanceTrendSeries(transactions) {
  /** Cumulative balance by month (income - expense) */
  const keys = new Set();
  for (const t of transactions) keys.add(monthKey(t.date));
  const sorted = [...keys].sort();

  let running = 0;
  return sorted.map((k) => {
    let delta = 0;
    for (const t of transactions) {
      if (monthKey(t.date) !== k) continue;
      delta += t.type === 'income' ? Number(t.amount) : -Number(t.amount);
    }
    running += delta;
    const label = new Date(k + '-01T12:00:00');
    const name = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(label);
    return { month: k, name, balance: running };
  });
}

export function totals(transactions) {
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (t.type === 'income') income += Number(t.amount);
    else expense += Number(t.amount);
  }
  return { income, expense, balance: income - expense };
}

/**
 * Reusable smart insight payload for dashboard/insight surfaces.
 * Returns both machine-friendly values and a human-readable summary.
 */
export function analyzeFinanceInsights(transactions) {
  const save = savingsRate(transactions);
  const monthCmp = monthlyComparison(transactions);
  const top = highestSpendingCategory(transactions, monthKey(new Date()));

  const overspendByIncome = save.expenses > save.income && save.income > 0;
  const overspendSpike = monthCmp.pctChange > 20;
  const warning = overspendByIncome
    ? 'Expenses are higher than income this month.'
    : overspendSpike
      ? 'Spending has spiked versus last month.'
      : null;

  const topCategory = top.category || 'No dominant category yet';
  const direction =
    monthCmp.pctChange > 1
      ? 'up'
      : monthCmp.pctChange < -1
        ? 'down'
        : 'flat';
  const absPct = Math.abs(monthCmp.pctChange).toFixed(1);

  const sentence1 = `Savings rate is ${save.rate.toFixed(1)}% this month.`;
  const sentence2 =
    direction === 'up'
      ? `Spending is up ${absPct}% versus last month.`
      : direction === 'down'
        ? `Spending is down ${absPct}% versus last month.`
        : 'Spending is nearly flat versus last month.';
  const sentence3 = `Top spending category is ${topCategory}.`;

  return {
    savingsRate: save.rate,
    topCategory,
    warning,
    monthOverMonthPct: monthCmp.pctChange,
    summary: `${sentence1} ${sentence2} ${sentence3}`,
  };
}
