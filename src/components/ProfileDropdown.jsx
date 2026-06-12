import { AuthContext } from '@/contexts/AuthContext';
import { PaymentContext } from '@/contexts/PaymentContext';
import React, { useContext, useEffect } from 'react';

const ProfileDropdown = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const {balance} = useContext(PaymentContext);

    const handleLogOut = () => {
        signOutUser().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <div className="flex justify-end">

            {/* Dropdown Container */}
            <div className="dropdown dropdown-end">

                {/* Avatar Trigger */}
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar ring-1 ring-gray-600 ring-offset-primary ring-offset-2"
                >
                    <div className="w-10 rounded-full flex items-center justify-center">
                        {/* Using a placeholder image that mimics the "P" galaxy logo in your screenshot */}
                        <img
                            alt="User Avatar"
                            src={user.photoURL}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>

                {/* Dropdown Menu */}
                <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-4 z-[1] p-1 shadow-xl bg-base text-black rounded-xl w-56 border border-gray-600/50"
                >
                    {/* Profile Info (Non-clickable) */}
                    <li className="pointer-events-none">
                        <div className="flex flex-col items-start px-3 py-3 gap-0.5 hover:bg-transparent">
                            <span className="text-[15px] font-semibold text-black tracking-wide">
                                {user.displayName}
                            </span>
                            <span className="text-[13px] text-gray-400">
                                {user.email}
                            </span>
                        </div>
                    </li>

                    {/* Divider */}
                    <div className="h-px bg-gray-600/50 my-1 mx-2"></div>

                    {/* Balance */}
                    <li>
                        <a className="px-4 py-2.5 hover:bg-white/10 rounded-lg text-[15px] active:bg-white/20 transition-colors">
                            Balance: {balance}
                        </a>
                    </li>

                    {/* Divider */}
                    <div className="h-px bg-gray-600/50 my-1 mx-2"></div>

                    {/* Sign Out */}
                    <li>
                        <a onClick={handleLogOut} className="px-4 py-2.5 hover:bg-white/10 rounded-lg text-[15px] active:bg-white/20 transition-colors">
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default ProfileDropdown;