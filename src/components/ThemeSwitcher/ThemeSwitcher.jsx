'use client';

import React, { useEffect, useMemo, useState } from 'react';
import './ThemeSwitcher.css';
import PropTypes from 'prop-types';

const ThemeSwitcher = ({ darkClassName }) => {
  // Check the user's preferred color scheme
  const prefersDarkMode = useMemo(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // State to hold the selected theme
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  // Apply the selected theme (dark or light) when the component mounts
  useEffect(() => {
    applyTheme();
  });

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

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <button data-testid="themeSwitcherButton" className={'btn'} onClick={toggleTheme}>
        <img src="sunIcon.png" alt="Sun Icon"/>
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
