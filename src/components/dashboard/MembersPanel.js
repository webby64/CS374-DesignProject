import React from 'react';
import { Card , Image, ListGroup, Container, ListGroupItem, Button} from 'react-bootstrap';
import image from './images/group_icon.svg'


export default function MembersPanel(props) {
    //here we should have a state containing the information about all of the members
    //then we pass single blocks of information to the button children elements
    //button children elements would have access to single pieces of data so that we could open the user's panels
    //we do not need to change the props anyhow in this component: it is solely for display purposes
    return (
        <Card 
            className = "mt-4"
            style = {{
                "backgroundColor" : "transparent", "display" : "flex", "height" : "205px",
                "width" : "270px", "border" : "2px solid white", "borderRadius" : "0.4em",
                "flexDirection" : "column", "alignItems": "center"}}>
            <Card.Body>
                <Container className = "d-flex" style={{"margin" : "0 8px 0", "padding" : "0", "color" : "black"}}>
                    <Image 
                        style = {{"marginRight" : "2px"}}
                        src = {image} roundedCircle width = "20px"/>
                    <h2 className = "mt-2" style = {{"fontSize" : "1.5em"}}>Group Members</h2>
                </Container>
                <ListGroup>
                    {props.groupMembers.map((member, index) =><ListGroupItem style = {{"backgroundColor" : "transparent", "border" : "0", "padding" : "1px", "margin" : "1px"}} key = {index}>{ListGroupUser(member.name)}</ListGroupItem>)}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}


function ListGroupUser(memberInfo) {
    return (
        <Button style = {{"fontWeight" : "300", "margin" : "0", "backgroundColor" : "white", "color" : "black", "border" : "solid 2px white", "width" : "200px", "maxHeight" : "30px", "padding" : "0"}}>
            {<>{memberInfo}</>}
        </Button>
    )
}