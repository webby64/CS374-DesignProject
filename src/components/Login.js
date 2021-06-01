import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login, currentUser} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    //we want to set up a loading state so that when a user is actually signing up, we disable that button so that the user did not click automatically and accidentally create multiple accounts at the same time 
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault();

        //we use try catch because this is an async event
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            //this is gonna bring us to that dashboard page
            history.push("/")
        } catch {
            setError("Failed To Sign In");
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Log In</h2>
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
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref = {emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordRef} required/>
                        </Form.Group>
                        <Button disabled = {loading} className = "w-100" type = "submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Need An Account? <Link to = "/signup"> Sign Up</Link>
            </div>
        </>
    )
}