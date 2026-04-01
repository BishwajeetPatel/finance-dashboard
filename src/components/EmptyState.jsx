import React from 'react';
import { Inbox, Search } from 'lucide-react';

const VARIANTS = {
  default: { Icon: Inbox },
  empty: { Icon: Inbox },
  filter: { Icon: Search },
};

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Try adjusting filters or add a transaction.',
  variant = 'default',
}) {
  const { Icon } = VARIANTS[variant] || VARIANTS.default;

  return (
    <div className={`empty-state enhanced empty-state--${variant}`}>
      <div className="empty-icon-wrap">
        <Icon size={40} strokeWidth={1.25} aria-hidden />
      </div>
      <p className="empty-title">{title}</p>
      <p className="empty-desc">{description}</p>
    </div>
  );
}
