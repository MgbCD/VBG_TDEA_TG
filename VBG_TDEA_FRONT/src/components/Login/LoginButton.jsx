import React from 'react';
import { useAuth } from '../../contexts/authContext';

const LoginButton = ({ onLogin }) => {
  const { login } = useAuth();

  const handleClick = async () => {
    if (onLogin) onLogin(); // Call the passed onLogin function if provided
    await login(); // Perform login logic from the context
  };


  return (
    <button
      onClick={handleClick}
      className="LoginButton"
      id="ingresar"
      data-sitekey="6LeAmogUAAAAABXlzsP-0FDpldmXUzmGrsVTSErT"
      data-callback="encryption"
      type="submit"
    >
      Iniciar sesión
    </button>
  );
};

export default LoginButton;