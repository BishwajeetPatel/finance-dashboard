import React from 'react';
import { useApp } from '../context/AppContext';
import { DashboardSkeleton } from './LoadingSkeleton';

export default function About() {
  const { state } = useApp();
  const { ui } = state;

  if (ui.loading) return <DashboardSkeleton />;

  return (
    <div className="page about-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">About</h1>
          <p className="page-sub">
            Who built this, why it exists, and how it maps to the assignment.
          </p>
        </div>
      </header>

      <section className="about-hero" aria-labelledby="about-name">
        <h2 id="about-name" className="about-name">
          Bishwajeet Patel
        </h2>
        <p className="about-tagline">
          I built FinBoard to show how I approach a product-style dashboard: clear
          hierarchy, predictable state, and a UI that still feels good in dark mode
          and on a phone.
        </p>
      </section>

      <div className="about-grid">
        <section className="about-card">
          <h3 className="about-card-title">Purpose</h3>
          <p>
            The goal was a small but credible finance surface — not a toy demo. You
            get real flows: filtering transactions, exporting CSV, reading
            insights from the same data the charts use, and switching between Viewer
            and Admin so reviewers can see read-only vs full access without a
            backend or login.
          </p>
        </section>

        <section className="about-card">
          <h3 className="about-card-title">What I focused on</h3>
          <ul className="about-list">
            <li>One place for app state (context + reducer) with local persistence</li>
            <li>Accessible tables, sorting, empty states, and loading skeletons</li>
            <li>Consistent color system for income/expense and a calm fintech look</li>
          </ul>
        </section>

        <section className="about-card about-card--full">
          <h3 className="about-card-title">Assignment context</h3>
          <p className="about-assignment-line">
            This project was built as part of a frontend assignment to demonstrate
            dashboard design, state management, and UI/UX skills.
          </p>
          <p className="about-fineprint">
            All transaction data is mock/seeded for demonstration; there is no
            server or real account connection.
          </p>
        </section>
      </div>
    </div>
  );
}
