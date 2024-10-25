// app/components/RegisterForm.tsx

'use client'; // Esta línea debe ser la primera en el archivo

import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Button from '@/components/atoms/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/app/services/eventsService'; // Asegúrate de que la ruta sea correcta
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user: {
    role: string;
    [key: string]: any;
  };
}
import './style.css';
import router from 'next/router';

// Define el esquema de validación con Zod
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long').max(60, 'Username must be at most 60 characters long'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(7, 'Password must be at least 7 characters long').max(60, 'Password must be at most 60 characters long'),
  role: z.string().default('user'),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data); // Puedes dejar esta línea para ver los datos en la consola

    try {
      const result = await registerUser(data.username, data.email, data.password, data.role);
      console.log('Usuario creado exitosamente:', result);

      // Asumimos que el registro devuelve el token también
      const { token } = result;
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode<DecodedToken>(token);
      localStorage.setItem('userData', JSON.stringify(decodedToken.user));

      // Redirigir dependiendo del rol
      const userRole = decodedToken.user.role;
      if (userRole === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/user-dashboard');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <MainTemplate>
      <div className="main">
        <div className="section"></div>
        <div className="section">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Username" {...register('username')} />
            {errors.username && <p>{String(errors.username.message)}</p>} {/* Mostrar el error */}

            <input type="text" placeholder="Email" {...register('email')} />
            {errors.email && <p>{String(errors.email.message)}</p>} {/* Mostrar el error */}

            <input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <p>{String(errors.password.message)}</p>} {/* Mostrar el error */}

            <input type="hidden" value="user" {...register('role')} /> {/* Campo oculto para el rol */}

            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
    </MainTemplate>
  );
}
