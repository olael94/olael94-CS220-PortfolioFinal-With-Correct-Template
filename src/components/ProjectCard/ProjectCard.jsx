'use client';

import './ProjectCard.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProjectCard = ({ logo, name, content, link }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  return (
    <div data-testid="projectCard" className="project-card">
      <div>
        <div className="project-card-logo">
          <img data-testid="projectCardLogo" src={logo} alt="Company name Logo" />
        </div>
        <h2 data-testid="projectCardName">{name}</h2>
      </div>
      <div>
        <p data-testid="projectCardContent">{content}</p>
        <a data-testid="projectCardLink" href={link} target="_blank" rel="noreferrer">
          <img src={isDarkMode ? "LinkDark.png" : "Link.png"}  alt="link"/> View Project
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
};

ProjectCard.defaultProps = {
  link: '#',
};

export default ProjectCard;
