import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './styles.css';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const NavBar = () => {
  const { setTheme } = useContext(ThemeContext);
  const { productQuantity } = useContext(CartContext);
  return (
    <div className="navbar-container">
      <Link to={'/'}>
        <h1 className="logo">Logo</h1>
      </Link>
      <button
        onClick={() =>
          setTheme((valorActual) =>
            valorActual === 'light' ? 'dark' : 'light'
          )
        }
      >
        Cambia el tema
      </button>
      <nav>
        <ul className="list-container">
          <li>
            <NavLink
              activeclassname="active"
              to={'/category/electronics'}
              className="navbar-button"
            >
              Electronicos
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              to={'/category/jewelery'}
              className="navbar-button"
            >
              Joyería
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              to={"/category/men's-clothing"}
              className="navbar-button"
            >
              Ropa de hombre
            </NavLink>
          </li>
          <li>
            <NavLink
              activeclassname="active"
              to={"/category/women's-clothing"}
              className="navbar-button"
            >
              Ropa de mujer
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to={'/cart'}>
        <h3>Productos en el carrito: {productQuantity}</h3>
      </Link>
    </div>
  );
};

export default NavBar;
