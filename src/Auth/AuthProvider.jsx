import { AuthContext } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '@/firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // console.log("If not null setup user at auth provider-> User:", user);


    const signUpUser = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password);
    }

    const setNameAndPhoto = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = async ()=>{
        setLoading(true);
        return await signInWithPopup(auth, googleProvider);
    }

    const recoverPassword = (email)=>{

        return sendPasswordResetEmail(auth, email); 
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const listener = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(currentUser);
                setLoading(false);
                // ...
            } else {
                // User is signed out
                // ...
                setUser(null);
                setLoading(false);
            }
        });

        return listener;

    }, [auth]);

    const userData = {
        signUpUser,
        setNameAndPhoto,
        signInUser,
        signInWithGoogle,
        user,
        recoverPassword,
        signOutUser,
        loading,
        setLoading,
        

    };
    return (
        <AuthContext value={userData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;