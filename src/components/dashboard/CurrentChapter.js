<<<<<<< HEAD
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
                    <Card.Title style={{"color":"black","fontSize":"2.5rem"}}>{`Chapter ${props.currentChapter}`}</Card.Title>
                    <Card.Text style={{"fontSize" : "1.2em", "color":"black", "fontWeight":"300"}}>
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
                onMouseLeave = {() => setNextChapterBorder("white")}
                style = {{"fontWeight" : "600", "marginLeft" : "10px", "color" : "black", "width" : "9rem", "backgroundColor" : "#f7dcb4", "borderColor" : `${NextChapterBorder}`,"border" : "solid 2px white"}}>
                Next Chapter
            </Button>
        </Container>
    )
=======
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
                    <Card.Title style={{"color":"black","fontSize":"2.5rem"}}>{`Chapter ${props.currentChapter}`}</Card.Title>
                    <Card.Text style={{"fontSize" : "1.2em", "color":"black", "fontWeight":"300"}}>
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
                onMouseLeave = {() => setNextChapterBorder("white")}
                style = {{"fontWeight" : "600", "marginLeft" : "10px", "color" : "black", "width" : "9rem", "backgroundColor" : "#f7dcb4", "borderColor" : `${NextChapterBorder}`,"border" : "solid 2px white"}}>
                Next Chapter
            </Button>
        </Container>
    )
>>>>>>> bd53bb5eee25a4c491d1725a871c3b979a0193d8
}