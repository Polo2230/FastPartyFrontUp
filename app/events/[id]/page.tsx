'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import { fetchEventById, Event } from '@/app/services/eventsService';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import './style.css';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        if (typeof id === 'string' && id) {
          const data = await fetchEventById(id);
          setEvent(data);
        } else {
          throw new Error('Invalid event ID');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getEvent();
    }
  }, [id]);

  if (loading) {
    return <MainTemplate><p>Cargando evento...</p></MainTemplate>;
  }

  if (error) {
    return <MainTemplate><p>Error: {error}</p></MainTemplate>;
  }

  if (!event) {
    return <MainTemplate><p>No se encontró el evento.</p></MainTemplate>;
  }

  return (
    <MainTemplate>
      <div className="event-details">
        <header>
          <h1>{event.title}</h1>
        </header>
        <div className="event-image">
           {/* <Image src={event.imageUrl} alt={event.title} fill style={{ objectFit: 'cover', borderRadius: '10px' }} /> */}
        </div>
        <section className="event-info">
          <p><strong>Descripción:</strong> {event.description}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(event.startDate).toLocaleString()}</p>
          <p><strong>Fecha de Finalización:</strong> {new Date(event.endDate).toLocaleString()}</p>
          <p><strong>Ubicación:</strong> {event.location}</p>
          <p><strong>Capacidad:</strong> {event.capacity}</p>
          <p><strong>Precio:</strong> ${event.price}</p>
          <Link href="/events">
            <Button>Volver a Eventos</Button>
          </Link>
        </section>
      </div>
    </MainTemplate>
  );
};

export default EventDetailsPage;
