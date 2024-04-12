'use client';

import './SocialLinks.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProjectCard = ({ socialLinks }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  if (!socialLinks || socialLinks.length === 0) {
    return <div>No social links available</div>;
  }

  return (
    <div data-testid="socialLinks-testid" className="socialLinks">
      <ul>
        {socialLinks.map((socialLink, index) => (
          <li key={index}>
            <a data-testid={`projectCardLink${index}`} href={socialLink.link} target="_blank" rel="noreferrer">
              <img src= {socialLink.imageSrc}  alt="link"/> Follow me on {socialLink.name}
            </a>
          </li>
        ))}
      </ul>
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
