import React from 'react';

const Home = () => {
    const { username } = useAuth(); 
    return (
      <div>
        <h1>Welcome, {username}!</h1>
      </div>
    );
  };

export default Home;
