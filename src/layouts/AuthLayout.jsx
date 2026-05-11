import Footer from '@/components/Footer';
import { BackgroundBeams } from '@/components/ui/beams';
import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-black min-h-screen'>
        {/* Background layer */}
        <BackgroundBeams></BackgroundBeams>

        {/*Content Layer */}
            <div className='w-full mx-auto py-10'>
                <header className='text-center'>
                    <Link to="/" className="w-full mx-auto text-3xl font-semibold text-primary">BillMate</Link>
                </header>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;