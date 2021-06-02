import React from 'react';
// import ProgressBar from "@ramonak/react-progress-bar";
import {Container, Card, ProgressBar} from 'react-bootstrap';


export default function BookProgress(props) {
    return (
        <Card style = {{"textAlign" : "center", "backgroundColor" : "transparent", "color" : "black", "border" : "none", "height" : "80px"}}>
            <Card.Body>
                <Card.Title className = "book-title" style={{"fontWeight":"700", "fontSize":"1.5rem"}}>{`Book: ${props.bookName}`}</Card.Title>
                <Container style = {{"position" : "relative"}}>
                    
                    <ProgressBar now = {parseInt(props.groupProgress * 100)}
                        variant = "success"
                        style = {{"height" : "25px", "borderRadius" : "30px", "backgroundColor" : "#E54848"}}
                    />
                    <h2 style = {{"position" : "absolute", "top" : "3px", "left" : "50%px",  'fontWeight' : 'bold',  "fontSize" : "15px"}}>{`${parseInt(props.groupProgress * 100)}%`}</h2>
                    <h6>{`Time Took: ${parseInt(((new Date()).getTime() - props.startDate.toDate().getTime()) / (1000 * 60 * 60 * 24))} days`}</h6>
                </Container>
            </Card.Body>
        </Card>
    )
}