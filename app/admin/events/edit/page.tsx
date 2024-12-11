'use client';

import React, { useEffect, useState } from 'react';
import AdminTemplate from '@/components/adminTemplate/AdminTemplate';
import { fetchEvents, Event, deleteEvent } from '@/app/services/Services';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';
import { useRouter } from 'next/navigation';
import './style.css';

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await deleteEvent(eventId);
        setEvents(events.filter(event => event._id !== eventId));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <AdminTemplate><p>Cargando eventos...</p></AdminTemplate>;
  if (error) return <AdminTemplate><p>Error: {error}</p></AdminTemplate>;

  return (
    <AdminTemplate>
      <div className="manage-events">
        <h1>Gestionar Eventos</h1>
        <Button onClick={() => router.push('/admin/events/create')}>Crear Nuevo Evento</Button>
        <table className="events-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de Inicio</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{new Date(event.startDate).toLocaleDateString()}</td>
                <td>{event.location?.address}</td>
                <td>
                  <Button onClick={() => router.push(`/admin/events/edit/${event._id}`)}>Editar</Button>
                  <Button onClick={() => handleDelete(event._id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminTemplate>
  );
}

