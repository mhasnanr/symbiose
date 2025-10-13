import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router';

export const MemberRoute = ({ children }) => {
  const { id } = useParams();
  const [isMember, setIsMember] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/room/${id}/check`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setIsMember(data.isMember))
      .catch(() => setIsMember(false));
  }, [id]);

  if (isMember === null) return <></>;
  if (!isMember) return <Navigate to="/room" />;

  return children;
};

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

  if (isAuthenticated === null) return <></>;
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

  if (isAuthenticated === null) return <></>;
  if (isAuthenticated) return <Navigate to="/" />;

  return children;
};
