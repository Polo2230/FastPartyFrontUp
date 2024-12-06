'use client';

import React, { useEffect, useState } from 'react';
import AdminTemplate from '@/components/adminTemplate/AdminTemplate';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import './style.css';

interface DecodedToken {
  user: {
    id: string;
    role: string;
    username: string;
    email: string;
    customerProfile: {
      _id: string;
      fullname: string;
      email: string;
      phone: string;
      identification: string;
      birthday: string;
      discountEligibility: boolean;
      registrationDate: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
  iat: number;
  exp: number;
}

export default function AdminDashboard() {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecodedToken(decoded);
        console.log('Token decodificado:', decoded);
      } catch (err) {
        console.error('Error decoding token:', err);
        setError('Error decoding token.');
      }
    } else {
      setError('No valid token found.');
      router.push('/auth/login');
    }
  }, [router]);

  if (error) {
    return <AdminTemplate><p>{error}</p></AdminTemplate>;
  }

  if (!decodedToken) {
    return <AdminTemplate><p>Loading user information...</p></AdminTemplate>;
  }

  return (
    <AdminTemplate>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <h2>Welcome, {decodedToken.user.username}</h2>
        <p>Role: {decodedToken.user.role}</p>
        <div className="admin-info">
          <h3>User Information</h3>
          <p>Full Name: {decodedToken.user.customerProfile.fullname}</p>
          <p>Email: {decodedToken.user.email}</p>
          <p>Phone: {decodedToken.user.customerProfile.phone}</p>
          <p>Identification: {decodedToken.user.customerProfile.identification}</p>
          <p>Birthday: {new Date(decodedToken.user.customerProfile.birthday).toLocaleDateString()}</p>
          <p>Discount Eligibility: {decodedToken.user.customerProfile.discountEligibility ? 'Yes' : 'No'}</p>
          <p>Registration Date: {new Date(decodedToken.user.customerProfile.registrationDate).toLocaleString()}</p>
        </div>
        <div className="admin-actions">
          <Link href="/admin/events">
            <span className="admin-link">Manage Events</span>
          </Link>
          <Link href="/admin/events/create">
            <span className="admin-link">Create New Event</span>
          </Link>
        </div>
      </div>
    </AdminTemplate>
  );
}

