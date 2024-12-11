'use client';

import React from 'react';
import MainTemplate from '@/components/mainTemplate/MainTemplate';
import { useCart } from '@/components/organisms/Cart/CartContext';
import { purchaseTickets, TicketInput } from '@/app/services/Services';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import './style.css';

interface DecodedToken {
  user: {
    customerProfile: {
      _id: string;
    };
  };
}

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const generatePDF = (tickets: any[]) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Confirmación de Compra', 20, 20);
    doc.setFontSize(12);
    doc.text('Gracias por tu compra. Aquí tienes los detalles:', 20, 30);

    tickets.forEach((ticket, index) => {
      const yPosition = 40 + index * 40; // Se incrementa el espacio para acomodar el QR
      doc.text(
        `Evento: ${ticket.eventId.title}, Localidad: ${ticket.localityName}, Precio: $${ticket.price}, Cantidad: ${ticket.quantity}`,
        20,
        yPosition
      );

      // Agregar el QR al PDF
      const imgData = ticket.qrCode; // El código QR en base64
      const qrSize = 30; // Tamaño del código QR
      doc.addImage(imgData, 'PNG', 20, yPosition + 10, qrSize, qrSize); // Ajuste de posición y tamaño

      doc.text('¡Disfruta del evento!', 20, yPosition + qrSize + 20);
    });

    doc.save('boletos.pdf'); // Descarga el archivo como 'boletos.pdf'
  };

  const handleCheckout = async () => {
    try {
      // Obtener el token y decodificarlo
      const token = Cookies.get('token');
      if (!token) {
        alert('No se encontró un token de autenticación.');
        return;
      }

      const decodedToken: DecodedToken = jwtDecode(token);
      const customerId = decodedToken.user.customerProfile._id;

      // Preparar los datos para la compra
      const tickets: TicketInput[] = cart.map((item) => ({
        eventId: item.id.split('-')[0], // Extraer el `eventId` desde el `id` del carrito
        localityName: item.name.split(' - ')[1], // Extraer la localidad desde el nombre
        price: item.price,
        quantity: item.quantity,
      }));

      // Llamar al servicio para crear los tickets y recibir la respuesta
      const response = await purchaseTickets(customerId, tickets);

      // Verificar que la respuesta contiene los datos de los tickets
      if (response && response.tickets) {
        alert('Compra exitosa. Tus boletos han sido generados.');

        // Generar el PDF con los detalles de los boletos y los códigos QR
        generatePDF(response.tickets);
      } else {
        alert('Hubo un problema al generar los boletos.');
      }

      // Vaciar el carrito después del pago
      clearCart();
    } catch (error: any) {
      console.error('Error al realizar el pago:', error);
      alert(error.message || 'Hubo un error al procesar el pago.');
    }
  };

  return (
    <MainTemplate>
      <div className="cart-container">
        <h2>Tu Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x ${item.price}
                  </span>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className="cart-actions">
              <button onClick={clearCart}>Vaciar Carrito</button>
              <button onClick={handleCheckout}>Proceder al Pago</button>
            </div>
          </>
        )}
      </div>
    </MainTemplate>
  );
};

export default CartPage;
