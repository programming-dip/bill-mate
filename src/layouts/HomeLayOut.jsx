import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';

const HomeLayOut = () => {
    const { loading } = useContext(AuthContext);
    return (
        loading? <Loading></Loading> :
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default HomeLayOut;