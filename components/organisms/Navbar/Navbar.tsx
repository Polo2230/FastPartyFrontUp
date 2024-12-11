'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
import Button from '@/components/atoms/Button';
import CartIcon from '@/components/organisms/Cart/CartIcon';

export const Navbar = () => {
  // Estado para manejar el menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Botón del menú */}
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>

      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link href="/aboutus">Sobre Nosotros</Link></li>
        <li><Link href="/places">Lugares</Link></li>
        <li><Link href="/experiences">Experiencias</Link></li>
        <li><Link href="/events">Eventos</Link></li>
        <li><Link href="/contactus">Contacto</Link></li>
      </ul>

      <div className="navbar-right">
        <CartIcon />
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
