import React from 'react';
import { useCart } from './CartContext';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.title} - {item.quantity}
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <Toaster />
        </div>
        
    );
};

export default Cart;