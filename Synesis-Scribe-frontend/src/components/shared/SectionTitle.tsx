import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode; // For actions like buttons next to title
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, description, className, children }) => {
  return (
    <div className={cn("mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center", className)}>
      <div>
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground max-w-prose">
            {description}
          </p>
        )}
      </div>
      {children && <div className="mt-4 sm:mt-0">{children}</div>}
    </div>
  );
};

export default SectionTitle;
