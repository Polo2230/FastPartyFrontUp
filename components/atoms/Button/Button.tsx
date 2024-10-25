// Button.tsx
'use client';

import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = "button", className = "" }) => {
  return (
    <button type={type} className={`button-neon ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
