import { Navigate  } from 'react-router-dom';



const Authentication = ({ children }) => {
    const data = localStorage.access_token

  if (!data ) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default Authentication;