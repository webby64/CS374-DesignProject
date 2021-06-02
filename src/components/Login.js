import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert, Col, Row, Container} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login, currentUser} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState(false)
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
        } catch(error) {
            setError(error.message)
        }
        setLoading(false);
    }

    return (
        <div style = {{"backgroundImage" : "url('https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')", "height" : "100vh", "overflow" : "hidden"}}>
            <Container>
                <Row>
                    <div style={{"marginTop" : "10px", "marginLeft" : "1160px", "color" : "white"}}
                        onMouseEnter={() => setInfo(true)}
                        onMouseLeave={() => setInfo(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </div>
                </Row>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <div style={{"color" : "white", "fontWeight" : "bold", "alignContent" : "center", "fontSize" : "50px", "marginTop" : "15vh", "textAlign" : "center"}}>Bookify</div>
                        <Card style={{  "margin" : "0 auto", "float" : "none", "maxWidth" : "500px", "borderRadius" : "10px"}}>
                            <Card.Body>
                                <h2 className = "text-center mb-4" style={{fontWeight: "bold"}}>Log In</h2>
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
                                    <Form.Group id = "email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type = "email" ref = {emailRef} required/>
                                    </Form.Group>
                                    <Form.Group id = "password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type = "password" ref = {passwordRef} required/>
                                    </Form.Group>
                                    <br/>
                                    <Button disabled = {loading} className = "w-100" type = "submit">Log In</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className = "w-100 text-center mt-2" style={{"color" : "white", "marginLeft" : "130px"}}>
                            Need An Account? <Link to = "/signup"> Sign Up</Link>
                        </div>
                    </Col>
                    <Col md={{span: 3}}>
                        {info && (
                            <div style={{"color" : "white", "border" : "1px solid white", "padding" : "15px 5px 5px"}}>
                                <h5>Welcome to Bookify!</h5>
                                <h6>Bookclubs live here!</h6>
                                <ul><li>For efficient discussion, the bookclubs are limited to only accomodate only 4 members.</li>
                                <li>A group is activated once there are 4 people who have the same interest.</li></ul>
                                <h6>GET STARTED</h6>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

