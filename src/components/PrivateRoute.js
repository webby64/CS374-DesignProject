import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext'
//to get the current route


//create a wrapper for our current route
//all the rest properties will be there. component is renamed to cap lettered one
export default function PrivateRoute({component : Component, ...rest}) {
    const {currentUser} = useAuth();

    return (
        <Route
            {...rest}
            render = {props => {
                //then we just want to render out the component that was passed to our class
                //we are gonna pass all of the props
                //otherwise, we do not want to render that component because we are making it a private component

                return currentUser ? <Component {...props}/> : <Redirect to = "/login"/>
            }}
        >

        </Route>
    )
}