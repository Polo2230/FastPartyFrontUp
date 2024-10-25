// Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-info">
          <p>&copy; 2023 Fastparty. Todos los derechos reservados.</p>
          <p><Link href="/aboutus">Sobre Nosotros</Link></p>
          <p><Link href="/contactus">Contacto</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
