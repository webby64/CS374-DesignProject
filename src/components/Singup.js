import React, {useEffect, useRef, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    //this is just for dealing with the warning
    const _isMounted = useRef(true);
    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);


    //we want to set up a loading state so that when a user is actually signing up, we disable that button so that the user did not click automatically and accidentally create multiple accounts at the same time 
    async function handleSubmit(event){
        event.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            //we are returning because we want to exit from the function immediately if there was an error
            return setError("Password Do not match");
        }

        //we use try catch because this is an async event
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push({pathname : "/quiz", state : {name : nameRef.current.value}});
        } catch {
            setError("Failed To Create An Account");
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                    {
                        //our current user when we refresh our page is null,
                        //firebase states local storage and tokens for us
                        //so it can connect the user for us if the user is signed in
                        //it'll use that onauthchanged
                        //but that means we have an initial loading state that we need to care about
                        //we can get rid of the and check
                        //we do not render any of our application until we have our current user being set for the first time
                        //currentUser && currentUser.email
                        //so
                        //currentUser.email
                        //worksfine
                    }
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id = "name">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type = "text" ref = {nameRef} required/>
                        </Form.Group>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref = {emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordRef} required/>
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref = {passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled = {loading} className = "w-100" type = "submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Already Have An Account? <Link to = "/login">Login</Link>
            </div>
        </>
    )
}