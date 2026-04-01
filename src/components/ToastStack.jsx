import React from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ToastStack() {
  const { state, dispatch } = useApp();
  const { toasts } = state.ui;

  if (!toasts.length) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.variant || 'success'}`}
        >
          {t.variant === 'error' ? (
            <XCircle size={18} className="toast-icon" aria-hidden />
          ) : (
            <CheckCircle2 size={18} className="toast-icon" aria-hidden />
          )}
          <span className="toast-msg">{t.message}</span>
          <button
            type="button"
            className="toast-dismiss"
            aria-label="Dismiss"
            onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: t.id })}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
