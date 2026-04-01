/** Realistic seed data for demo — replaced by localStorage after first load */

const now = new Date();

function iso(y, m, d) {
  return new Date(y, m - 1, d).toISOString().slice(0, 10);
}

export const CATEGORIES = {
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'],
  income: ['Salary', 'Freelance', 'Investments', 'Other'],
};

export const CATEGORY_COLORS = {
  Food: '#6366f1',
  Transport: '#0ea5e9',
  Shopping: '#a855f7',
  Bills: '#f59e0b',
  Entertainment: '#ec4899',
  Health: '#14b8a6',
  Other: '#64748b',
  Salary: '#22c55e',
  Freelance: '#84cc16',
  Investments: '#06b6d4',
};

export const seedTransactions = [
  { id: 't1', date: iso(now.getFullYear(), now.getMonth() + 1, 2), description: 'Salary — Acme Corp', amount: 5200, category: 'Salary', type: 'income' },
  { id: 't2', date: iso(now.getFullYear(), now.getMonth() + 1, 3), description: 'Rent payment', amount: 1400, category: 'Bills', type: 'expense' },
  { id: 't3', date: iso(now.getFullYear(), now.getMonth() + 1, 4), description: 'Grocery — FreshMart', amount: 186.42, category: 'Food', type: 'expense' },
  { id: 't4', date: iso(now.getFullYear(), now.getMonth() + 1, 5), description: 'Metro pass', amount: 45, category: 'Transport', type: 'expense' },
  { id: 't5', date: iso(now.getFullYear(), now.getMonth() + 1, 6), description: 'Freelance — UI audit', amount: 850, category: 'Freelance', type: 'income' },
  { id: 't6', date: iso(now.getFullYear(), now.getMonth() + 1, 8), description: 'Coffee & lunch', amount: 62.3, category: 'Food', type: 'expense' },
  { id: 't7', date: iso(now.getFullYear(), now.getMonth() + 1, 9), description: 'Netflix', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: 't8', date: iso(now.getFullYear(), now.getMonth() + 1, 10), description: 'Pharmacy', amount: 34.5, category: 'Health', type: 'expense' },
  { id: 't9', date: iso(now.getFullYear(), now.getMonth() + 1, 12), description: 'Online shopping', amount: 129.99, category: 'Shopping', type: 'expense' },
  { id: 't10', date: iso(now.getFullYear(), now.getMonth() + 1, 14), description: 'Dinner out', amount: 78.2, category: 'Food', type: 'expense' },
  { id: 't11', date: iso(now.getFullYear(), now.getMonth() + 1, 15), description: 'Dividend payout', amount: 120, category: 'Investments', type: 'income' },
  { id: 't12', date: iso(now.getFullYear(), now.getMonth() + 1, 18), description: 'Electric bill', amount: 92.4, category: 'Bills', type: 'expense' },
  { id: 't13', date: iso(now.getFullYear(), now.getMonth() + 1, 20), description: 'Ride share', amount: 24.6, category: 'Transport', type: 'expense' },
  { id: 't14', date: iso(now.getFullYear(), now.getMonth() + 1, 22), description: 'Weekend groceries', amount: 210.75, category: 'Food', type: 'expense' },
  { id: 't15', date: iso(now.getFullYear(), now.getMonth() + 1, 25), description: 'Concert tickets', amount: 95, category: 'Entertainment', type: 'expense' },
  { id: 't16', date: iso(now.getFullYear(), now.getMonth() + 1, 28), description: 'Gym membership', amount: 49.99, category: 'Health', type: 'expense' },
  { id: 't17', date: iso(now.getFullYear(), now.getMonth(), 5), description: 'Salary — Acme Corp', amount: 5200, category: 'Salary', type: 'income' },
  { id: 't18', date: iso(now.getFullYear(), now.getMonth(), 6), description: 'Rent payment', amount: 1400, category: 'Bills', type: 'expense' },
  { id: 't19', date: iso(now.getFullYear(), now.getMonth(), 7), description: 'Grocery runs', amount: 412.8, category: 'Food', type: 'expense' },
  { id: 't20', date: iso(now.getFullYear(), now.getMonth(), 10), description: 'Freelance — API work', amount: 600, category: 'Freelance', type: 'income' },
  { id: 't21', date: iso(now.getFullYear(), now.getMonth(), 12), description: 'Transport (fuel + metro)', amount: 118.5, category: 'Transport', type: 'expense' },
  { id: 't22', date: iso(now.getFullYear(), now.getMonth(), 15), description: 'Shopping — winter sale', amount: 245, category: 'Shopping', type: 'expense' },
  { id: 't23', date: iso(now.getFullYear(), now.getMonth(), 18), description: 'Streaming & apps', amount: 38, category: 'Entertainment', type: 'expense' },
  { id: 't24', date: iso(now.getFullYear(), now.getMonth(), 22), description: 'Utilities bundle', amount: 105.2, category: 'Bills', type: 'expense' },
  { id: 't25', date: iso(now.getFullYear(), now.getMonth() - 1, 8), description: 'Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 't26', date: iso(now.getFullYear(), now.getMonth() - 1, 9), description: 'Rent', amount: 1400, category: 'Bills', type: 'expense' },
  { id: 't27', date: iso(now.getFullYear(), now.getMonth() - 1, 14), description: 'Food & dining', amount: 380.2, category: 'Food', type: 'expense' },
  { id: 't28', date: iso(now.getFullYear(), now.getMonth() - 1, 20), description: 'Side project', amount: 400, category: 'Freelance', type: 'income' },
  { id: 't29', date: iso(now.getFullYear(), now.getMonth() - 1, 25), description: 'Misc shopping', amount: 199.99, category: 'Shopping', type: 'expense' },
];
