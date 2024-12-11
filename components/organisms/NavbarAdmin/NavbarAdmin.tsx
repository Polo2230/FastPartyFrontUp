'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';  // Importar el botón
import './NavbarAdmin.css';

export const NavbarAdmin = () => {
  const [showPlacesSubmenu, setShowPlacesSubmenu] = useState(false);
  const [showEventsSubmenu, setShowEventsSubmenu] = useState(false); // Estado para el submenú de Eventos

  const togglePlacesSubmenu = () => {
    setShowPlacesSubmenu(!showPlacesSubmenu);
  };

  const toggleEventsSubmenu = () => {
    setShowEventsSubmenu(!showEventsSubmenu); // Cambia el estado del submenú de Eventos
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    window.location.href = '/login'; // Redirige a la página de login
  };

  return (
    <nav className="navbarAdmin">
      <div className="navbar-logo">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Button type="button" onClick={() => window.location.href = '/adminDashboard'}>Dashboard</Button>
        </li>
        <li>
          <Button type="button" onClick={togglePlacesSubmenu}>Lugares</Button>
          {showPlacesSubmenu && (
            <ul className="submenu">
              <li><Link href="/places/edit">Editar Lugares</Link></li>
              <li><Link href="/places/create">Crear Lugares</Link></li>
              <li><Link href="/places/delete">Eliminar Lugares</Link></li>
            </ul>
          )}
        </li>
        <li>
          <Button type="button" onClick={toggleEventsSubmenu}>Eventos</Button> {/* Añadido botón de Eventos */}
          {showEventsSubmenu && (
            <ul className="submenu">
              <li><Link href="/events/create">Crear Eventos</Link></li>
              <li><Link href="/events/edit">Editar Eventos</Link></li>
              <li><Link href="/events/delete">Eliminar Eventos</Link></li>
            </ul>
          )}
        </li>
        <li>
          <Button type="button" onClick={() => window.location.href = '/places'}>Experiencias</Button>
        </li>
        <li>
          <Button type="button" onClick={() => window.location.href = '/experiences'}>Contactos</Button>
        </li>
      </ul>
      {/* Botón de Logout */}
      <div className="navbar-logout">
        <Button type="button" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
