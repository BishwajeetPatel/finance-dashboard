import React from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Moon,
  Sun,
  Shield,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeTab, darkMode, role } = state;

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-logo">
        <span className="logo-icon" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="logo-text">FinBoard</span>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: id })}
          >
            <Icon size={18} strokeWidth={2} aria-hidden />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="role-label">Role</p>
        <div className="role-switch" role="group" aria-label="Switch role">
          <button
            type="button"
            className={`role-switch-btn ${role === 'viewer' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
          >
            <Eye size={14} aria-hidden />
            Viewer
          </button>
          <button
            type="button"
            className={`role-switch-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
          >
            <Shield size={14} aria-hidden />
            Admin
          </button>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  );
}
