'use client';

import React, { useEffect, useState } from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import './style.css';

interface Ticket {
  _id: string;
  eventTitle: string;
  price: number;
  qrCode: string; // URL o string del código QR
  status: string;
}

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Simular fetch de tickets (puedes reemplazarlo con una llamada real)
  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch('/api/user/tickets'); // Reemplaza con tu endpoint
      const data = await response.json();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  return (
    <MainTemplate>
      <section className="tickets-section">
        <h1 className="tickets-title">Your Tickets</h1>
        <div className="tickets-container">
          {tickets.length === 0 ? (
            <p className="no-tickets">You have no tickets yet. Join a party!</p>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket._id} className="ticket-card">
                <h2>{ticket.eventTitle}</h2>
                <p>Price: ${ticket.price}</p>
                <p>Status: {ticket.status}</p>
                <div className="qr-code">
                  {/* Asumiendo que el código QR es una imagen */}
                  <img src={ticket.qrCode} alt={`QR code for ${ticket.eventTitle}`} />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </MainTemplate>
  );
};

export default TicketsPage;