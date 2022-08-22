import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styling/Navbar.css';

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <img className="logo-img" src={logo} alt="logo" />
          <p className="logo-text">
            Space Traveler&apos;s Hub
          </p>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Rockets</NavLink>
          </li>
          <li>
            <NavLink to="/missions">Missions</NavLink>
          </li>
          <li>
            <NavLink to="/profile">My profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
