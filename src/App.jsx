import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Header from './components/Header/Header.jsx'
import ProductList from './components/Product/ProductList.jsx'
import Cart from './components/Cart/Cart.jsx'
import Home from './components/Home/Home.jsx'
import NotFound from './components/NotFound/NotFound.jsx'

function App() {
  return (
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
  )
}

export default App
