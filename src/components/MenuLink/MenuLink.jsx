'use client';

import './MenuLink.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const MenuLink = ({ email, imageSrc, link }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);


  return (
    <div data-testid="menu-link" className="menu-link">
      <a data-testid={'menuLink'} href={link} target="_blank" rel="noreferrer">
        <img src={imageSrc} alt="link"/> {email}
      </a>
    </div>
  );
};

MenuLink.propTypes = {
    email: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    link: PropTypes.string,
};

MenuLink.defaultProps = {
  link: '#',
};

export default MenuLink;
