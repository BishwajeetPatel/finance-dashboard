import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';

const emptyForm = {
  date: '',
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
};

export default function TransactionModal() {
  const { state, dispatch, addToast, isAdmin } = useApp();
  const { modal } = state.ui;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!modal.open) return;
    if (modal.mode === 'edit' && modal.transaction) {
      const t = modal.transaction;
      setForm({
        date: t.date,
        description: t.description,
        amount: String(t.amount),
        category: t.category,
        type: t.type,
      });
    } else {
      setForm({
        ...emptyForm,
        date: new Date().toISOString().slice(0, 10),
        category: 'Food',
        type: 'expense',
      });
    }
    setError('');
  }, [modal]);

  if (!modal.open || !isAdmin) return null;

  const categories =
    form.type === 'income' ? CATEGORIES.income : CATEGORIES.expense;

  function close() {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  function submit(e) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description.trim()) {
      setError('Please enter a description.');
      return;
    }
    if (Number.isNaN(amount) || amount <= 0) {
      setError('Enter a valid amount greater than zero.');
      return;
    }

    if (modal.mode === 'edit' && modal.transaction) {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: {
          id: modal.transaction.id,
          date: form.date,
          description: form.description.trim(),
          amount,
          category: form.category,
          type: form.type,
        },
      });
      addToast('Transaction updated');
    } else {
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `tx-${Date.now()}`;
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: {
          id,
          date: form.date,
          description: form.description.trim(),
          amount,
          category: form.category,
          type: form.type,
        },
      });
      addToast('Transaction added');
    }
    close();
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={close}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tx-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="tx-modal-title">
            {modal.mode === 'edit' ? 'Edit transaction' : 'Add transaction'}
          </h3>
          <button type="button" className="modal-close" onClick={close} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            {error ? <div className="form-error">{error}</div> : null}
            <div className="form-row">
              <label htmlFor="tx-date">Date</label>
              <input
                id="tx-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="tx-desc">Description</label>
              <input
                id="tx-desc"
                type="text"
                placeholder="e.g. Grocery run"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="form-row-2">
              <div className="form-row">
                <label htmlFor="tx-type">Type</label>
                <select
                  id="tx-type"
                  value={form.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    const nextCat =
                      type === 'income' ? CATEGORIES.income[0] : CATEGORIES.expense[0];
                    setForm((f) => ({ ...f, type, category: nextCat }));
                  }}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="tx-amt">Amount</label>
                <input
                  id="tx-amt"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="tx-cat">Category</label>
              <select
                id="tx-cat"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {modal.mode === 'edit' ? 'Save changes' : 'Add transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
