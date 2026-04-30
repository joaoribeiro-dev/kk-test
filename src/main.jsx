import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductList from './ProductList.jsx'
import Header from './Header.jsx'
import { CartProvider } from './CartContext.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Cart.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';

    
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <CartProvider>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  </StrictMode>,
)
