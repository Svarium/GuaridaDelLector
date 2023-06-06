import React from "react";
import logo from '../assets/book.png'
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div className="sidebar-brand-icon">
          <img
            className="w-50 mt-3"
            src={logo}
            alt="Guarida del Lector"
          />
        </div>
      </Link>

      <hr className="sidebar-divider my-0 mt-4" />

      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Guarida del Lector</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Navegación</div>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/">
          <i className="fas fa-fw fa-folder"></i>
          <span>Home</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/books">
          <i className="fas fa-fw fa-folder"></i>
          <span>Libros</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/users">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Usuarios</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="http://localhost:3000/">
        <i class="fas fa-home"></i>
          <span>Inicio</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};
