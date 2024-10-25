// Input.tsx
'use client';

import React from 'react';
import './Input.css';

interface InputProps {
  id: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-neon"
    />
  );
};

export default Input;
