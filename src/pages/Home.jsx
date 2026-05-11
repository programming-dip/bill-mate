import React from 'react';
import Hero from '../components/Hero';
import Learning from '../components/Learning';
import SupportedServices from '@/components/SupportedServices';

const Home = () => {
    return (
        <div className='text-primary'>
            <Hero></Hero>
            <Learning></Learning>
            <SupportedServices></SupportedServices>
        </div>
    );
};

export default Home;