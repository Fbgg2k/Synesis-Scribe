
'use client';

import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { IconName } from '@/lib/types';

interface DynamicLucideIconProps extends LucideProps {
  name: IconName;
}

const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({ name, ...props }) => {
  // Check if the name is a valid key in Icons, primarily for robustness against type errors upstream.
  // This also handles if `name` might somehow be an empty string or unexpected value not caught by IconName type.
  if (!name || !(name in Icons)) {
    console.warn(`Icon "${name}" not found or invalid in lucide-react. Rendering HelpCircle as fallback.`);
    const FallbackIcon = Icons.HelpCircle; // Default fallback icon
    return <FallbackIcon {...props} />;
  }
  
  const IconComponent = Icons[name];

  return <IconComponent {...props} />;
};

export default DynamicLucideIcon;
