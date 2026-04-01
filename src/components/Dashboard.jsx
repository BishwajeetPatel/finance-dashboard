import React, { useMemo } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/format';
import {
  balanceTrendSeries,
  spendingByCategory,
  savingsRate,
  monthKey,
} from '../utils/insights';
import { currentMonthIncomeExpense } from '../utils/selectors';
import { CATEGORY_COLORS } from '../data/mockData';
import { DashboardSkeleton } from './LoadingSkeleton';
import EmptyState from './EmptyState';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      <div className="tooltip-value mono">{formatCurrency(p.value)}</div>
    </div>
  );
}

export default function Dashboard() {
  const { state } = useApp();
  const { transactions, ui } = state;

  const curKey = monthKey(new Date());

  const { income, expense, balance } = useMemo(
    () => currentMonthIncomeExpense(transactions),
    [transactions]
  );

  const { rate: savings } = useMemo(() => savingsRate(transactions), [transactions]);

  const trend = useMemo(() => balanceTrendSeries(transactions), [transactions]);

  const pieData = useMemo(() => {
    const map = spendingByCategory(transactions, curKey);
    return [...map.entries()]
      .map(([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [transactions, curKey]);

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }, [transactions]);

  if (ui.loading) return <DashboardSkeleton />;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-sub">Balance, cash flow, and trends — at a glance.</p>
        </div>
      </header>

      <div className="cards-grid">
        <div className="summary-card card-blue">
          <div className="card-header">
            <span className="card-label">Balance (month)</span>
            <span className="card-icon-wrap">
              <Wallet size={18} />
            </span>
          </div>
          <div className="card-value">{formatCurrency(balance)}</div>
          <p className="card-sub">Income minus expenses this month</p>
        </div>
        <div className="summary-card card-green">
          <div className="card-header">
            <span className="card-label">Income</span>
            <span className="card-icon-wrap">
              <TrendingUp size={18} />
            </span>
          </div>
          <div className="card-value">{formatCurrency(income)}</div>
          <p className="card-sub">Credited this month</p>
        </div>
        <div className="summary-card card-red">
          <div className="card-header">
            <span className="card-label">Expenses</span>
            <span className="card-icon-wrap">
              <TrendingDown size={18} />
            </span>
          </div>
          <div className="card-value">{formatCurrency(expense)}</div>
          <p className="card-sub">Spent this month</p>
        </div>
        <div className="summary-card card-amber">
          <div className="card-header">
            <span className="card-label">Savings rate</span>
            <span className="card-icon-wrap">
              <PiggyBank size={18} />
            </span>
          </div>
          <div className="card-value">{savings.toFixed(1)}%</div>
          <p className="card-sub">Of income retained this month</p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-card-head">
            <h2 className="chart-title">Balance trend</h2>
            <p className="chart-subtitle">Cumulative net balance across months</p>
          </div>
          {trend.length === 0 ? (
            <div className="chart-empty">
              <EmptyState
                title="No trend data"
                description="Add transactions across months to see cumulative balance."
              />
            </div>
          ) : (
            <div className="chart-inner">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text2)' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--text2)' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      new Intl.NumberFormat('en-US', {
                        notation: 'compact',
                        maximumFractionDigits: 1,
                      }).format(v)
                    }
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    name="Balance"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#balFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="chart-card chart-card--breakdown">
          <div className="chart-card-head">
            <h2 className="chart-title">Category breakdown</h2>
            <p className="chart-subtitle">This month · by expense category</p>
          </div>
          {pieData.length === 0 ? (
            <div className="chart-empty">
              <EmptyState
                title="No spending this month"
                description="Expense transactions will appear in this breakdown."
              />
            </div>
          ) : (
            <div className="chart-inner pie-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={2}
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                        stroke="var(--surface)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => formatCurrency(v)}
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <ul className="pie-legend">
                {pieData.slice(0, 6).map((d) => (
                  <li key={d.name}>
                    <span
                      className="pie-dot"
                      style={{
                        background: CATEGORY_COLORS[d.name] || '#94a3b8',
                      }}
                    />
                    <span className="pie-name">{d.name}</span>
                    <span className="pie-val">{formatCurrency(d.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <section className="recent-section">
        <h2 className="section-title">Recent transactions</h2>
        {recent.length === 0 ? (
          <EmptyState title="No activity yet" description="Your latest five items will show up here." />
        ) : (
          <ul className="recent-list">
            {recent.map((t) => (
              <li key={t.id} className="recent-item">
                <span
                  className="cat-dot"
                  style={{
                    background: CATEGORY_COLORS[t.category] || '#94a3b8',
                  }}
                  aria-hidden
                />
                <div className="recent-info">
                  <span className="recent-desc">{t.description}</span>
                  <span className="recent-cat">
                    {t.category} · {formatDate(t.date)}
                  </span>
                </div>
                <span className={`recent-amt ${t.type}`}>
                  {t.type === 'income' ? '+' : '−'}
                  {formatCurrency(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
