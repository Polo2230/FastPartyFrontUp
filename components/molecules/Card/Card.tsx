// /components/molecules/Card/Card.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Card.css';
import Button from '@/components/atoms/Button';

interface CardProps {
  title: string;
  description: string;
  link?: string;
  buttonText?: string;
}

const Card: React.FC<CardProps> = ({ title, description, link, buttonText }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        {link && buttonText && (
          <Link href={link}>
            <Button>{buttonText}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
