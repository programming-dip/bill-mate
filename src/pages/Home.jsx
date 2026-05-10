import React from 'react';
import Hero from '../components/Hero';
import Learning from '../components/Learning';

const Home = () => {
    return (
        <div className='text-primary'>
            <Hero></Hero>
            <Learning></Learning>
        </div>
    );
};

export default Home;