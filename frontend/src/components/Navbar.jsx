import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">BUSINESS</div>
      <ul className="navbar-links">
        <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
        <li><NavLink to="/location" className={({ isActive }) => isActive ? 'active' : ''}>Locate Us</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Log In</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
