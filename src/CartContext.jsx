import React, { createContext, useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);


    const addToCart = (product, quantity) => {
        if(quantity > 0) {
            const isItemInCart = cartItems.find((cartItem) => cartItem.id === product.id); // check if the item is already in the cart
            if (isItemInCart) {
                setCartItems((prevItems) =>
                    prevItems.map((cartItem) =>
                        cartItem.id === product.id
                            ? { ...cartItem, quantity: quantity + cartItem.quantity }
                            : cartItem
                    ) 
                );
                toast.success('Successfully updated cart!')  
            } else {
                setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
                toast.success('Successfully added to cart!');
            }
        } else {
            // if the quantity is 0
            if(cartItems.find((cartItem) => cartItem.id === product.id)) {
                toast.error('Quantity cannot be 0! Please remove the item from the cart if you want to remove it.');
            } else {
                setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== product.id));
                toast.success('Successfully removed from cart!');
            }
        }
    };


    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        
        if (isItemInCart) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)); 
            toast.success('Successfully removed from cart!');  
        }
    };

    const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // calculate the total price of the items in the cart
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};