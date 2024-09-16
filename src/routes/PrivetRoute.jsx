import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Utility/Loading';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
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