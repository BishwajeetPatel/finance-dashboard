import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="page skeleton-page" aria-hidden>
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-sub" />
      <div
        className="skeleton-line skeleton-hero"
        style={{ marginTop: 20, marginBottom: 4 }}
      />
      <div className="cards-grid" style={{ marginTop: 20 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="summary-card skeleton-card">
            <div className="skeleton-line skeleton-sm" />
            <div className="skeleton-line skeleton-lg" style={{ marginTop: 12 }} />
          </div>
        ))}
      </div>
      <div className="charts-row" style={{ marginTop: 16 }}>
        <div className="chart-card skeleton-chart">
          <div className="skeleton-line skeleton-sm" />
          <div className="skeleton-block" style={{ marginTop: 20 }} />
        </div>
        <div className="chart-card skeleton-chart">
          <div className="skeleton-line skeleton-sm" />
          <div className="skeleton-block round" style={{ marginTop: 20 }} />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 6 }) {
  return (
    <div className="table-skeleton" aria-hidden>
      <div className="skeleton-line skeleton-bar" />
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-line skeleton-cell" />
          <div className="skeleton-line skeleton-cell wide" />
          <div className="skeleton-line skeleton-cell short" />
        </div>
      ))}
    </div>
  );
}
