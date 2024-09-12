import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'; // Import the CSS Module

function AdminNav() {
  return (
    <nav className={styles.nav}>
      <Link to="/admin" className={styles.title} end>Website</Link>
      <div className={styles.navLinks}>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? styles.active : undefined)}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-users" className={({ isActive }) => (isActive ? styles.active : undefined)}>Manage users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-books" className={({ isActive }) => (isActive ? styles.active : undefined)}>Manage books</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-authors" end className={({ isActive }) => (isActive ? styles.active : undefined)}>Manage authors</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-genres" className={({ isActive }) => (isActive ? styles.active : undefined)}>Manage genres</NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-publications" className={({ isActive }) => (isActive ? styles.active : undefined)}>Manage publications</NavLink>
          </li>
          <li>
            <NavLink to="/admin/book-requests" className={({ isActive }) => (isActive ? styles.active : undefined)}>Book requests</NavLink>
          </li>
          <li>
            <NavLink to="/admin/return-book" className={({ isActive }) => (isActive ? styles.active : undefined)}>Return books</NavLink>
          </li>
          <li>
            <NavLink to="/logout" className={({ isActive }) => (isActive ? styles.active : undefined)}>Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNav;
