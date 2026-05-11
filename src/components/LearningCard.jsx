import React from 'react';

const LearningCard = ({ data }) => {
    const {title, description, image, alt} = data;
    console.log(data);
    return (
        <div>
            <div className="card bg-accent w-96 h-96 shadow-sm mx-auto">
                <h2 className="pt-2 text-center text-2xl inter-regular font-medium">{title}</h2>
                <figure className="px-10 pt-10">
                    <img
                        src={image}
                        alt={alt}
                        className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-left">

                    <p>{description}</p>

                </div>
            </div>
        </div>
    );
};

export default LearningCard;