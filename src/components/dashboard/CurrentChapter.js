import React, { useEffect, useState} from 'react';
import {Card, Container, Button} from 'react-bootstrap';

export default function CurrentChapter(props) {

    const [NextChapterBorder, setNextChapterBorder] = useState("white")

    function buttonHandler() {
        props.updateIsQuestionsPhase();
    }

    return (
        <Container
            style = {{zIndex: 1,"margin" : "0", "padding" : "0"}}
            className = "mt-4"
        >
            
            <Card
                className = "mt-4"
                style = {{"width" : "18rem", "backgroundColor" : "transparent", "color" : "white", "border" : "none"}}
            >
                <Card.Body>
                    <Card.Title style={{"color" : "black","fontSize" : "2.5rem"}}>{`Chapter ${props.currentChapter}`}</Card.Title>
                    <Card.Text style={{"fontSize" : "1.2em", "color" : "black", "fontWeight" : "300"}}>
                        Chapter
                    </Card.Text>
                    <Card.Text style={{"color":"black", "fontSize":"1.5rem", "fontWeight":"500"}}>
                        {`${parseInt(((new Date(props.currentChapterStartDate.toDate()) - new Date())) / (1000 * 60 * 60 * 24))} days`}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Button
                onClick = {() => {buttonHandler()}}
                onMouseEnter = {() => setNextChapterBorder("green")}
                onMouseLeave = {() => setNextChapterBorder("#CB7A02")}
                style = {{"marginTop" : "7px", "fontWeight" : "bolder", "marginLeft" : "10px", "color" : "#CB7A02", "width" : "9rem", "backgroundColor" : "white", "border" : "solid 5px", "borderColor" : `${NextChapterBorder}`}}>
                Next Chapter
            </Button>
        </Container>
    )
}