import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  homePath?: string;
  homeLabel?: string;
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  showHome = true,
  homePath = '/',
  homeLabel = 'Início',
  separator = <FaChevronRight className="text-[var(--muted)]" />,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1
}) => {
  const allItems = showHome 
    ? [{ label: homeLabel, path: homePath, icon: <FaHome /> }, ...items]
    : items;

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === allItems.length - 1;
    const isHome = item.path === homePath;

    if (isLast) {
      return (
        <Typography
          key={index}
          className="text-[var(--text)] font-medium flex items-center gap-2"
        >
          {item.icon && <span className="text-[var(--primary)]">{item.icon}</span>}
          {item.label}
        </Typography>
      );
    }

    if (item.path) {
      return (
        <Link
          key={index}
          component={RouterLink}
          to={item.path}
          className={`text-[var(--muted)] hover:text-[var(--primary)] transition-colors flex items-center gap-2 ${
            isHome ? 'font-medium' : ''
          }`}
          underline="hover"
        >
          {item.icon && <span className="text-[var(--primary)]">{item.icon}</span>}
          {item.label}
        </Link>
      );
    }

    return (
      <Typography
        key={index}
        className="text-[var(--muted)] flex items-center gap-2"
      >
        {item.icon && <span className="text-[var(--primary)]">{item.icon}</span>}
        {item.label}
      </Typography>
    );
  };

  return (
    <Breadcrumbs
      separator={separator}
      className={`py-2 px-4 bg-white rounded-lg shadow-sm border ${className}`}
      maxItems={maxItems}
      itemsBeforeCollapse={itemsBeforeCollapse}
      itemsAfterCollapse={itemsAfterCollapse}
    >
      {allItems.map(renderBreadcrumbItem)}
    </Breadcrumbs>
  );
};

export default Breadcrumb; 