import React, { createContext, useContext, useState } from 'react';

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
                            ? { ...cartItem, quantity: quantity }
                            : cartItem
                    )
                );
            } else {
                setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
            }
        } else {
            setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== product.id));
        }
    };


    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (isItemInCart) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};