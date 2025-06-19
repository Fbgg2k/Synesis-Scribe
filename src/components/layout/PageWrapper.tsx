import React from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div className={cn("flex-1 p-4 sm:p-6 lg:p-8", className)}>
      {children}
    </div>
  );
};

export default PageWrapper;
