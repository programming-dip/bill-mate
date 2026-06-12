import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const { recoverPassword } = useContext(AuthContext);
    const urlObj = useLocation();
    const prevPath = urlObj.state;
    const redirect = useNavigate();


    const handleRecovery = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        recoverPassword(email)
            .then(() => {
                // Password reset email sent!
                Swal.fire({
                    title: "Reset email sent successfully. Please check inbox and spam.",
                    icon: "success",
                    theme: 'auto',
                    draggable: false
                })
                    .then((result) => {
                        redirect("/auth/login");
                    })
                    .catch((error)=>{
                        
                    })
                    ;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    title: "Error sending reset email!",
                    icon: "error",
                    theme: 'auto',
                    draggable: false
                });
                console.error("Error sending reset email:", errorCode, errorMessage);
            });
    }


    return (
        <div>
            <div className="hero bg-black py-50">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img className='w-150 px-20' src="/login-img.svg" alt="" />
                    <div className="card text-neutral-content w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form className="fieldset" onSubmit={handleRecovery}>
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input text-neutral-content bg-neutral" required placeholder="Email" />
                                <button type='submit' className="btn btn-neutral mt-4">Send Recovery Email</button>
                                <div> <Link to="/" state={prevPath} className="link link-hover">Go home</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;