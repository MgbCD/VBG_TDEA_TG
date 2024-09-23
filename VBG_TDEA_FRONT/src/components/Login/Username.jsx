import React from 'react';
import { useAuth } from '../../contexts/authContext';

const Username = () => {
  const { user } = useAuth();
  return <div>Logged in as: {user.username}</div>;
};

export default Username;