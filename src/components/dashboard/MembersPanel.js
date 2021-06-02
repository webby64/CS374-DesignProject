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
            style = {{"height":"210px", "width" : "17rem", "backgroundColor" : "transparent", 
            "color" : "black", "border" : "solid 2px white",
            "padding" : "0", "margin" : "0"}}>
            <Card.Body>
                <Container className = "d-flex">
                    <Image 
                        style = {{"marginRight" : "20px", "marginTop" : "0px"}}
                        src = {image} roundedCircle width = "20px"/>
                    <Card.Title className = "mt-2">Group Members</Card.Title>
                </Container>
                <ListGroup>
                    {props.groupMembers.map((member, index) =><ListGroupItem style = {{"backgroundColor" : "transparent", "border" : "0"}} key = {index}>{ListGroupUser(member.name)}</ListGroupItem>)}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}


function ListGroupUser(memberInfo) {
    return (
        <Button style = {{"backgroundColor" : "white", "color" : "black", "border" : "solid 2px white", "width" : "200px", "maxHeight" : "25px", "padding":"0", "whiteSpace":""}}>
            {<>{memberInfo}</>}
        </Button>
    )
}