'use client';

import React, { useEffect, useState } from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Card from '@/components/molecules/Card';
import { fetchEvents, Event } from '@/app/services/Services'; 
import './style.css';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents(); 
        setEvents(data);
      } catch (err: any) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };
    getEvents(); 
  }, []);

  if (loading) {
    return <MainTemplate><p>Cargando eventos...</p></MainTemplate>;
  }

  if (error) {
    return <MainTemplate><p>Error: {error}</p></MainTemplate>;
  }

  return (
    <MainTemplate>
      <header>
        <h1>Próximos Eventos</h1>
      </header>
      <div className="events-grid">
        {events.map(event => {
          const minPrice = Math.min(...event.localities.map(locality => locality.price));
          const locationName = event.location?.name || 'Ubicación no especificada';

          return (
            <Card
              key={event._id}
              title={event.title}
              description={`${event.description} - Desde $${minPrice}`}
              // Uncomment the next line if the Card component supports imageUrl
              // imageUrl={event.imageUrl}
              link={`/events/${event._id}`}
              buttonText={`Ver en ${locationName}`}
            />
          );
        })}
      </div>
    </MainTemplate>
  );
};

export default EventsPage;
