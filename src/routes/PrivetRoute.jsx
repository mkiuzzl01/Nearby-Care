import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center"><span className="loading loading-dots loading-lg"></span></div>
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