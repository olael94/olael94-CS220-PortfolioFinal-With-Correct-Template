'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css'
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery from react-responsive

const Navbar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Adjust the breakpoint as needed
  const [showLinks, setShowLinks] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleMenu = () => {
    setShowLinks(!showLinks);
  };

    const handleLinkClick = (link) => {
        console.log("Clicked link:", link);
        setShowLinks(false); // Close the dropdown menu
        setActiveLink(link);
    };

    useEffect(() => {
        setShowLinks(false); // Close the dropdown menu when switching between mobile and normal views
    }, [isMobile]); // Trigger effect when isMobile changes

  return (
      <nav>
        <div className="navbar-container">
          {isMobile && (
              <div className="menu-toggle-container" onClick={toggleMenu}>
                  {/* Menu Icon using Unicode */}
                  &#9776;
              </div>
          )}
          {(isMobile && showLinks) || !isMobile ? (
              <ul className="menu-container">
                  <div className="menu-items">
                      <li>
                          <Link href="/" className={`nav-link-container ${activeLink === '/' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/')}>Home</Link>
                      </li>
                      <li>
                          <Link href="/about"
                                className={`nav-link-container ${activeLink === '/about' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/about')}>About</Link>
                      </li>
                      <li>
                          <Link href="/projects"
                                className={`nav-link-container ${activeLink === '/projects' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/projects')}>Projects</Link>
                      </li>
                      <li>
                          <Link href="/uses" className={`nav-link-container ${activeLink === '/uses' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/uses')}>Uses</Link>
                      </li>
                  </div>
              </ul>
          ) : null}
        </div>
      </nav>
  );
};

export default Navbar;
