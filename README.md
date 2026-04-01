## FinBoard

Live Demo: https://your-netlify-link.netlify.app  
Repo: https://github.com/BishwajeetPatel/finance-dashboard

---

Finance dashboard built as a frontend assignment using React and Vite.  
It runs entirely on mock data — no backend, no APIs.

The focus was simple: build something that feels like a real product.  
Clean layout, intuitive flows, and state management that’s easy to follow without unnecessary complexity.

---

 Features

 Overview
- Balance, income, expenses, savings rate  
- Balance-over-time chart  
- Spending by category  
- Recent transactions  

 Transactions
- Search by keyword  
- Filter by type and category  
- Sort by date or amount  
- Export visible data to CSV  

Roles:
- Viewer → read-only  
- Admin → add, edit, delete (with confirmation + floating action button)

 📈 Insights
- Top spending category (monthly)  
- Month-over-month comparison  
- Savings rate  
- Short data-driven summary  

 UX & UI
- Light / dark theme (persisted)  
- Toast notifications  
- Loading skeleton on first load  
- Empty states for no data  
- Fully responsive (sidebar → bottom nav on mobile)



 Tech & Architecture

- React + Vite
- Context API + useReducer for global state  
- Local persistence via localStorage (`finboard:v1`)
- Recharts for data visualization  
- Lucide for icons  
- Plain CSS with variables (no UI frameworks)

Everything is intentionally kept simple and readable — no heavy abstractions, no unnecessary libraries.



 Project Structure


src/
components/ # UI components
context/ # global state (AppContext + reducer)
data/ # mock seed data
utils/ # helpers (formatting, filters, CSV, insights)
App.jsx
main.jsx


---

 Getting Started

Requirements: Node.js 18+

```bash
git clone https://github.com/BishwajeetPatel/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev

Open the local URL shown in the terminal (usually http://localhost:5173
)

 Production Build
npm run build
npm run preview

The dist/ folder contains the production-ready build and can be deployed on any static hosting platform.

 Roles
Viewer → can only view data
Admin → full CRUD access

Role switching is handled in the UI (no authentication layer).

 Disclaimer

All data is mock.
Insights are generated from that data and are for demonstration purposes only.

Why this project

This project focuses on:

clear structure
predictable state management
practical UI/UX

The goal wasn’t to use more tools — it was to build something clean, usable, and easy to understand.

 License

Private / portfolio use unless stated otherwise.



License

Private / portfolio use unless stated otherwise.
