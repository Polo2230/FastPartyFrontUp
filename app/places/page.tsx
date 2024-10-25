// page.tsx
import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import Image from 'next/image';
import './style.css';

import image911 from '../../public/assets/911.jpeg';
import image2150 from '../../public/assets/2150.jpeg';
import imageInvisible from '../../public/assets/invisible.jpeg';
import imageOnFire from '../../public/assets/onfire.png';
import imageSafari from '../../public/assets/safari.jpeg';
import imageSalvaje from '../../public/assets/salvaje.jpeg';

export const metadata = {
  title: "This is our nightclubs",
  description: "This is the best nightclubs in Manizales for the moment",
};

export default function Places() {
  const places = [
    { id: 1, name: '911', image: image911, location: 'Av. Central, Ciudad' },
    { id: 2, name: '2150', image: image2150, location: 'Calle 10, Ciudad' },
    { id: 3, name: 'Invisible', image: imageInvisible, location: 'Costa Azul, Ciudad' },
    { id: 4, name: 'On fire', image: imageOnFire, location: 'Plaza Mayor, Ciudad' },
    { id: 5, name: 'Safari', image: imageSafari, location: 'Av. Verde, Ciudad' },
    { id: 6, name: 'Salvaje', image: imageSalvaje, location: 'Av. Comercio, Ciudad' },
  ];

  return (
    <MainTemplate>
      <header>
        <h1>Información sobre Lugares</h1>
      </header>
      <div className="places-grid">
        {places.map(place => (
          <div key={place.id} className="place-card">
            <div className="place-image">
              <Image src={place.image} alt={place.name} fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
            </div>
            <div className="place-info">
              <h2>{place.name}</h2>
              <p>{place.location}</p>
            </div>
          </div>
        ))}
      </div>
    </MainTemplate>
  );
}
