import { AuthContext } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '@/firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);



    console.log("If not null setup user at auth provider-> User:", user);


    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const setNameAndPhoto = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        return signOut(auth);
    }


    useEffect(() => {
        const listener = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(currentUser);
                // ...
            } else {
                // User is signed out
                // ...
                setUser(null);
            }
        });

        return listener;

    }, [auth]);

    const userData = {
        signUpUser,
        setNameAndPhoto,
        signInUser,
        user,
        signOutUser,

    };
    return (
        <AuthContext value={userData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;