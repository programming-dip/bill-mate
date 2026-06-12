import React from 'react';
import LearningCard from './LearningCard';
import { useLoaderData } from 'react-router';
const Learning = () => {
    const learningData = useLoaderData();
    // console.log(learningData);
    return (
        <div
            className="bg-cover bg-center bg-repeat-space min-h-screen"
            style={{ backgroundImage: "url('/learning-bg.svg')" }}
        >
            <div className='pt-20 pb-20 max-w-[97%] mx-auto'>
                <p className='text-center dm-sans-semibold text-5xl text-white'>Learning <span className='text-primary'>Firebase</span> Authentication</p>
                <div className='pt-10 flex flex-col flex-wrap lg:flex-row gap-5 justify-center text-black'>
                    {
                        learningData.map(data=><LearningCard data={data} key={data.id}></LearningCard>)
                    }
                </div>

            </div>
        </div>
    );
};

export default Learning;