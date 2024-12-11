'use client';

import React from 'react';
import Navbar from '@/components/organisms/NavbarAdmin';
import Footer from '@/components/organisms/Footer';
import './AdminTemplate.css';

interface AdminTemplateProps {
  children: React.ReactNode;
}

const AdminTemplate: React.FC<AdminTemplateProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <aside className="sidebar">
          <a href="/adminDashboard">Dashboard</a>
          <a href="/admin/events/edit">Gestionar Eventos</a>
          <a href="/admin/events/create">Crear Nuevo Evento</a>
          <a href="/admin/settings">Configuraciones</a>
          <a href="/logout">Cerrar Sesión</a>
        </aside>
        <main className="dashboard">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AdminTemplate;
