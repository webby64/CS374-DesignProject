import React from 'react';
import {Container, Row, Col, Card, Image, Button} from 'react-bootstrap';
import booksImage from './images/books.svg';
import discordImage from './images/call.svg';
import zoomImage from './images/video_call.svg';
import dictImage from './images/dictionary.svg';
import './Tools.css';

export default function Tools() {


    return (
        <Container style = {{
            "border": "solid 2px white", "borderRadius" : "0.4em","color" : "white", 
            "backgroundColor" : "#FF9B05", "fontSize" : "0.6em", "width" : "295px",
            "height" : "220px", "padding" : "0", "marginLeft" : "0"   
        }} className = "mt-4">
            <Row><h2 style = {{"marginTop" : "0.6em", "marginLeft" : "0.6em"}}>Tools: </h2></Row>
            <Row>
                <Col>
                    <Container style = {{
                        "margin" : "0",
                        "padding" : "0"
                    }} className = "mt-3">
                        <Image src = {zoomImage} />
                        <Button style = {{
                            "backgroundColor" : "white",
                            "color" : "#CB7A02",
                            "fontWeight" : "bolder",
                            "border" : "solid 2px #CB7A02",
                            "width" : "100px",
                            "paddingBot" : "10px"
                        }} href="https://zoom.us/" target="_blank" className = "tools-button"> Zoom </Button>
                    </Container>
                </Col>
                <Col>
                    <Container style = {{
                        "margin" : "0",
                        "padding" : "0"
                    }} className = "mt-3">
                        <Image src = {discordImage} />
                        <Button style = {{
                            "backgroundColor" : "white",
                            "color" : "#CB7A02",
                            "fontWeight" : "bolder",
                            "border" : "solid 2px #CB7A02",
                            "width" : "100px"
                        }}
                        className = "tools-button" target="_blank" href = "https://discord.com/brand-new">Discord</Button>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container style = {{
                        "margin" : "0",
                        "padding" : "0"
                    }} className = "mt-3">
                        <Image src = {dictImage} />
                        <Button style = {{
                            "backgroundColor" : "white",
                            "color" : "#CB7A02",
                            "fontWeight" : "bolder",
                            "border" : "solid 2px #CB7A02",
                            "width" : "100px"
                        }} className = "tools-button" target="_blank" href = "https://dictionary.cambridge.org/"> Dictionary</Button>
                    </Container>
                </Col>
                <Col>  
                    <Container className = "mt-3"
                    style = {{
                        "margin" : "0",
                        "padding" : "0"
                    }}>
                        <Image src = {booksImage} />
                        <Button style = {{
                            "backgroundColor" : "white",
                            "color" : "#CB7A02",
                            "fontWeight" : "550",
                            "border" : "solid 2px #CB7A02",
                            "width" : "105px"
                        }} className = "tools-button" target="_blank" href = "https://openlibrary.org/">Books(free)</Button>
                    </Container>    
                </Col>
            </Row>
        </Container>
    )
}