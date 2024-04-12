'use client';

import { useState, useEffect } from 'react';
import './IntroCard.css';
import PropTypes from 'prop-types';

const IntroCard = ({ logo, name, content, links }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logo);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
      setIsDarkMode(theme === 'dark');
    };

    window.addEventListener('DOMContentLoaded', checkTheme);
    window.addEventListener('classChange', checkTheme);

    return () => {
      window.removeEventListener('DOMContentLoaded', checkTheme);
      window.removeEventListener('classChange', checkTheme);
    };
  }, []);

  // Update logo source when theme changes
  useEffect(() => {
    setLogoSrc(isDarkMode ? `${logo}Dark` : logo);
  }, [isDarkMode, logo]);

  return (
      <div data-testid="introCard" className="intro-card">
        <div>
          <img data-testid="introCardLogo" src={logo} alt="Company name Logo" className="intro-card-logo" />
          <h1 data-testid="introCardName">{name}</h1>
        </div>
        <div className={'links'}>
          <p data-testid="introCardContent">{content}</p>
          {links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noreferrer">
                <img src={link.icon} alt={link.title} />
              </a>
          ))}
        </div>
      </div>
  );
};

IntroCard.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
  ).isRequired,
};

IntroCard.defaultProps = {
  link: '#',
};

export default IntroCard;
