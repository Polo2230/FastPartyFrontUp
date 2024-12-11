import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Image from 'next/image';
import './style.css';

import invisibleImage from '../public/assets/invisblevento.jpg';
import salvajeImage from '../public/assets/salvajevento.jpg';
import event3Image from '../public/assets/911.jpeg';
import banner1 from '../public/assets/BANNER-DESPLEGABLE-1.png'
import banner2 from '../public/assets/banner-carnaval.png.png'

export const metadata = {
  title: "Home of Party",
  description: "Welcome to the best place to find the best parties and events.",
};

export default function Home() {
  return (
    <MainTemplate>
      <section className="banner">
        <div className="banner-images">
          <div className="banner-image">
            <Image src={banner1} alt="Evento 1" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
          <div className="banner-image">
            <Image src={banner2} alt="Evento 2" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
          <div className="banner-image">
            <Image src={event3Image} alt="Evento 3" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
        </div>
        <div className="banner-overlay">
          <h1>Explora los Mejores Eventos</h1>
          <p>Descubre las experiencias únicas que tenemos para ti</p>
          <button className="cta-button">Explorar Eventos</button>
        </div>
      </section>
      
      <section className="welcome">
        <h1>Bienvenido a FastParty</h1>
        <p>Explora nuestros eventos y todas las experiencias que puedes disfrutar.</p>
      </section>
      
      <section className="categories">
        <h2>Explora por Categorías</h2>
        <div className="category-cards">
          <div className="category-card">🎶 Música</div>
          <div className="category-card">🎭 Temáticas</div>
          <div className="category-card">💸 Descuentos</div>
        </div>
      </section>
      
      <section className="featured-events">
        <h2>Eventos Destacados</h2>
        <div className="event-cards">
          <div className="event-card">
            <Image src={invisibleImage} alt="Evento Especial" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
            <div className="event-info">
              <h3>Evento Especial</h3>
              <p>Descuento exclusivo para ti</p>
            </div>
          </div>
          <div className="event-card">
            <Image src={salvajeImage} alt="Noche de Salsa" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
            <div className="event-info">
              <h3>Noche de Salsa</h3>
              <p>Los mejores DJs de la ciudad</p>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
