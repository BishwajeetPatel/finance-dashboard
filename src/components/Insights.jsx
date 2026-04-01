import React, { useMemo } from 'react';
import {
  PieChart as PieIcon,
  CalendarClock,
  PiggyBank,
  Sparkles,
} from 'lucide-react';
import {
  highestSpendingCategory,
  smartCategoryInsight,
  monthlyComparison,
  savingsRate,
  spendingByCategory,
  monthKey,
  analyzeFinanceInsights,
} from '../utils/insights';
import { formatCurrency } from '../utils/format';
import { useApp } from '../context/AppContext';
import { DashboardSkeleton } from './LoadingSkeleton';

export default function Insights() {
  const { state } = useApp();
  const { transactions, ui } = state;

  const curKey = monthKey(new Date());

  const high = useMemo(
    () => highestSpendingCategory(transactions, curKey),
    [transactions, curKey]
  );

  const smart = useMemo(() => smartCategoryInsight(transactions), [transactions]);

  const monthCmp = useMemo(() => monthlyComparison(transactions), [transactions]);

  const save = useMemo(() => savingsRate(transactions), [transactions]);
  const smartPack = useMemo(
    () => analyzeFinanceInsights(transactions),
    [transactions]
  );

  const topCats = useMemo(() => {
    const map = spendingByCategory(transactions, curKey);
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [transactions, curKey]);

  const maxCat = topCats[0]?.[1] || 1;

  if (ui.loading) return <DashboardSkeleton />;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Insights</h1>
          <p className="page-sub">Patterns, comparisons, and quick takeaways.</p>
        </div>
      </header>

      <div className="insight-cards">
        <div className="insight-card insight-orange">
          <div className="insight-icon">
            <PieIcon size={20} />
          </div>
          <div>
            <p className="insight-title">
              <span className="insight-emoji" aria-hidden>
                💰
              </span>
              Top spending
            </p>
            <p className="insight-value">
              {high.category ? high.category : '—'}
            </p>
            <p className="insight-sub">
              {high.amount > 0 ? formatCurrency(high.amount) : 'No expense data'}
            </p>
          </div>
        </div>

        <div className="insight-card insight-indigo">
          <div className="insight-icon">
            <CalendarClock size={20} />
          </div>
          <div>
            <p className="insight-title">
              <span className="insight-emoji" aria-hidden>
                📈
              </span>
              Monthly comparison
            </p>
            <p className="insight-value insight-row">
              {monthCmp.pctChange > 0 ? (
                <span className="trend-arrow trend-bad" title="Spending up vs last month">
                  ↑
                </span>
              ) : monthCmp.pctChange < 0 ? (
                <span className="trend-arrow trend-good" title="Spending down vs last month">
                  ↓
                </span>
              ) : (
                <span className="trend-arrow trend-neutral">→</span>
              )}
              {Math.abs(monthCmp.pctChange).toFixed(1)}%
            </p>
            <p className="insight-sub">
              Spending vs last month ({formatCurrency(monthCmp.current)} vs{' '}
              {formatCurrency(monthCmp.previous)})
            </p>
          </div>
        </div>

        <div className="insight-card insight-green">
          <div className="insight-icon">
            <PiggyBank size={20} />
          </div>
          <div>
            <p className="insight-title">
              <span className="insight-emoji" aria-hidden>
                💵
              </span>
              Savings rate
            </p>
            <p className="insight-value">{save.rate.toFixed(1)}%</p>
            <p className="insight-sub">
              Of income kept after expenses this month
            </p>
          </div>
        </div>

        <div className="insight-card insight-teal insight-smart-card">
          <div className="insight-icon">
            <Sparkles size={20} />
          </div>
          <div className="insight-smart-body">
            <p className="insight-title">
              <span className="insight-emoji" aria-hidden>
                🧠
              </span>
              Smart insight
            </p>
            <p className="insight-smart-msg">
              {smart.trend === 'up' && <span className="trend up" aria-hidden>↑ </span>}
              {smart.trend === 'down' && <span className="trend down" aria-hidden>↓ </span>}
              {smart.trend === 'neutral' && <span className="trend flat" aria-hidden>→ </span>}
              {smart.message}
            </p>
            {smartPack.warning ? (
              <p className="insight-sub" style={{ marginTop: 8 }}>
                {smartPack.warning}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="observation-box">
        <h2 className="section-title">Category mix (this month)</h2>
        {topCats.length === 0 ? (
          <p className="insight-sub" style={{ marginTop: 8 }}>
            No expenses recorded for this month yet.
          </p>
        ) : (
          <div className="cat-breakdown">
            {topCats.map(([name, amt]) => (
              <div key={name}>
                <div className="cat-row-header">
                  <span className="cat-name">{name}</span>
                  <span className="cat-amt">{formatCurrency(amt)}</span>
                </div>
                <div className="cat-bar-bg">
                  <div
                    className="cat-bar-fill"
                    style={{ width: `${(amt / maxCat) * 100}%`, background: 'var(--accent)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ul className="obs-list-block">
        <li>
          <span className="obs-lead">⚠️ Spending focus</span>
          {high.category ? (
            <>
              You are spending heavily on{' '}
              <span className="obs-highlight">{high.category}</span>. Consider a weekly cap
              or a separate “fun money” bucket so it does not creep next month.
            </>
          ) : (
            <>Add a few expenses this month to see where your money concentrates.</>
          )}
        </li>
        <li>
          <span className="obs-lead">⚡ Cash flow</span>
          Savings rate of{' '}
          <span className={save.rate >= 20 ? 'green' : 'red'}>
            {save.rate.toFixed(1)}%
          </span>{' '}
          {save.rate >= 20
            ? '— solid buffer. Keep this rhythm if your goals allow.'
            : '— there is headroom to tighten discretionary spend or increase income.'}
        </li>
        <li>
          <span className="obs-lead">📝 Summary</span>
          {smartPack.summary}
        </li>
      </ul>
    </div>
  );
}
