'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import { useCart } from '@/components/organisms/Cart/CartContext';
import { fetchEventById, Event, Locality } from '@/app/services/Services';
import './style.css';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const getEvent = async () => {
      try {
        if (typeof id === 'string' && id) {
          const data = await fetchEventById(id);
          setEvent(data);
          setQuantities(
            Object.fromEntries(data.localities.map((locality) => [locality.name, 1]))
          );
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

  const handleQuantityChange = (localityName: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantities((prev) => ({ ...prev, [localityName]: newQuantity }));
    }
  };

  const handleAddToCart = (locality: Locality) => {
    addToCart({
      id: `${id}-${locality.name}`,
      name: `${event?.title} - ${locality.name}`,
      price: locality.price,
      quantity: quantities[locality.name],
    });
  };

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
        <section className="event-info">
          <p><strong>Descripción:</strong> {event.description}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(event.startDate).toLocaleString()}</p>
          <p><strong>Fecha de Finalización:</strong> {new Date(event.endDate).toLocaleString()}</p>
          <p><strong>Ubicación:</strong> {event.location?.name || 'Ubicación no especificada'}</p>
          <p><strong>Localidades Disponibles:</strong></p>
          <div className="localities">
            {event.localities.map((locality: Locality) => (
              <div key={locality.name} className="locality">
                <p><strong>Nombre:</strong> {locality.name}</p>
                <p><strong>Precio:</strong> ${locality.price}</p>
                <p>
                  <strong>Cantidad:</strong>
                  <input
                    type="number"
                    min="1"
                    value={quantities[locality.name]}
                    onChange={(e) =>
                      handleQuantityChange(locality.name, parseInt(e.target.value, 10))
                    }
                  />
                </p>
                <button onClick={() => handleAddToCart(locality)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainTemplate>
  );
};

export default EventDetailsPage;
