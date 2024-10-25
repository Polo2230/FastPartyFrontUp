// UserTemplate.tsx
'use client';

import React from 'react';
import Navbar from '@/components/organisms/NavbarUser';
import Footer from '@/components/organisms/Footer';
import './userTemplate.css';

interface UserTemplateProps {
  children: React.ReactNode;
}

const UserTemplate: React.FC<UserTemplateProps> = ({ children }) => {
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

export default UserTemplate;
