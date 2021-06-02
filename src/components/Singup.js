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
            return setError("Password Do not match. Please try again with a different password.");
        }

        //we use try catch because this is an async event
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push({pathname : "/quiz", state : {name : nameRef.current.value}});
        } catch(error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <div style = {{"backgroundImage" : "url('https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')",
                        "height" : "100vh",
                        "overflow" : "hidden"}}>
            <Card style={{  "margin" : "0 auto",
                            "float" : "none",
                            "maxWidth" : "500px",
                            "marginTop" : "15vh",
                            "borderRadius" : "10px"
                        }}>
                <Card.Body>
                    <h2 className = "text-center mb-4" style={{fontWeight: "bold"}}>Sign Up</h2>
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
                    <Form onSubmit = {handleSubmit} style={{"fontWeight" : "500"}}>
                        <Form.Group id = "name">
                            <Form.Label>Username</Form.Label>
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
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type = "password" ref = {passwordConfirmRef} required/>
                        </Form.Group>
                        <br/>
                        <Button disabled = {loading} className = "w-100" type = "submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2" style={{"color" : "white", "marginLeft" : "130px"}}>
                Already Have An Account? <Link to = "/login">Login</Link>
            </div>
        </div>
    )
}