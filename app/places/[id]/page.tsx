'use client';

import React, { useEffect, useState } from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchPlaces, Place } from '@/app/services/Services';
import './style.css';

export default function PlaceDetails({ params }: { params: { id: string } }) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const places = await fetchPlaces();
        const selectedPlace = places.find((p) => p._id === params.id);
        if (!selectedPlace) {
          setError('Lugar no encontrado');
        } else {
          setPlace(selectedPlace);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPlace();
  }, [params.id]);

  if (loading) {
    return <MainTemplate><p>Cargando detalles del lugar...</p></MainTemplate>;
  }

  if (error) {
    return (
      <MainTemplate>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/places')}>Volver a lugares</button>
      </MainTemplate>
    );
  }

  if (!place) {
    return <MainTemplate><p>Lugar no encontrado.</p></MainTemplate>;
  }

  return (
    <MainTemplate>
      <header>
        <h1>{place.name}</h1>
      </header>
      <div className="place-details">
        <Image 
          src={place.images[0] || '/placeholder.png'} 
          alt={place.name} 
          width={600} 
          height={400} 
          style={{ objectFit: 'cover', borderRadius: '10px' }} 
        />
        <p><strong>Dirección:</strong> {place.address}</p>
        <p><strong>Capacidad:</strong> {place.capacity}</p>
        <p><strong>Descripción:</strong> {place.description}</p>
      </div>
    </MainTemplate>
  );
}
