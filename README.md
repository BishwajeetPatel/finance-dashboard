 FinBoard

Finance dashboard I built for a frontend assignment. React and Vite, mock data only — nothing hits a server. I was trying to get to something that feels like a real product: layout you can read, flows that make sense, and state you can follow without digging through ten libraries.

---

Run it

Need Node 18 or newer.

//bash
git clone <your-repo-url>
cd finance-dashboard
npm install
npm run dev
```

Then open whatever URL Vite shows (often localhost:5173).

Production build:

 bash
npm run build
npm run preview


`dist/` is what you ship; any static host works.



 What it does

Overview Cards for balance, income, expenses, and savings rate; a balance-over-time chart; spending by category; last few transactions.

Transactions — Search, filter by type and category, sort by date or amount, export what’s on screen to CSV. Two roles: Viewer is read-only; Admin can add, edit, or delete (there’s a floating add button and a confirm before delete).

Insights — Top category this month, rough month-over-month change, savings rate, plus a short blurb computed from the same transaction list.

Elsewhere — Light/dark theme (sidebar follows), toasts when you add or remove something, a brief skeleton on first load, empty states when filters or data dry up. Layout is responsive: wide sidebar on desktop, bottom nav when the screen gets small.

---

 How it’s built

State lives in one React context with a reducer — transactions, filters, role, theme, modals, toasts. I liked that for a small app because you can scan one file and see what’s possible, instead of tracing props everywhere.

Data starts from `src/data/mockData.js`. If you’ve never used the app before, that seed fills the UI. After that, the browser keeps your copy under localStorage key `finboard:v1` (transactions, role, theme). Wipe site data if you want a clean slate.

Styling is normal CSS with variables for light and dark. Charts are Recharts; icons are Lucide. No Tailwind, no UI kit — mostly so the file tree stays obvious.



Folders (short)

`src/components` — screens and UI pieces  
`src/context` — `AppContext` + reducer  
`src/data` — seed transactions  
`src/utils` — formatting, insight helpers, CSV, filtering  

Entry is `main.jsx`; shell and styles are `App.jsx` / `App.css`.



Roles

Viewer — look, don’t touch.  
Admin — CRUD on transactions.

That’s enforced in the UI only. There’s no login; it’s there so whoever grades it can flip between modes in a click.



Heads-up

All numbers are fake. Anything that sounds like advice is just the app reading your mock list back to you.

Main point of the repo for me: show clear structure and a usable UI, not stack complexity for its own sake.



 #License

Private / portfolio unless you say otherwise.
