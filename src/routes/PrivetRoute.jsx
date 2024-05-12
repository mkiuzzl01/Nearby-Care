import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <h1 className='text-center'>Please wait...........</h1>
  }

  if (!user) {
      return <Navigate to='/LogIn' state={location.pathname}></Navigate>;
    }
    return children;
    
};

PrivetRoute.propTypes = {
    children:PropTypes.node,
};

export default PrivetRoute;