import React, { useState, useEffect } from 'react';
import { useAuth } from '../../src/contexts/authContext';

const UserInfo = () => {
  const { accessToken } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        const response = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setUserInfo(data);
      }
    };
    fetchUserInfo();
  }, [accessToken]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>Información del usuario</h2>
          <p>Nombre: {userInfo.displayName}</p>
          <p>Correo electrónico: {userInfo.mail}</p>
        </div>
      ) : (
        <button onClick={fetchUserInfo}>Fetch User Info</button>
      )}
    </div>
  );
};

export default UserInfo;