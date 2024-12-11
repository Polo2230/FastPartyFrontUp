'use client';

import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.quantity} x ${item.price}</span>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="cart-actions">
          <button onClick={clearCart}>Vaciar Carrito</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
