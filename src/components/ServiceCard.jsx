import React from 'react';

const ServiceCard = ({serviceData}) => {
    const {title, type, icon} = serviceData;
    return (
        <div>
            <div className="card bg-base-100 w-96 h-95 py-15 shadow-sm text-black">
                <figure>
                    <img
                        src={icon}
                        alt={title}
                        className='w-25 h-25' />
                </figure>
                <div className="card-body">
                    <h2 className="font-semibold text-xl text-center">
                        {title}
                    </h2>

                    <div className="card-actions justify-center pt-5">
                        <div className="badge badge-outline text-primary">{type}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;