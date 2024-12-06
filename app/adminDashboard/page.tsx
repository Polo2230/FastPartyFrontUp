'use client';

import React, { useEffect, useState } from 'react';
import AdminTemplate from '@/components/adminTemplate/AdminTemplate';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
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
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        {error ? (
          <p>{error}</p>
        ) : decodedToken ? (
          <div>
            <h2>Bienvenido, {decodedToken.user?.username}</h2>
            <p>Rol: {decodedToken.user?.role}</p>
            <div className="admin-actions">
              <Link href="/admin/events" className="admin-link">
                Gestionar Eventos
              </Link>
              <Link href="/admin/events/create" className="admin-link">
                Crear Nuevo Evento
              </Link>
            </div>
          </div>
        ) : (
          <p>Cargando información del usuario...</p>
        )}
      </div>
    </AdminTemplate>
  );
}

