import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/header/logo.png';

// A new component for an animated hamburger icon
const HamburgerIcon = ({ isOpen, ...props }) => (
  <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} {...props}>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

// A new component for dropdown arrows
const DropdownArrow = () => (
    <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <>
      <header className={`main-header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
        <nav className="header-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Exilieen Logo" className="logo" />
          </Link>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <span tabIndex="0">About <DropdownArrow /></span>
              <ul className="dropdown-menu">
                <li><Link to="/about/company">About Company</Link></li>
                <li><Link to="/about/AgriStartup">AgriStartup</Link></li>
              </ul>
            </li>
            <li><Link to="/Research_development">R&D</Link></li>
            <li className="dropdown">
              <span tabIndex="0">Services <DropdownArrow /></span>
              <ul className="dropdown-menu">
                <li><Link to="/infrastructure">Instrumentation</Link></li>
                <li><Link to="/consultancy">Consultancy</Link></li>
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/training">Training</Link></li>
                <li><Link to="/AnalyticalService">Analytical Service</Link></li>
              </ul>
            </li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/certificate">Certificate</Link></li>
          </ul>

          <HamburgerIcon isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </nav>
      </header>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};

export default Header;
