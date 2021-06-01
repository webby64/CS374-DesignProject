import React, {useContext, useState, useEffect} from 'react';
import {auth} from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
        .then();
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        // we need to make sure we return this because it is a promise
        return auth.signOut();
    }

    //firebase's way to notify you when the user gets created. When we call the create..., it's gonna call setCurrentUser and set it
    //we only want to run this when we mount our component -> useEffect
    //we also want to make sure we unsubscribe from this when we are done
    //that function returns a methods that unsubscribes from the onauthchanged event
    //it is gonna ubsibscribe from that listener whenever we unmount that component
    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            //as soon as this useeffect runs, it means it did the verification to see if there is a user
            //then we are setting our loading to false
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    //if we are not loading, we are rendering out the children. Otherwise, we dont want to render children
    return ( 
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}