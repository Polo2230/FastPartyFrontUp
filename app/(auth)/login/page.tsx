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
    try {
      const result = await loginUser(data.email, data.password);
      const { token } = result;
  
      if (token) {
        Cookies.set('token', token, { expires: 1 });
        const decodedToken: DecodedToken = jwtDecode(token);
        const userRole = decodedToken.user?.role || 'user';
        
        if (userRole === 'admin') {
          router.push('/adminDashboard');
        } else if (userRole === 'user') {
          router.push('/userDashboard');
        } else {
          router.push('/');
        }
      }
    } catch (error: any) {
      console.error('Error durante el login:', error.message);
    }
  };

  return (
    <MainTemplate>
      <div className="main">
        <div className="section">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input type="text" placeholder="Email" {...register('email')} />
            {errors.email && <p>{String(errors.email.message)}</p>}

            <input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <p>{String(errors.password.message)}</p>}

            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </MainTemplate>
  );
}
