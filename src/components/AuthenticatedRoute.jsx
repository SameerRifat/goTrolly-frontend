import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';
import Loader from './Loader';

const AuthenticatedRoute = ({ children}) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (loading) {
      return <Loader/>;
    }
    if(!isAuthenticated){
        return <Navigate to="/login"/>;
    }
    return children
};

export default AuthenticatedRoute;