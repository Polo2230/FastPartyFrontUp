'use client';

import React from 'react';
import { useCart } from './CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './Cart.css';

const CartIcon = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();

  const handleClick = () => {
    router.push('/cart');
  };

  return (
    <div className="cart-icon" onClick={handleClick}>
      <Image src="/assets/cart.svg" alt="Carrito" width={24} height={24} />
      {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
    </div>
  );
};

export default CartIcon;
