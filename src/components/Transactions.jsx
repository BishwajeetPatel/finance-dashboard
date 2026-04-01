import React, { useMemo } from 'react';
import { Search, Filter, Download, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/format';
import { filterAndSort, uniqueCategories } from '../utils/selectors';
import { transactionsToCsv, downloadCsv } from '../utils/csv';
import { CATEGORY_COLORS } from '../data/mockData';
import { TableSkeleton } from './LoadingSkeleton';
import EmptyState from './EmptyState';

export default function Transactions() {
  const { state, dispatch, isAdmin } = useApp();
  const { transactions, filters, ui } = state;

  const list = useMemo(
    () => filterAndSort(transactions, filters),
    [transactions, filters]
  );

  const categories = useMemo(() => uniqueCategories(transactions), [transactions]);

  function setFilter(patch) {
    dispatch({ type: 'SET_FILTERS', payload: patch });
  }

  function toggleSort(field) {
    if (filters.sortBy === field) {
      setFilter({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilter({ sortBy: field, sortDir: 'desc' });
    }
  }

  function ariaSortFor(field) {
    if (filters.sortBy !== field) return 'none';
    return filters.sortDir === 'asc' ? 'ascending' : 'descending';
  }

  function exportCsv() {
    const csv = transactionsToCsv(list);
    downloadCsv(`finboard-transactions-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  if (ui.loading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Transactions</h1>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-sub">Search, filter, and review all activity.</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={exportCsv}
            aria-label="Export visible transactions as CSV"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </header>

      <div className="filters-bar">
        <div className="search-wrap">
          <Search className="search-icon" size={16} aria-hidden />
          <input
            type="search"
            className="search-input"
            placeholder="Search description or category…"
            value={filters.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            aria-label="Search transactions"
          />
        </div>
        <div className="filter-group">
          <Filter size={16} aria-hidden />
          <select
            value={filters.type}
            onChange={(e) => setFilter({ type: e.target.value })}
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="filter-group">
          <select
            value={filters.category}
            onChange={(e) => setFilter({ category: e.target.value })}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrap">
        {list.length === 0 ? (
          <EmptyState
            title="No transactions match your filters"
            description="Try removing a filter or changing your search."
          />
        ) : (
          <table className="tx-table">
            <thead>
              <tr>
                <th className="sortable" scope="col" aria-sort={ariaSortFor('date')}>
                  <button
                    type="button"
                    className="th-sort-btn"
                    onClick={() => toggleSort('date')}
                    aria-label="Sort transactions by date"
                  >
                    Date
                    <ArrowUpDown
                      size={12}
                      className={`sort-icon ${
                        filters.sortBy === 'date' ? 'active' : ''
                      }`}
                    />
                  </button>
                </th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th
                  className="right sortable"
                  scope="col"
                  aria-sort={ariaSortFor('amount')}
                >
                  <button
                    type="button"
                    className="th-sort-btn right"
                    onClick={() => toggleSort('amount')}
                    aria-label="Sort transactions by amount"
                  >
                    Amount
                    <ArrowUpDown
                      size={12}
                      className={`sort-icon ${
                        filters.sortBy === 'amount' ? 'active' : ''
                      }`}
                    />
                  </button>
                </th>
                {isAdmin ? <th className="right" scope="col">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id}>
                  <td className="date-cell">{formatDate(t.date)}</td>
                  <td className="desc-cell">{t.description}</td>
                  <td>
                    <span
                      className="cat-badge"
                      style={{
                        background: `${CATEGORY_COLORS[t.category] || '#94a3b8'}22`,
                        color: CATEGORY_COLORS[t.category] || 'var(--text)',
                      }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td className={`amount-cell right ${t.type}`}>
                    {t.type === 'income' ? '+' : '−'}
                    {formatCurrency(t.amount)}
                  </td>
                  {isAdmin ? (
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="icon-btn edit"
                        aria-label={`Edit ${t.description}`}
                        onClick={() =>
                          dispatch({
                            type: 'OPEN_MODAL',
                            payload: { mode: 'edit', transaction: t },
                          })
                        }
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn del"
                        aria-label={`Delete ${t.description}`}
                        onClick={() =>
                          dispatch({ type: 'SET_CONFIRM_DELETE', payload: t.id })
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
