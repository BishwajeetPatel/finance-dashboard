import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import TransactionModal from './components/TransactionModal';
import ConfirmDialog from './components/ConfirmDialog';
import ToastStack from './components/ToastStack';
import Fab from './components/Fab';
import './App.css';

function AppShell() {
  const { state } = useApp();
  const { darkMode, activeTab } = state;

  const Page = {
    dashboard: Dashboard,
    transactions: Transactions,
    insights: Insights,
  }[activeTab] || Dashboard;

  return (
    <>
      <div className={`app-root ${darkMode ? 'dark' : ''}`}>
        <Sidebar />
        <main className="main-content">
          <Page />
        </main>
      </div>
      <Fab />
      <TransactionModal />
      <ConfirmDialog />
      <ToastStack />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
