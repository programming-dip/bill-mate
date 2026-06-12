import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
    const { signUpUser, setNameAndPhoto, setLoading } = useContext(AuthContext);
    const urlObj = useLocation();
    const prevPath = urlObj.state;
    const redirect = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        if (!name || !email || !password) {

            Swal.fire({
                title: "Please fill all filed to continue!",
                icon: "warning",
                theme: 'auto',
                draggable: false
            });

            return;

        }


        signUpUser(email, password)
            .then((userCredential) => {
                // Signed up 
                // const user = userCredential.user;
                setNameAndPhoto(name, photo)
                    .then(() => {
                        // Profile updated!
                        // ...
                        Swal.fire({
                            title: `Welcome ${name}!`,
                            icon: "success",
                            theme: 'auto',
                            draggable: false
                        });

                        prevPath ? redirect(prevPath) : redirect("/");
                    }).catch((error) => {
                        // An error occurred
                        Swal.fire({
                            title: "Unexpected error happened! Try again.",
                            icon: "error",
                            theme: 'auto',
                            draggable: false
                        });
                        console.log(error);
                        setLoading(false);
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    Swal.fire({
                        title: `${email} is already in use with another account!`,
                        icon: "warning",
                        theme: 'auto',
                        draggable: false
                    });
                } else if (errorCode === 'auth/invalid-email') {
                    Swal.fire({
                        title: `${email} is not a valid email!`,
                        icon: "warning",
                        theme: 'auto',
                        draggable: false
                    });
                } else if (errorCode === 'auth/weak-password') {
                    Swal.fire({
                        title: `Weak password!`,
                        icon: "warning",
                        theme: 'auto',
                        draggable: false
                    });
                }

                setLoading(false);
            });

    }
    return (
        <div>
            <div className="hero bg-black pt-50">

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