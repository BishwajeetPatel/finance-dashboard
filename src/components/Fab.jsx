import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Fab() {
  const { isAdmin, dispatch } = useApp();
  if (!isAdmin) return null;

  return (
    <button
      type="button"
      className="fab"
      aria-label="Add transaction"
      onClick={() =>
        dispatch({
          type: 'OPEN_MODAL',
          payload: { mode: 'add', transaction: null },
        })
      }
    >
      <Plus size={22} strokeWidth={2.5} />
      <span className="fab-label">Add</span>
    </button>
  );
}
