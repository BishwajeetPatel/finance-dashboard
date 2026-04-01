import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <p className="site-footer-author">
          <strong>Bishwajeet Patel</strong>
          <span className="site-footer-sep" aria-hidden>
            ·
          </span>
          <span>FinBoard</span>
        </p>
        <p className="site-footer-assignment">
          This project was built as part of a frontend assignment to demonstrate
          dashboard design, state management, and UI/UX skills.
        </p>
      </div>
    </footer>
  );
}
