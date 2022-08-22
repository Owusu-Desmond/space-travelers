import React from 'react';
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
          <li>Rockets</li>
          <li>Missions</li>
          <li>My Profile</li>
        </ul>
      </nav>
    </header>
  );
}
