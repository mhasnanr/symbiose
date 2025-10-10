import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router';

export const AuthorizedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/auth/check', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.loggedIn))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export const UnauthorizedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/auth/check', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.loggedIn))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>...</div>;
  if (isAuthenticated) return <Navigate to="/" />;

  return children;
};
