import React from 'react';
import { Shield, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

/**
 * @param {'sidebar' | 'bar'} variant — sidebar: label + hint; bar: compact strip for mobile
 */
export default function RoleSelect({ variant = 'sidebar' }) {
  const { state, dispatch } = useApp();
  const { role } = state;
  const id = variant === 'bar' ? 'role-select-mobile' : 'role-select-sidebar';
  const compact = variant === 'bar';

  if (compact) {
    return (
      <div className="role-select-wrap role-select-wrap--bar">
        <span className="role-bar-lead" id={`${id}-lead`}>
          {role === 'admin' ? (
            <Shield size={16} strokeWidth={2} aria-hidden />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden />
          )}
          <span className="role-bar-title">Role</span>
        </span>
        <div className="role-bar-row">
          <label htmlFor={id} className="visually-hidden">
            Choose Viewer or Admin
          </label>
          <select
            id={id}
            className="role-select"
            value={role}
            onChange={(e) =>
              dispatch({ type: 'SET_ROLE', payload: e.target.value })
            }
            aria-labelledby={`${id}-lead`}
            aria-label="Viewer is read-only; Admin can add, edit, and delete"
          >
            <option value="viewer">Viewer (read-only)</option>
            <option value="admin">Admin (full access)</option>
          </select>
          <span
            className={`role-bar-badge role-bar-badge--${role}`}
            aria-live="polite"
          >
            {role === 'viewer' ? 'Read-only' : 'Can edit'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="role-select-wrap">
      <p className="role-label">Access role</p>
      <div className="role-select-heading">
        <label htmlFor={id} className="role-select-label">
          Choose mode
        </label>
        <span
          className={`role-pill role-pill--${role}`}
          title={
            role === 'viewer'
              ? 'Read-only: no add, edit, or delete'
              : 'Full access: add, edit, and delete'
          }
        >
          {role === 'viewer' ? (
            <>
              <Eye size={12} aria-hidden />
              Viewer
            </>
          ) : (
            <>
              <Shield size={12} aria-hidden />
              Admin
            </>
          )}
        </span>
      </div>

      <div className="role-select-control">
        <select
          id={id}
          className="role-select"
          value={role}
          onChange={(e) =>
            dispatch({ type: 'SET_ROLE', payload: e.target.value })
          }
          aria-describedby={`${id}-hint`}
          aria-label="Viewer is read-only; Admin can add, edit, and delete transactions"
        >
          <option value="viewer">Viewer (read-only)</option>
          <option value="admin">Admin (add / edit / delete)</option>
        </select>
      </div>

      <p className="role-select-hint" id={`${id}-hint`}>
        {role === 'viewer' ? (
          <>
            <strong>Viewer</strong> — browse, filter, and export. Add, edit, and
            delete are off.
          </>
        ) : (
          <>
            <strong>Admin</strong> — use the + Add button and row actions to
            manage transactions.
          </>
        )}
      </p>
    </div>
  );
}
