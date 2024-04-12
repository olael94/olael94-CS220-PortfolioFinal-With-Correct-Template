'use client';

import './MenuLink.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProjectCard = ({ email, imageSrc, link }) => {
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

ProjectCard.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
    })
  ),
};

ProjectCard.defaultProps = {
  link: '#',
};

export default ProjectCard;
