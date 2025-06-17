import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  
  // Generate automatic breadcrumbs if none provided
  const breadcrumbs = items.length > 0 ? items : [
    { label: 'Home', path: '/' },
    ...pathnames.map((name, index) => {
      // Build up the paths incrementally
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      // Format the breadcrumb label
      const label = name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return { label, path };
    })
  ];

  return (
    <nav className="mb-6">
      <ol className="flex flex-wrap items-center text-sm text-secondary-500">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <Home className="w-4 h-4 mr-1" />
              )}
              
              {isLast ? (
                <span className="font-medium text-secondary-900">{breadcrumb.label}</span>
              ) : (
                <>
                  <Link 
                    to={breadcrumb.path || '#'} 
                    className="hover:text-primary-600 transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                  <ChevronRight className="w-3 h-3 mx-2" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
