// Label.tsx
'use client';

import React from 'react';
import './Label.css';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`label-neon ${className}`}>
      {children}
    </label>
  );
};

export default Label;
