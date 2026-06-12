import Loading from '@/components/Loading';
import { AuthContext } from '@/contexts/AuthContext';
import PaymentProvider from '@/payment/PaymentProvider';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const urlPath = useLocation().pathname;
    const { loading } = useContext(AuthContext);
    
    if(loading) {
        return <Loading></Loading>
    }

    return user ? <PaymentProvider>{children}</PaymentProvider> : <Navigate state={urlPath} to="/auth/login"></Navigate>



};

export default PrivateRoute;