import React, {useState} from 'react';
import { Card , Image, ListGroup, Container, ListGroupItem, Button} from 'react-bootstrap';
import image from './images/group_icon.svg'
import {ViewMainModal} from './ProfileImage'

    


export default function MembersPanel(props) {
    //here we should have a state containing the information about all of the members
    //then we pass single blocks of information to the button children elements
    //button children elements would have access to single pieces of data so that we could open the user's panels
    //we do not need to change the props anyhow in this component: it is solely for display purposes
    const [buttonPopup1, setButtonPopup1] = useState(false)
    const [buttonPopup2, setButtonPopup2] = useState(false)
    const [buttonPopup3, setButtonPopup3] = useState(false)
    const [buttonPopup4, setButtonPopup4] = useState(false)

    

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
                    {props.groupMembers.map((member, index) => <ListGroupItem onClick = {() => {
                        if (index==0) setButtonPopup1(true)
                        else if (index==1) setButtonPopup2(true)
                        else if (index==2) setButtonPopup3(true)
                        else if (index==3) setButtonPopup4(true)

                    }}  style = {{"backgroundColor" : "transparent", "border" : "0", "padding" : "1px", "margin" : "1px"}} key = {index}>{ListGroupUser(member.name)}</ListGroupItem>)}
                </ListGroup>
            </Card.Body>
            <div>
            {ViewMainModal(buttonPopup1, setButtonPopup1, props.groupMembers[0].uid, true)}
            </div>
            <div>
            {ViewMainModal(buttonPopup2, setButtonPopup2, props.groupMembers[1].uid, false)}
            </div>
            <div>
            {ViewMainModal(buttonPopup3, setButtonPopup3, props.groupMembers[2].uid, false)}
            </div>
            <div>
            {ViewMainModal(buttonPopup4, setButtonPopup4, props.groupMembers[3].uid, false)}
            </div>
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