import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'; // Import CSS Module

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/member" className={styles.title} end>Website</Link>
      <div className={styles.navLinks}>
        <ul>
          <li>
            <NavLink 
              to="/member/dashboard" 
              className={({ isActive }) => isActive ? styles.active : undefined}
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/member/request-book" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Request book
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/member/view-history" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              View history
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/logout" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
