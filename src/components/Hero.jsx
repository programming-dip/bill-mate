import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
    return (
        <div>
            <div className="hero min-h-screen w-11/12 mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse w-full justify-around">
                    <DotLottieReact
                        src="/hero.lottie"
                        loop
                        autoplay
                        className="max-w-2xl md:w-2xl -mx-15"
                    />
                    <div>
                        <div>
                            <h1 className="text-5xl w-96 dm-sans-bold">Your <span className='text-black'><Typewriter words={['money.','bills.','way.']} loop={0}></Typewriter></span></h1>
                            

                            <p className="py-6 max-w-60 text-black">
                                Simplify your finances and take
                                action with confidence.
                            </p>
                        </div>
                        <Link className="px-10 py-6 btn btn-primary btn-outline text-lg">Bills</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;