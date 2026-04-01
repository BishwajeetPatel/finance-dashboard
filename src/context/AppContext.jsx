import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { seedTransactions } from '../data/mockData';

const STORAGE_KEY = 'finboard:v1';

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePersisted(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

const initialState = {
  transactions: [],
  role: 'viewer',
  darkMode: false,
  activeTab: 'dashboard',
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortDir: 'desc',
  },
  ui: {
    loading: true,
    modal: { open: false, mode: 'add', transaction: null },
    confirmDeleteId: null,
    toasts: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      const { transactions, role, darkMode, ui } = action.payload;
      return {
        ...state,
        transactions: transactions ?? state.transactions,
        role: role ?? state.role,
        darkMode: darkMode ?? state.darkMode,
        ui: { ...state.ui, ...ui },
      };
    }
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, loading: action.payload } };
    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload,
        ui: {
          ...state.ui,
          modal: { open: false, mode: 'add', transaction: null },
          confirmDeleteId: null,
        },
      };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'TOGGLE_DARK':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'ADD_TRANSACTION': {
      const t = action.payload;
      return { ...state, transactions: [t, ...state.transactions] };
    }
    case 'UPDATE_TRANSACTION': {
      const { id, ...rest } = action.payload;
      return {
        ...state,
        transactions: state.transactions.map((x) =>
          x.id === id ? { ...x, ...rest } : x
        ),
      };
    }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((x) => x.id !== action.payload),
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        ui: {
          ...state.ui,
          modal: { open: true, ...action.payload },
        },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        ui: {
          ...state.ui,
          modal: { open: false, mode: 'add', transaction: null },
        },
      };
    case 'SET_CONFIRM_DELETE':
      return {
        ...state,
        ui: { ...state.ui, confirmDeleteId: action.payload },
      };
    case 'ADD_TOAST': {
      const { id, message, variant } = action.payload;
      return {
        ...state,
        ui: {
          ...state.ui,
          toasts: [...state.ui.toasts, { id, message, variant }],
        },
      };
    }
    case 'REMOVE_TOAST':
      return {
        ...state,
        ui: {
          ...state.ui,
          toasts: state.ui.toasts.filter((t) => t.id !== action.payload),
        },
      };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = loadPersisted();
    const txs =
      saved?.transactions?.length > 0 ? saved.transactions : [...seedTransactions];
    const role =
      saved?.role === 'admin' || saved?.role === 'viewer' ? saved.role : 'viewer';
    const darkMode = Boolean(saved?.darkMode);

    dispatch({
      type: 'HYDRATE',
      payload: {
        transactions: txs,
        role,
        darkMode,
        ui: { loading: true },
      },
    });

    const timer = setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 880);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.ui.loading) return;
    savePersisted({
      transactions: state.transactions,
      role: state.role,
      darkMode: state.darkMode,
    });
  }, [state.transactions, state.role, state.darkMode, state.ui.loading]);

  const addToast = useCallback((message, variant = 'success') => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `toast-${Date.now()}`;
    dispatch({ type: 'ADD_TOAST', payload: { id, message, variant } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3800);
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      addToast,
      isAdmin: state.role === 'admin',
    }),
    [state, addToast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
