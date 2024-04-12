import './Usescard.css';
import PropTypes from 'prop-types';

const Usescard = ({ name, content1,content2, content3, content4 }) => {
  return (
    <div data-testid="Usescard" className="uses-card">
      <div>
        <h1 data-testid="UsescardName">{name}</h1>
      </div>
      <div className="content">
        <p data-testid="UsescardContent">{content1}</p>
        <p data-testid="UsescardContent">{content2}</p>
        <p data-testid="UsescardContent">{content3}</p>
        <p data-testid="UsescardContent">{content4}</p>
      </div>
    </div>
  );
};

Usescard.propTypes = {
  name: PropTypes.string.isRequired,
  content1: PropTypes.string.isRequired,
  content2: PropTypes.string.isRequired,
  content3: PropTypes.string.isRequired,
  content4: PropTypes.string.isRequired,
};

export default Usescard;
