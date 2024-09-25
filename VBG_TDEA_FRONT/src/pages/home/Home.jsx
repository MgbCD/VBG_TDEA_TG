
import React from 'react';
import useAuth from '../../hooks/useAuth'; 

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div>
      <h1>Bienvenido {user ? user.name : 'invitado'}</h1>
    </div>
  );
};

export default Home;
