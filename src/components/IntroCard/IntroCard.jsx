'use client';

import { useState, useEffect } from 'react';
import './IntroCard.css';
import PropTypes from 'prop-types';

const IntroCard = ({ logo, name, content, link }) => {
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
        <img data-testid="introCardLogo" src={logoSrc} alt="Company name Logo" className="intro-card-logo" />
        <h1 data-testid="introCardName">{name}</h1>
      </div>
      <div className={'links'}>
        <p data-testid="introCardContent">{content}</p>
        <a data-testid="introCardLink" href={link} target="_blank" rel="noreferrer">
          <img src="linkedIn.png" alt="link"/>
        </a>
        <a data-testid="introCardLink" href={link} target="_blank" rel="noreferrer">
          <img src="github.png" alt="link"/>
        </a>
        <a data-testid="introCardLink" href={link} target="_blank" rel="noreferrer">
          <img src="x.png" alt="link"/>
        </a>
      </div>
    </div>
  );
};

IntroCard.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
};

IntroCard.defaultProps = {
  link: '#',
};

export default IntroCard;
