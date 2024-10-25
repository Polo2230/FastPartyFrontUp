// Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import './Navbar.css';
import Button from '@/components/atoms/Button';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li><Link href="/aboutus">Sobre Nosotros</Link></li>
        <li><Link href="/places">Lugares</Link></li>
        <li><Link href="/experiences">Experiencias</Link></li>
        <li><Link href="/events">Eventos</Link></li>
        <li><Link href="/contactus">Contacto</Link></li>
      </ul>
      <div className="navbar-login">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
