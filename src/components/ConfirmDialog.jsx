import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ConfirmDialog() {
  const { state, dispatch, addToast, isAdmin } = useApp();
  const id = state.ui.confirmDeleteId;
  if (!id || !isAdmin) return null;

  const tx = state.transactions.find((t) => t.id === id);

  function cancel() {
    dispatch({ type: 'SET_CONFIRM_DELETE', payload: null });
  }

  function confirm() {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    dispatch({ type: 'SET_CONFIRM_DELETE', payload: null });
    addToast('Transaction deleted');
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={cancel}>
      <div
        className="modal modal-sm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header confirm-head">
          <div className="confirm-icon-wrap">
            <AlertTriangle size={22} aria-hidden />
          </div>
          <h3 id="confirm-title">Delete transaction?</h3>
        </div>
        <div className="modal-body">
          <p className="confirm-text">
            {tx
              ? `"${tx.description}" will be permanently removed from your activity.`
              : 'This transaction will be removed.'}
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={cancel}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={confirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
