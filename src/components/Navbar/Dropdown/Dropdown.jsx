import { useState } from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div data-testid={'dropdown'} className="dropdown">
      <button data-testid={'menuButton'} className="dropdown-btn" onClick={toggleDropdown}>
        Menu   <img src='dropdownIcon.png' alt=' '  width='10' height='5' />
      </button>

      {isOpen && (
        <div className="dropdown-container">
          {options.map((option, index) => (
            <a
              key={index}
              href={option.path}
              className={`${option.label}Button`}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dropdown;
