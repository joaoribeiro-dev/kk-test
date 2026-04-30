import React from 'react';
import { Link } from 'react-router-dom';
import './404.scss';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Error Page!</h2>
        <p className="error-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="home-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;