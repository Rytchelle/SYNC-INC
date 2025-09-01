import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">{title}</h1>
      <p className="text-[var(--muted)]">{subtitle}</p>
    </div>
  );
};

export default PageHeader; 