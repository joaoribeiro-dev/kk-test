import { useState, useEffect } from 'react'
import './productCard.scss'

import { useCart } from './CartContext.jsx';
import Cart from './Cart.jsx';

function ProductCard() {
  const [quantities, setQuantities] = useState({});
  const [productsList, setProductsList] = useState([]);
  const { cartItems, addToCart } = useCart();
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then(response => response.json())
      .then(data => setProductsList(data));
  }, []);
  
  const incrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  console.log(cartItems)
  console.log(productsList);

  return (
    <>
      {productsList.map(product => (
        <div key={product.id} className="product-container">
          <div className="product-content">
            <img className="product-image" src={product.image}></img>
            <div className="product-description">
              <p className="product-title">{product.title}</p>
              <p>{product.price}€</p>
              <p className="product-quantity">Quantity: <span onClick={() => decrementQuantity(product.id)} className="quantity-btn-minus">-</span> {quantities[product.id] || 0} <span className="quantity-btn-plus" onClick={() => incrementQuantity(product.id)}>+</span></p>
            </div>
            <div className="product-actions">
              <button onClick={() => addToCart(product, quantities[product.id] || 0)} className="add-to-cart-btn">Add to cart</button>
            </div>
          </div>
        </div>
      ))}

    <Cart />
  </>
  )
}

export default ProductCard
