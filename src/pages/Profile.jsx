import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, setNameAndPhoto } = useContext(AuthContext);
    const [name, setName] = useState(user.displayName || "");
    const [photo, setPhoto] = useState(user.photoURL || "");
    const redirect = useNavigate();

    const handleSubmit = () => {
        setNameAndPhoto(name, photo)
            .then(() => {
                // profile updated
                Swal.fire({
                    title: "Profile Updated!",
                    icon: "success",
                    theme: 'auto',
                    draggable: false
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Could not update the profile!",
                    icon: "error",
                    theme: 'auto',
                    draggable: false
                });
                
                console.log(err);
            })
    }

    const handleCancel = () => {
        redirect("/");
    }
    return (
        <div className='max-w-[95%] min-h-[95vh] mx-auto'>
            <p className='text-center text-3xl font-semibold py-10'>Profile</p>
            <div className="avatar mb-6 flex justify-center">
                <div className="w-52 rounded-full">
                    <img
                        src={user.photoURL}
                        alt="Profile"

                    />
                </div>
            </div>

            <div className="flex flex-col w-56 mx-auto gap-1">

                {/* Name */}
                <label className="text-slate-500 text-sm">Name</label>
                <input
                    className="input input-bordered input-sm bg-transparent text-black border-slate-500 mb-3 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* PhotoURL */}
                <label className="text-slate-500 text-sm">PhotoURL</label>
                <input
                    className="input input-bordered input-sm bg-transparent text-black border-slate-500 mb-5 w-full"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />

                {/* Submit — DaisyUI btn-success */}
                <button
                    className="btn btn-primary text-white w-full mb-2"
                    onClick={handleSubmit}
                >
                    Submit Changes
                </button>

                {/* Cancel */}
                <button
                    className="btn bg-slate-500 hover:bg-slate-400 border-none text-slate-100 w-full"
                    onClick={handleCancel}
                >
                    Cancel
                </button>

            </div>
        </div>
    );
};

export default Profile;