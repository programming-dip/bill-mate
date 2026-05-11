import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
    }
    return (
        <div>
            <div className="hero bg-black py-50">

                <div className="card text-neutral-content w-lg px-10 shrink-0 shadow-2xl">
                    <p className='text-2xl px-35'>Register</p>
                    <div className="card-body">
                        <form className="fieldset" onSubmit={handleRegister}>
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input text-neutral-content bg-neutral" required placeholder="Full Name" />
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input text-neutral-content bg-neutral" required placeholder="Email" />

                            <label className="label">Photo URL</label>
                            <input type="text" name='photo' className="input text-neutral-content bg-neutral" placeholder="Enter URL" />

                            <label className="label">Password</label>
                            <input type="password" name='password' className="input text-neutral-content bg-neutral" required placeholder="Password" />

                            <button type='submit' className="btn btn-neutral mt-4 w-9/12 px-40">Register</button>
                            <div>Have an account? <Link to="/auth/login" className="link link-hover">Login</Link></div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;