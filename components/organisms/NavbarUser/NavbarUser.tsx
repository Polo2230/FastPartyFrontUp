// Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import './NavbarUser.css';

export const NavbarUser = () => {
  return (
    <nav className="navbarUser">
      <div className="navbar-logo">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li><Link href="/compras">Mi Perfil</Link></li>
        <li><Link href="/places">Mis Compras</Link></li>
        <li><Link href="/experiences">Lugares</Link></li>
        <li><Link href="/events">Eventos</Link></li>
        <li><Link href="/contactus">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
