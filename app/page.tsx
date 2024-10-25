// page.tsx
import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Image from 'next/image';
import './style.css';

import invisibleImage from '../public/assets/invisblevento.jpg';
import salvajeImage from '../public/assets/salvajevento.jpg';
import event3Image from '../public/assets/911.jpeg';

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
            <Image src={invisibleImage} alt="Evento 1" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
          <div className="banner-image">
            <Image src={salvajeImage} alt="Evento 2" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
          <div className="banner-image">
            <Image src={event3Image} alt="Evento 3" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
        </div>
      </section>
      <section className="welcome">
        <h1>Bienvenido a fastparty</h1>
        <p>Explora nuestros eventos y todas las experiencias que puedes disfrutar.</p>
      </section>
      <section className="info">
        <h2>Próximos Eventos y Descuentos</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Evento Especial en Discoteca 2150</h3>
            <p>¡No te pierdas nuestro evento especial con un 20% de descuento en entradas anticipadas!</p>
          </div>
          <div className="info-card">
            <h3>Noche de Salsa en Discoteca Salvaje</h3>
            <p>Ven a disfrutar de una noche de salsa con los mejores DJs y promociones en bebidas.</p>
          </div>
          <div className="info-card">
            <h3>Fiesta Temática en Discoteca Invisible</h3>
            <p>Únete a nuestra fiesta temática y disfruta de una experiencia única con tus amigos.</p>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
