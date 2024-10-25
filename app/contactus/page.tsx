// page.tsx
import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import './style.css';

export const metadata = {
  title: "Contacto - FastParty",
  description: "Contáctanos para más información sobre FastParty.",
};

export default function ContactUs() {
  return (
    <MainTemplate>
      <div className="contact-us">
        <header>
          <h1>Contacto</h1>
        </header>
        <section className="contact-form">
          <form>
            <FormField label="Nombre" id="name" type="text" />
            <FormField label="Email" id="email" type="email" />
            <FormField label="Mensaje" id="message" type="text" />
            <Button type="submit">Enviar</Button>
          </form>
        </section>
      </div>
    </MainTemplate>
  );
}
