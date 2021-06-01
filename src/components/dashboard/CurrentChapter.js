import React, { useEffect } from 'react';
import {Card, Container, Button} from 'react-bootstrap';

export default function CurrentChapter(props) {



    function buttonHandler() {
        props.updateIsQuestionsPhase();
    }

    return (
        <Container
            style = {{"margin" : "0", "padding" : "0"}}
            className = "mt-4"
        >
            <Button
                onClick = {() => {buttonHandler()}}
                style = {{"backgroundColor" : "#FF9B05", "border" : "solid 2px white", "marginTop" : "10px"}}>
                <strong>Proceed To The Next Chapter</strong>
                
            </Button>
            <Card
                className = "mt-4"
                style = {{"width" : "18rem", "backgroundColor" : "#FF9B05", "color" : "white", "border" : "solid 2px white"}}
            >
                <Card.Body>
                    <Card.Title>{`Chapter ${props.currentChapter}`}</Card.Title>
                    <Card.Text>
                        <strong>The name of the current chapter</strong>
                    </Card.Text>
                    <Card.Text>
                        <strong>{`${parseInt(((new Date(props.currentChapterStartDate.toDate()) - new Date())) / (1000 * 60 * 60 * 24))} days`}</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}