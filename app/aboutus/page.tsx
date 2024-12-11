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
      <section className="about-us-header">
        <div className="header-content">
          <h1>Sobre Nosotros</h1>
          <p>Conectamos personas con momentos únicos. Descubre quiénes somos.</p>
        </div>
      </section>
      <section className="about-section about-intro">
        <div className="section-content">
          <div className="text">
            <h2>Nuestra Misión</h2>
            <p>
              En FastParty, trabajamos para simplificar la forma en que las personas compran boletos
              y disfrutan de los eventos. Nos esforzamos por ofrecer tecnología avanzada, una experiencia
              de usuario impecable y conectar a nuestros clientes con los mejores eventos.
            </p>
          </div>
          <Image
            src="/assets/fiesta.jpeg"
            alt="Introducción FastParty"
            width={600}
            height={400}
            className="image"
          />
        </div>
      </section>
      <section className="about-section about-values">
        <h2>Nuestros Valores</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Innovación</h3>
            <p>Estamos a la vanguardia de la tecnología para mejorar cada experiencia.</p>
          </div>
          <div className="value-card">
            <h3>Compromiso</h3>
            <p>Nuestro equipo trabaja incansablemente para cumplir nuestras promesas.</p>
          </div>
          <div className="value-card">
            <h3>Confianza</h3>
            <p>Garantizamos una plataforma segura y transparente para todos nuestros usuarios.</p>
          </div>
        </div>
      </section>
      <section className="about-section about-history">
        <div className="section-content">
          <Image
            src="/assets/logo.png"
            alt="Nuestra Historia"
            width={600}
            height={400}
            className="image"
          />
          <div className="text">
            <h2>Nuestra Historia</h2>
            <p>
              Fundada en 2024, FastParty nació para resolver las complicaciones en la venta de boletos.
              Lo que comenzó como una pequeña idea se convirtió en una plataforma líder, conectando
              a miles de personas con eventos extraordinarios.
            </p>
          </div>
        </div>
      </section>
      <section className="about-section about-vision">
        <h2>Nuestra Visión</h2>
        <p>
          Visualizamos un futuro donde todos puedan disfrutar de eventos sin barreras, con una experiencia
          de usuario impecable y tecnología de última generación. Queremos ser la referencia global en la industria de boletos.
        </p>
      </section>
    </MainTemplate>
  );
}
