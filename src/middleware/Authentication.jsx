import { Navigate  } from 'react-router-dom';



export const Authentication = ({ children }) => {
    const data = localStorage.access_token

  if (!data ) {
    return <Navigate to='/login' replace />;
  }
  return children;
};



export const UnAuthentication = ({ children }) => {
    const data = localStorage.access_token

  if (data ) {
    return <Navigate to='/enquirelist' replace />;
  }
  return children;
};
