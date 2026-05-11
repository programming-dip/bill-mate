import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import ServiceCard from './ServiceCard';


const SupportedServices = () => {
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/services.json")
            .then(res => res.json())
            .then(data => {
                setServicesData(data);
                setLoading(false);
            })
    }, [])

    console.log(servicesData);

    if (loading) {
        return (<>
            <p>Loading</p>
        </>)
    }

    return (
        <div className='py-20 bg-accent'>
            <div className='pb-10'>
                <p className='text-center dm-sans-semibold text-5xl text-black'>
                    Connected <span className='text-primary'>Providers</span>
                </p>
            </div>

            {/* Swiper takes full width so nav buttons reach screen edges */}
            <div className="relative w-full px-6 lg:px-12">
                <Swiper
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className='h-120'
                >
                    {servicesData.map(serviceData => (
                        <SwiperSlide key={serviceData.id}>
                            {/* constrain card width here instead */}
                            <div className="lg:flex lg:justify-center">
                                <div className="pt-10 lg:pt-5 lg:w-full lg:max-w-md lg:ml-15">
                                    <ServiceCard serviceData={serviceData} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );

    // return (
    //     <div className='py-20 bg-accent'>
    //         <div className='pb-10'>
    //             <p className='text-center dm-sans-semibold text-5xl text-black'>
    //                 Connected <span className='text-primary'>Providers</span>
    //             </p>
    //         </div>

    //         {/* wrapper div handles centering */}
    //         <div className="w-full flex justify-center px-4">
    //             <div className="w-full max-w-md mx-auto">
    //                 <Swiper
    //                     grabCursor={true}
    //                     centeredSlides={true}
    //                     slidesPerView={1}
    //                     spaceBetween={30}
    //                     autoplay={{ delay: 2500, disableOnInteraction: false }}
    //                     navigation={true}
    //                     pagination={{ clickable: true }}
    //                     modules={[Autoplay, Pagination, Navigation]}
    //                     className='h-120'
    //                 >
    //                     {servicesData.map(serviceData => (
    //                         <SwiperSlide key={serviceData.id}>
    //                             <ServiceCard serviceData={serviceData} />
    //                         </SwiperSlide>
    //                     ))}
    //                 </Swiper>
    //             </div>
    //         </div>

    //     </div>
    // );

    //     <div className='py-20 bg-accent'>
    //         <div className='pb-10'>
    //             <p className='text-center dm-sans-semibold text-5xl text-black'>Connected <span className='text-primary'>Providers</span></p>
    //         </div>
    //         <Swiper
    //             // effect={'coverflow'}
    //             grabCursor={true}
    //             centeredSlides={true}
    //             slidesPerView={1}
    //             spaceBetween={30}
    //             // coverflowEffect={{
    //             //     rotate: 50,
    //             //     stretch: 0,
    //             //     depth: 100,
    //             //     modifier: 1,
    //             //     slideShadows: false,
    //             // }}
    //             autoplay={{
    //                 delay: 2500,
    //                 disableOnInteraction: false,
    //             }}
    //             navigation={true}
    //             pagination={{
    //                 clickable: true,
    //             }}
    //             modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
    //             className="flex justify-center min-h-120 max-w-6/12"

    //         >
    //             <div className='w-6/12 mx-auto'>
    //                 {
    //                     servicesData.map(serviceData => <SwiperSlide>
    //                         {/* <img src={serviceData.icon} /> */}
    //                         <ServiceCard></ServiceCard>
    //                     </SwiperSlide>)
    //                 }
    //             </div>
    //         </Swiper>
    //     </div>
    // );
};

export default SupportedServices;