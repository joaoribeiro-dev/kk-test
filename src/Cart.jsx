import React from 'react';
import { useCart } from './CartContext';
import { NavLink } from 'react-router-dom';
import './cart.scss';

const Cart = () => {
    const { cartItems, removeFromCart, getCartTotal } = useCart();

    return (
        <div id="cart-container">
            <h2 className="cart-title">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="cart-empty-container">
                    <p className="cart-empty">Your cart is empty.</p>
                    <NavLink className="continue-shopping-btn" to="/products">Continue Shopping</NavLink>
                </div>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                <p className="cart-item-price">Price: {item.price.toFixed(2)} €</p>
                                <p className="cart-item-subtotal">Subtotal: {(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                            <button className="cart-item-remove" onClick={() => removeFromCart(item)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="cart-total-container">
                        <p className="cart-total"> The total of cart is: {getCartTotal().toFixed(2)} €</p>
                        <button className="checkout-btn">Checkout</button>
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default Cart;