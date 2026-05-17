import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const urlPath = useLocation().pathname;
    console.log(urlPath);
    
    return user? children : <Navigate state={urlPath} to="/auth/login"></Navigate> 
  


};

export default PrivateRoute;