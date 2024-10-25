import React from 'react';
import UserTemplate from '@/components/userTemplate/UserTemplate';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de haber instalado jwt-decode
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

export default function UserDashboard() {
  // Obtiene el token de las cookies
  const token = Cookies.get('token');

  let decodedToken: DecodedToken | null = null;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  return (
    <UserTemplate>
      <div className="dashboard">
        <h1>User Dashboard</h1>
        {decodedToken ? (
          <div>
            <h2>Bienvenido, {decodedToken.user.username}</h2>
            <p>Rol: {decodedToken.user.role}</p>
          </div>
        ) : (
          <p>No se pudo obtener la información del usuario</p>
        )}
      </div>
    </UserTemplate>
  );
}
