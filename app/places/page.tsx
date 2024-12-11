'use client';

import React, { useEffect, useState } from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Image from 'next/image';
import { fetchPlaces, Place } from '@/app/services/Services';
import Link from 'next/link';
import './style.css';

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const data = await fetchPlaces();
        setPlaces(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPlaces();
  }, []);

  if (loading) {
    return <MainTemplate><p>Cargando lugares...</p></MainTemplate>;
  }

  if (error) {
    return <MainTemplate><p>Error: {error}</p></MainTemplate>;
  }

  return (
    <MainTemplate>
      <header>
        <h1>Lugares Disponibles</h1>
      </header>
      <div className="places-grid">
        {places.map((place) => (
          <div key={place._id} className="place-card">
            <div className="place-image">
              <Image 
                src={place.images[0] || '/placeholder.png'} 
                alt={place.name} 
                width={300} 
                height={200} 
                className="place-image-img" 
              />
            </div>

            <div className="place-info">
              <h2>{place.name}</h2>
              <p>{place.address}</p>
              <Link href={`/places/${place._id}`}>
                <button>Ver Detalles</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </MainTemplate>
  );
}
