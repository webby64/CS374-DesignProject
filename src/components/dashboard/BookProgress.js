import React from 'react';
// import ProgressBar from "@ramonak/react-progress-bar";
import {Container, Card, ProgressBar} from 'react-bootstrap';


export default function BookProgress(props) {
    return (
        <Card 
            style = {{
                "textAlign" : "center", "backgroundColor" : "#ff9b05", "color" : "white",
                "border" : "solid 2px white", "width" : "600px", "marginTop" : "2em"
            }}>
            <Card.Body>
                <Card.Title className = "book-title">{`Book:${props.bookName}`}</Card.Title>
                <Container style = {{"position" : "relative"}}>
                    {/* <ProgressBar 
                        className = "progress-bar"
                        completed={props.groupProgress} height = "60px" 
                        baseBgColor = "#E54848" bgColor = "#67C947" 
                        isLabelVisible = {false}
                        style = {{"border" : "solid 2px white"}}
                    /> */}
                    <ProgressBar now = {parseInt(props.groupProgress * 100)}
                        variant = "success"
                        style = {{"height" : "60px", "borderRadius" : "30px", "backgroundColor" : "#E54848", "border" : "solid 2px white"}}
                    />
                    <h2 style = {{"position" : "absolute", "top" : "1vh", "left" : "17vw"}}>{`${parseInt(props.groupProgress * 100)}%`}</h2>
                    <h4>{`Time Took: ${parseInt(((new Date()).getTime() - props.startDate.toDate().getTime()) / (1000 * 60 * 60 * 24))} days`}</h4>
                </Container>
            </Card.Body>
        </Card>
    )
}