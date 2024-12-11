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
  imageUrl?: string; // Agregado para admitir imágenes
}

const Card: React.FC<CardProps> = ({ title, description, link, buttonText, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && (
        <div className="card-image">
          <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}
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
