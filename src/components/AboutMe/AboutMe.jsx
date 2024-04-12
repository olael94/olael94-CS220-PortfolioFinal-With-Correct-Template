import './AboutMe.css';
import PropTypes from 'prop-types';

const AboutMe = ({ name, content1,content2, content3, content4 }) => {
  return (
    <div data-testid="aboutme" className="about-me">
      <div>
        <h1 data-testid="aboutMeName">{name}</h1>
      </div>
      <div className="content">
        <p data-testid="aboutMeContent">{content1}</p>
        <p data-testid="aboutMeContent">{content2}</p>
        <p data-testid="aboutMeContent">{content3}</p>
        <p data-testid="aboutMeContent">{content4}</p>
      </div>
    </div>
  );
};

AboutMe.propTypes = {
  name: PropTypes.string.isRequired,
  content1: PropTypes.string.isRequired,
  content2: PropTypes.string.isRequired,
  content3: PropTypes.string.isRequired,
  content4: PropTypes.string.isRequired,
};

export default AboutMe;
