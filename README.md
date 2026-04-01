# FinBoard

**Author:** Bishwajeet Patel

This project was built as part of a frontend assignment to demonstrate dashboard design, state management, and UI/UX skills. It is my own work: React + Vite, mock data only — nothing hits a server. The UI is meant to feel like a small real product: readable layout, sensible flows, and state you can follow without extra libraries.

---

## Run it

Requires Node 18 or newer.

```bash
git clone <your-repo-url>
cd finance-dashboard
npm install
npm run dev
```

Then open the URL Vite prints (often `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

Ship the `dist/` folder to any static host.

---

## What it does

- **Overview** — Cards for balance, income, expenses, and savings rate; balance-over-time chart; spending by category; recent transactions.
- **Transactions** — Search, filter by type and category, sort by date or amount, export the visible rows to CSV. **Roles:** Viewer is read-only; Admin can add, edit, or delete (floating add button + confirm before delete).
- **Insights** — Top category, month-over-month change, savings rate, short copy derived from the same data.
- **About** — Project purpose, author, and assignment context.

Elsewhere — light/dark theme, toasts on add/delete, skeleton on first load, empty states, responsive layout (sidebar on desktop, bottom nav on small screens).

---

## How it’s built

State lives in one React context with a reducer (transactions, filters, role, theme, modals, toasts). Data starts from `src/data/mockData.js`; the browser persists your copy under localStorage key `finboard:v1` (transactions, role, theme). Clear site data for a clean slate.

Styling uses CSS variables for light/dark. Charts: Recharts. Icons: Lucide.

**Folders**

- `src/components` — screens and UI
- `src/context` — `AppContext` + reducer
- `src/data` — seed transactions
- `src/utils` — formatting, insights, CSV, filtering

Entry: `main.jsx`. Shell: `App.jsx` / `App.css`.

---

## Roles

- **Viewer** — read-only: browse, filter, and export.
- **Admin** — add, edit, and delete transactions.

Enforced in the UI only (no login).

---

## Note

All numbers are mock. Nothing here is financial advice.

---

## License

Private / portfolio unless you specify otherwise.
