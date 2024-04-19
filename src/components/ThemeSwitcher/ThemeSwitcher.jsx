'use client';

import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';
import PropTypes from 'prop-types';

const ThemeSwitcher = ({ darkClassName }) => {
  // State to hold the selected theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference only on client-side
    if (typeof window !== 'undefined') {
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the selected theme by adding/removing a class to the body element
  const applyTheme = () => {
    if (isDarkMode) {
      document.body.classList.add(darkClassName);
    } else {
      document.body.classList.remove(darkClassName);
    }
  };

  useEffect(() => {
    // Apply theme after state update
    applyTheme();
  }, [isDarkMode]); // Run on change of isDarkMode

  return (
      <div className={isDarkMode ? 'dark' : ''}>
        <button data-testid="themeSwitcherButton" className={'btn'} onClick={toggleTheme}>
          <img src={isDarkMode ? "Moon.png" : "sunIcon.png"} alt="Sun Icon"/>
        </button>
      </div>
  );
};

ThemeSwitcher.propTypes = {
  darkClassName: PropTypes.string,
};

ThemeSwitcher.defaultProps = {
  darkClassName: 'dark',
};

export default ThemeSwitcher;