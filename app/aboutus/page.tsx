// page.tsx
import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Image from 'next/image';
import './style.css';

export const metadata = {
  title: "Sobre Nosotros - FastParty",
  description: "Conoce más sobre FastParty, la mejor plataforma de venta de boletos en línea.",
};

export default function AboutUs() {
  return (
    <MainTemplate>
      <div className="about-us">
        <header>
          <h1>Sobre FastParty</h1>
        </header>
        <section className="intro">
          <div className="intro-image">
            <Image src="/assets/fiesta.jpeg" alt="Fiesta" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
          </div>
          <div className="intro-text">
            <p>
              FastParty es la plataforma líder en venta de boletos en línea, proporcionando experiencias de compra de boletos eficientes y sin complicaciones para eventos de todos los tamaños. Nuestra misión es hacer que la compra de boletos para eventos sea fácil y accesible para todos.
            </p>
          </div>
        </section>
        <section className="history">
          <h2>Nuestra Historia</h2>
          <p>
            FastParty fue fundada en 2024 por un grupo de entusiastas de eventos que vieron la necesidad de una mejor solución de venta de boletos. Nuestro viaje comenzó con una idea simple: crear una plataforma que simplifique el proceso de compra de boletos y mejore la experiencia general del evento.
          </p>
          <p>
            Desde nuestra fundación, hemos crecido rápidamente, gracias a nuestro equipo dedicado y a nuestros clientes leales. Estamos orgullosos de haber ayudado a miles de organizadores de eventos y asistentes a conectarse a través de nuestra plataforma.
          </p>
        </section>
        <section className="vision">
          <h2>Nuestra Visión</h2>
          <p>
            En FastParty, imaginamos un mundo donde asistir a eventos sea sin complicaciones y agradable. Estamos comprometidos con la innovación continua y la mejora, asegurando que nuestra plataforma se mantenga a la vanguardia de la industria de venta de boletos.
          </p>
        </section>
      </div>
    </MainTemplate>
  );
}
