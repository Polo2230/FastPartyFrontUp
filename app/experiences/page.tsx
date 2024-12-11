// page.tsx
import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import './style.css';

export const metadata = {
  title: 'Experiencias - FastParty',
  description: 'Descubre las experiencias de nuestros usuarios en FastParty.',
};

const reviews = [
  {
    user: 'Juan Pérez',
    date: '10 de diciembre de 2024',
    review: '¡Increíble experiencia! Comprar boletos nunca fue tan fácil. FastParty me ahorró mucho tiempo.',
    rating: 5,
  },
  {
    user: 'María García',
    date: '5 de diciembre de 2024',
    review: 'Me encantó la interfaz, muy intuitiva y rápida. Definitivamente la usaré para futuros eventos.',
    rating: 4,
  },
  {
    user: 'Carlos López',
    date: '2 de diciembre de 2024',
    review: 'Tuve un pequeño problema con mi boleto, pero el servicio al cliente lo resolvió en minutos. Excelente atención.',
    rating: 4.5,
  },
];

export default function Experiences() {
  return (
    <MainTemplate>
      <div className="experiences-page">
        <header>
          <h1>Experiencias de Usuarios</h1>
        </header>
        <section className="reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h2>{review.user}</h2>
              <p className="review-date">{review.date}</p>
              <p className="review-text">{review.review}</p>
              <div className="review-rating">
                {'⭐'.repeat(Math.floor(review.rating))}
                {review.rating % 1 !== 0 && '⭐½'}
              </div>
            </div>
          ))}
        </section>
      </div>
    </MainTemplate>
  );
}
