// FormField.tsx
'use client';

import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import './FormField.css';

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, placeholder, value, onChange }) => {
  return (
    <div className="form-field">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default FormField;
