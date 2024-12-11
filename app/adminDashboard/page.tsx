'use client';

import React, { useEffect, useState } from 'react';
import AdminTemplate from '@/components/adminTemplate/AdminTemplate';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './style.css';

interface DecodedToken {
  user: {
    id: string;
    role: string;
    username: string;
    email: string;
  };
  iat: number;
  exp: number;
}

export default function AdminDashboard() {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecodedToken(decoded);
      } catch (err) {
        console.error('Error al decodificar el token:', err);
        setError('Error al decodificar el token.');
      }
    } else {
      setError('No se encontró un token válido.');
    }
  }, []);

  return (
    <AdminTemplate>
      <h1>Admin Dashboard</h1>
      {error ? (
        <p>{error}</p>
      ) : decodedToken ? (
        <div>
          <h2>Bienvenido, {decodedToken.user?.username}</h2>
          <p>Rol: {decodedToken.user?.role}</p>
          <div className="admin-actions">
            <div className="card">
              <h3>Gestionar Eventos</h3>
              <p>Accede a todos los eventos para editarlos o eliminarlos.</p>
              <a href="/admin/events/edit" className="admin-link">Gestionar</a>
            </div>
            <div className="card">
              <h3>Crear Nuevo Evento</h3>
              <p>Agrega nuevos eventos a la plataforma.</p>
              <a href="/admin/events/create" className="admin-link">Crear</a>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </AdminTemplate>
  );
}
