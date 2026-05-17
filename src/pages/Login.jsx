import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
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
                prevPath? redirect(prevPath) : redirect("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
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
                                <div><Link className="link link-hover">Forgot password?</Link></div>
                                <button type='submit' className="btn btn-neutral mt-4">Login</button>
                                <div>Don't have an account? <Link to="/auth/register" className="link link-hover">Register</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;