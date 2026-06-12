import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, signInWithGoogle, setLoading } = useContext(AuthContext);
    const urlObj = useLocation();
    const prevPath = urlObj.state;
    const redirect = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                prevPath ? redirect(prevPath) : redirect("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode);
                if (errorCode === 'auth/invalid-credential') {
                    Swal.fire({
                        title: "Wrong email or password!",
                        icon: "error",
                        theme: 'auto',
                        draggable: false
                    });
                } else {
                    Swal.fire({
                        title: "Something went wrong please try again later.",
                        icon: "error",
                        theme: 'auto',
                        draggable: false
                    });

                    console.log(errorCode);
                }
            });

    }

    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then((result) => {
                prevPath ? redirect(prevPath) : redirect("/");

            }).catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/popup-blocked') {
                    Swal.fire({
                        title: "Please allow popup on your browser!",
                        icon: "warning",
                        theme: 'auto',
                        draggable: false
                    });
                } else if(error.code === "auth/popup-closed-by-user"){
                    console.log(error);
                }else{
                    Swal.fire({
                        title: "Something went wrong, try again!",
                        icon: "error",
                        theme: 'auto',
                        draggable: false
                    });
                }

                setLoading(false);
            });
    }


    return (
        <div>
            <div className="hero bg-black py-50">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img className='w-150 px-20' src="/login-img.svg" alt="" />
                    <div className="card text-neutral-content w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form className="fieldset" onSubmit={handleLogin}>
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input text-neutral-content bg-neutral" required placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input text-neutral-content bg-neutral" required placeholder="Password" />
                                <div><Link to="/auth/forgot-register" className="link link-hover">Forgot password?</Link></div>
                                <button type='submit' className="btn btn-neutral mt-4">Login</button>
                                <div>Don't have an account? <Link to="/auth/register" state={prevPath} className="link link-hover">Register</Link></div>
                            </form>

                            <button onClick={handleGoogleLogIn} className="btn btn-neutral">
                                <FcGoogle size={20} />
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;