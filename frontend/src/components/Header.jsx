import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/header/logo.png';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="left-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="center-header">
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li className="dropdown">
              <span>About</span>
              <ul className="dropdown-menu" onClick={closeMenu}>
                <li><Link to="/about/company">About Company</Link></li>
                {/* <li><Link to="/about/experts">Experts</Link></li> */}
                <li><Link to="/about/AgriStartup">AgriStartup</Link></li>
                {/* AgriStartup */}
              </ul>
            </li>
            <li><Link to="/Research_development" onClick={closeMenu}>R&D</Link></li>
            <li className="dropdown">
              <span>Services</span>
              <ul className="dropdown-menu" onClick={closeMenu}>
                <li><Link to="/infrastructure">Instrumentation</Link></li>
                {/* <li><Link to="/testing">Testing</Link></li> */}
                <li><Link to="/consultancy">Consultancy</Link></li>
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/training">Training</Link></li>
                <li><Link to ="/AnalyticalService">Analytical Service   </Link></li>
               
              </ul>
            </li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            <li><Link to="/certificate" onClick={closeMenu}>Certificate</Link></li>
          </ul>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
