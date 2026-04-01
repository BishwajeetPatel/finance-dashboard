import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Try adjusting filters or add a transaction.',
  icon: Icon = Inbox,
}) {
  return (
    <div className="empty-state enhanced">
      <div className="empty-icon-wrap">
        <Icon size={40} strokeWidth={1.25} />
      </div>
      <p className="empty-title">{title}</p>
      <p className="empty-desc">{description}</p>
    </div>
  );
}
