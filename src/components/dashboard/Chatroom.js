import React, {useState, useRef, useEffect} from 'react';
import firebase from 'firebase/app';
import {db} from '../../firebase';
import {Container, Row, Form, Button} from 'react-bootstrap';
import "./Chatroom.css";

import {useCollectionData} from 'react-firebase-hooks/firestore';


function incrementMessageCount(userID) {
  return new Promise(resolve => {
    db.collection("Users").doc(userID).update({
      messagesSent : firebase.firestore.FieldValue.increment(1)
    }).then(() => resolve())
  })
}


export default function ChatRoom(props) {
    const {groupID, genre, currentUserID, members} = props;

    const dummy = useRef();
    const messagesRef = db.collection("Groups").doc(genre).collection(`${genre}Groups`).doc(groupID).collection("Messages");
    const query = messagesRef.orderBy('createdAt').limit(10);
  

    const [messages, setMessages] = useState([]);
    const [membersObject, setMembersObject] = useState({})

   function listenToMessages() {
      messagesRef.orderBy("createdAt").limitToLast(10).onSnapshot((messagesSnapshot) => {
        console.log("Is this invoked");
        const allMessages = [];
        messagesSnapshot.forEach((messageDoc) => {
          console.log(messageDoc.data());
          allMessages.push({...messageDoc.data(), id : messageDoc.id});
        })
        setMessages(allMessages);
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      })
    }

    useEffect(() => {
      
      if (members !== undefined && members !== null) {
        let objectNew = {}
        members.forEach((member) => {
          let uid = member.uid;
          let name = member.name;
          objectNew = {...objectNew, [`${uid}`] : name};
        })
        setMembersObject(objectNew)
        console.log("membersObject",objectNew);
      }

      listenToMessages();
      
    }, [])

  

  
    const [newMessage, setNewMessage] = useState('');
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      await messagesRef.add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid : currentUserID
      })
      await incrementMessageCount(currentUserID);
  
      setNewMessage('');
      if (dummy !== undefined || dummy !== null){
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    return (
        <div>
          {/* <h2>{JSON.stringify(membersObject)}</h2> */}
          <Container className = "ml-0 mr-0"
            style = {{
              "backgroundColor" : "#FF9B05", "height" : "500px", "width" : "500px",
              "border" : "solid 2px white", "borderRadius" : "0.4em", "marginTop" : "3em",
              "display" : "flex", "justifyContent" : "space-between", "flexDirection" : "column"
            }}
          >
              <main style = {{"height" : "450px", "overflowY" : "scroll"}}>
                {messages && membersObject && messages.map(msg => <ChatMessage key={msg.id} message={msg} currentUserID = {props.currentUserID}  membersObject = {membersObject}/>)}
                {/* {messages && JSON.stringify(messages)} */}
                <span ref={dummy}></span>
              </main>
              <hr style = {{
                "borderStyle" : "solid",
                "borderColor" : "white",
                "borderWidth" : "3px 0 0 0",
                "opacity" : "1"
              }}/>
          
              <Form onSubmit={sendMessage} className = "chatForm" 
                style = 
                {{
                  // "border" : "solid 2px white", "borderRadius" : "0.4em",
                  "width" : "100%",
                  "display" : "flex", "justifyContent" : "space-between"
                }}>
                  {/* <input 
                    value={newMessage} onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Discuss!" 
                  /> */}
                  <Form.Group>
                    <Form.Control as = "textarea" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Discuss!" rows = {1} style = {{"margin" : "0.5em", "borderRadius" : "0.6 em"}}/>
                  </Form.Group>
                  <Button 
                    type="submit" disabled={!newMessage}
                    style = {{"margin" : "0.5em"}}
                  > Send </Button>
              </Form>
          </Container>
        </div>
    )
  }
  
  
  function ChatMessage(props) {
    const { text, uid, photoURL} = props.message;
    const {membersObject} = props;

    useState(() => {
      console.log("from chatmessage", membersObject);
    })
  
    const messageClass = uid === props.currentUserID ? 'flex-end' : 'flex-start';
  
    return (
    <Container style = {{"display" : "flex", "justifyContent" : messageClass}}>
      <div>
        <div className={`${messageClass}`}
          style = {{
            "border" : "solid 2px white", "borderRadius" : "0.4em",
            "overflowY" : "scroll", "width" : "150px", "marginBottom" : "0.2em",
            "backgroundColor" : "white"
          }}
        >
          <p>{text}</p>
        </div>
        <p style = {{margin : "0", padding : "0"}}>{membersObject[uid]}</p>
      </div>
    </Container>)
  }
  