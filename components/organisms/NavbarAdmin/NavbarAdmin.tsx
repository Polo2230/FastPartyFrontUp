'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './NavbarAdmin.css';

export const NavbarAdmin = () => {
  const [showPlacesSubmenu, setShowPlacesSubmenu] = useState(false);

  const togglePlacesSubmenu = () => {
    setShowPlacesSubmenu(!showPlacesSubmenu);
  };

  return (
    <nav className="navbarAdmin">
      <div className="navbar-logo">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li><Link href="/admin-dashboard">Dashboard</Link></li>
        <li>
          <button className="menu-link" onClick={togglePlacesSubmenu}>
            Lugares
          </button>
          {showPlacesSubmenu && (
            <ul className="submenu">
              <li><Link href="/places/edit">Editar Lugares</Link></li>
              <li><Link href="/places/create">Crear Lugares</Link></li>
              <li><Link href="/places/delete">Eliminar Lugares</Link></li>
            </ul>
          )}
        </li>
        <li><Link href="/places">Experiencias</Link></li>
        <li><Link href="/experiences">Eventos</Link></li>
        <li><Link href="/events">Contactos</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
