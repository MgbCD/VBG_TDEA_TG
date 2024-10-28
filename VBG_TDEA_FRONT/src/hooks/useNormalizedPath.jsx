
import { useLocation } from 'react-router-dom';

const useNormalizedPath = () => {
  const location = useLocation();
  

  const normalizedPath = location.pathname; 

  return normalizedPath;
};

export default useNormalizedPath;
