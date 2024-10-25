// MainTemplate.tsx
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
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AdminTemplate;
