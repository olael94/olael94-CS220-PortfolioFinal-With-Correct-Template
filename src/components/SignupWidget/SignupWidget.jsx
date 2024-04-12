'use client';

import './SignupWidget.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SignupWidget = ({ title, content, simulateNetworkRequestTime }) => {
  // State to manage the email input and messages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    try {
      setBusy(true);
      // Wait 2 seconds (simulating a network request)
      await new Promise((resolve) => setTimeout(resolve, simulateNetworkRequestTime));
      setMessage(`Thanks for subscribing, ${email}!`);
      setIsSubscribed(true);
    } finally {
      setBusy(false);
    }
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <form data-testid={'signupWidget'} className={'signup-widget'} onSubmit={handleSubmit} autoComplete={'false'}>
      <h2 data-testid={'signupWidgetTitle'}>{title}</h2>
      {isSubscribed && (
        <p data-testid={'signupWidgetMessage'} className={'message'}>
          {message}
        </p>
      )}
      {!isSubscribed && (
        <>
          <p data-testid={'signupWidgetContent'}>{content}</p>
          <div className={'input-row'}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Enter your email"
              disabled={busy || isSubscribed}
              data-testid={'signupWidgetInput'}
              required
            />
            <button type="submit" data-testid={'signupWidgetButton'} disabled={busy || isSubscribed}>
              {busy ? 'Joining' : 'Join'}
            </button>
          </div>
          {errorMessage && <p className={'error-message'}>{errorMessage}</p>}
        </>
      )}
    </form>
  );
};

SignupWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  simulateNetworkRequestTime: PropTypes.number.isRequired,
};

SignupWidget.defaultProps = {};

export default SignupWidget;
