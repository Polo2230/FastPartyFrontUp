'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminTemplate from '@/components/adminTemplate/AdminTemplate';
import EventForm from '@/components/organisms/EventForm/EventForm';
import { createEvent, EventInput } from '@/app/services/Services';
import { toast } from 'react-hot-toast';
import './style.css';

export default function CreateEvent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (eventData: EventInput) => {
    setIsSubmitting(true);
    try {
      await createEvent(eventData);
      toast.success('Evento creado exitosamente');
      router.push('/admin/events');
    } catch (error) {
      console.error('Error al crear el evento:', error);
      if (error instanceof Error) {
        if (error.message === 'Unauthorized: Please log in again') {
          toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
          router.push('/login');
        } else if (error.message === 'API endpoint not found') {
          toast.error('No se pudo conectar al servidor. Intenta nuevamente más tarde.');
        } else {
          toast.error(error.message || 'No se pudo crear el evento');
        }
      } else {
        toast.error('Ocurrió un error inesperado');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminTemplate>
      <div className="create-event-container">
        <h1 className="create-event-title">Crear Nuevo Evento</h1>
        <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminTemplate>
  );
}
