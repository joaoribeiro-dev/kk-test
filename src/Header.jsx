import { NavLink } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import './header.scss';

function Header() {
  return (
    <nav>
      <div id="header-container">
        <div className="header-links">
            <div className="header-link"><NavLink to="/">Home</NavLink></div>
            <div className="header-link"><NavLink to="/products">Products</NavLink></div>
        </div>
        <div className="header-link header-cart"><NavLink to="/cart">Cart ({useCart().getCartItemCount()})</NavLink></div>
      </div>
    </nav>
  );
}

export default Header;