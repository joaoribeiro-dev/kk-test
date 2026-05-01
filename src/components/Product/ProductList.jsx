import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../app.scss';
import './productCard.scss';
import { useCart } from '../../context/CartContext.jsx';
import Cart from '../Cart/Cart.jsx';
import Loading from '../Loading/Loading.jsx';


function ProductCard() {
  const [quantities, setQuantities] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://fakestoreapi.com/products?limit=15");

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setProductsList(data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError(err.message);
        setTimeout(() => {
          navigate('/404');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);
  
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

  return (
    <div id="app-container">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-container">
          <div className="error-content">
            <h2>Error loading products</h2>
            <p>{error}</p>
            <p>Redirecting to 404 page in 3 seconds...</p>
          </div>
        </div>
      ) : (
        <div className="products-grid">
          {productsList.map(product => (
            <div key={product.id} className="product-container">
              <div className="product-content">
                <img className="product-image" src={product.image}></img>
                <div className="product-description">
                  <p className="product-title">{product.title}</p>
                  <p className="product-price">{product.price}€</p>
                  <p className="product-quantity">
                    Quantity: <span onClick={() => decrementQuantity(product.id)} className="quantity-btn-minus">-</span> {quantities[product.id] || 0} <span className="quantity-btn-plus" onClick={() => incrementQuantity(product.id)}>+</span>
                  </p>
                </div>
                <div className="product-actions">
                  <button onClick={() => addToCart(product, quantities[product.id] || 0)} className="add-to-cart-btn">Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCard
