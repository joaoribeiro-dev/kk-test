// Header.js
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Início</NavLink></li>
        <li><NavLink to="/products">Produtos</NavLink></li>
        <li><NavLink to="/cart">Carrinho</NavLink></li>
      </ul>
    </nav>
  );
}

export default Header;