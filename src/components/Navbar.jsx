import { Link } from "react-router";
import Navlinks from "../utils/Navlinks";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        signOutUser().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm md:shadow-none max-w-[97%] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <Navlinks></Navlinks>
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl font-semibold text-primary">BillMate</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <Navlinks></Navlinks>
                    </ul>
                </div>
                <div className="navbar-end space-x-5">
                    {
                        user ? <button onClick={handleLogOut} className="btn btn-primary">Logout</button>
                            :
                            <>
                                <Link to="/auth/register" className="btn btn-primary">Register</Link>
                                <Link to="/auth/login" className="btn btn-primary">Login</Link>
                            </>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;