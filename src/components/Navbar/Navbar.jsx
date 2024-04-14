// eslint-disable-next-line no-unused-vars
'use client';

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import Dropdown from './Dropdown/Dropdown';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Navbar = ({ options }) => {
  const currentPath = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let checkIsMobile = () => {
      setIsMobile(document.documentElement.clientWidth <= 768);
    };

    checkIsMobile(); // Check initial mobile status

    // Add event listener for viewport width changes
    const handleResize = () => {
      checkIsMobile();
    };

    document.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run effect only once

  if (!options) {
    return null;
  }

  return (
    <nav className="navbar" data-testid="nav">
      {isMobile ? (
        <Dropdown options={options} />
      ) : (
        <ul data-testid="ul">
          {options.map((option, index) => (
            <li key={index} data-testid={`li${index}`}>
              <Link href={option.path} className={`link ${currentPath === option.path ? 'link-active' : ''}`} data-testid={`a${index}`}>
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
