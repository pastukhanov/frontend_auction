import React, { useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import ProviderContext from './shared/provider/providerContext';
import { getMethods } from './shared/provider/methods';

const PrivateRoute = ({ children }) => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(ProviderContext);

  const { whoami } = getMethods(dispatch);

  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch({ type: 'logout' });
      navigate('/login');
    };

    if (!state.isLoggedIn) {
      handleUnauthorized();
    }

    if (state.isLoggedIn) {
        whoami();
    }
    
  }, [state.isLoggedIn, dispatch, navigate]);

  return state.isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
