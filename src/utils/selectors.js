import { monthKey } from './insights';

export function filterAndSort(transactions, filters) {
  let list = [...transactions];
  const q = filters.search.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (filters.type !== 'all') list = list.filter((t) => t.type === filters.type);
  if (filters.category !== 'all')
    list = list.filter((t) => t.category === filters.category);

  const byDate = filters.sortBy === 'date';
  list.sort((a, b) => {
    const va = byDate ? a.date : Number(a.amount);
    const vb = byDate ? b.date : Number(b.amount);
    const cmp = byDate ? String(va).localeCompare(String(vb)) : va - vb;
    return filters.sortDir === 'asc' ? cmp : -cmp;
  });
  return list;
}

export function uniqueCategories(transactions) {
  const s = new Set();
  for (const t of transactions) s.add(t.category);
  return [...s].sort();
}

export function currentMonthIncomeExpense(transactions) {
  const k = monthKey(new Date());
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (monthKey(t.date) !== k) continue;
    if (t.type === 'income') income += Number(t.amount);
    else expense += Number(t.amount);
  }
  return { income, expense, balance: income - expense };
}
