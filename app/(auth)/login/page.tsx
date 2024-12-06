'use client'; 

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/atoms/Button';
import './style.css';
import { MainTemplate } from '@/components';
import { loginUser } from '@/app/services/Services'; 
import { useRouter } from 'next/navigation'; 
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'; 

// Define el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string()
    .min(7, 'Email must be at least 7 characters long')
    .max(60, 'Email must be at most 60 characters long')
    .email('Invalid email format'),
  password: z.string()
    .min(7, 'Password must be at least 7 characters long')
    .max(60, 'Password must be at most 60 characters long'),
});

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

export default function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    console.log('Datos del formulario:', data);
    try {
      // Llama a la función de inicio de sesión
      const result = await loginUser(data.email, data.password);
      const { token } = result;
  
      if (token) {
        // Guarda el token en cookies
        Cookies.set('token', token, { expires: 1 }); // Guarda el token en cookies por 1 día
        console.log('Token guardado:', token);
        
        // Decodifica el token JWT
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log('Información del token decodificado:', decodedToken);

        // Obtén el rol del usuario del token decodificado
        const userRole = decodedToken.user?.role || 'user'; // Asigna 'user' si no existe el rol

        console.log('Rol del usuario:', userRole);
        
        // Redirige al usuario según su rol
        if (userRole === 'admin') {
          router.push('/adminDashboard');
        } else if (userRole === 'user') {
          router.push('/userDashboard');
        } else {
          router.push('/');
        }
      } else {
        console.error('Token no recibido');
      }
    } catch (error: any) {
      console.error('Error durante el login:', error.message);
    }
  };

  return (
    <MainTemplate>
      <section className="login">
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo de email */}
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="text" 
              {...register('email')} 
            />
            {errors.email && typeof errors.email.message === 'string' && <p>{errors.email.message}</p>}

            {/* Campo de contraseña */}
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              {...register('password')} 
            />
            {errors.password && typeof errors.password.message === 'string' && <p>{errors.password.message}</p>}

            {/* Botón de login */}
            <Button type="submit">Login</Button>
          </form>
        </section>
      </section>
    </MainTemplate>
  );
}
