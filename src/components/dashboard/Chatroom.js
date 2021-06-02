<<<<<<< HEAD
import React, {useState, useRef, useEffect} from 'react';
import firebase from 'firebase/app';
import {db} from '../../firebase';
import {Container, Row, Form, Button} from 'react-bootstrap';
import "./Chatroom.css";
import "./Chat.css";

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

  
    // added this to support enter to sent message
    const sendMessageButton = React.useRef(null)
    
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
              'position': 'relative',
              "zIndex": 2,
              "backgroundColor" : "#CCD4E6", "height" : "450px", "width" : "500px",
              "border" : "solid 2px white", "borderRadius" : "0.4em", "marginTop" : "3em",
              "display" : "flex", "justifyContent" : "space-between", "flexDirection" : "column"
            }}>
              <main style = {{"marginTop" : "20px", "overflowY" : "scroll"}}>
                {messages && membersObject && messages.map(msg => <ChatMessage key={msg.id} message={msg} currentUserID = {props.currentUserID}  membersObject = {membersObject}/>)}
                {/* {messages && JSON.stringify(messages)} */}
                <span ref={dummy}></span>
              </main>
              
          
              <Form onSubmit={sendMessage} className = "chatForm" 
                style = 
                {{
                  // "border" : "solid 2px white", "borderRadius" : "0.4em",
                  "width" : "100%",
                  "display" : "flex", "justifyContent" : "space-between", 'marginTop' : '10px',
                  'borderTop' : 'solid white 3px'

                }}>
                  
                  {/* <input 
                    value={newMessage} onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Discuss!" 
                  /> */}
                  <Form.Group>
                  
                    <Form.Control as = "textarea" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Discuss!" rows = {1} style = {{'width': '365px', "margin" : "0.5em", "borderRadius" : "0.6 em"}}
                    onKeyDown = {(e) => {if (e.key === 'Enter') {e.preventDefault() ;sendMessageButton.current.click()}}}
                    />
                  </Form.Group>
                  <Button 
                    type="submit" disabled={!newMessage}
                    style = {{'marginBottom': '5px','marginTop': '5px' ,"cursor" : "pointer", "fontWeight" : "bold", }}
                    ref = {sendMessageButton}
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
    const messageColor = uid === props.currentUserID ? '#218aff' : 'white';
    const textColor = uid === props.currentUserID ? 'white' : 'black';
  
    return (
    <Container style = {{"display" : "flex", "justifyContent" : messageClass}}>
      <div>
        <p style = {{"margin" : "0", "padding" : "0"}}> {membersObject[uid]} </p>
        <div className={`${messageClass}`}
          style = {{"borderRadius" : "20px", "maxWidth" : "300px", "wordWrap" : "break-word",
                    "fontSize": "15px",
                    "padding": "10px 7px",
                    "lineHeight": "18px",
                    "backgroundColor" : `${messageColor}`,
                    "color": `${textColor}`,
                  }}>
          <p>{text}</p>
        </div>
      </div>
    </Container>)
  }
=======
import React, {useState, useRef, useEffect} from 'react';
import firebase from 'firebase/app';
import {db} from '../../firebase';
import {Container, Row, Form, Button} from 'react-bootstrap';
import "./Chatroom.css";
import "./Chat.css";

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

  
    // added this to support enter to sent message
    const sendMessageButton = React.useRef(null)
    
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
              'position': 'relative',
              "zIndex": 2,
              "backgroundColor" : "#CCD4E6", "height" : "450px", "width" : "500px",
              "border" : "solid 2px white", "borderRadius" : "0.4em", "marginTop" : "3em",
              "display" : "flex", "justifyContent" : "space-between", "flexDirection" : "column"
            }}>
              <main style = {{"marginTop" : "20px", "overflowY" : "scroll"}}>
                {messages && membersObject && messages.map(msg => <ChatMessage key={msg.id} message={msg} currentUserID = {props.currentUserID}  membersObject = {membersObject}/>)}
                {/* {messages && JSON.stringify(messages)} */}
                <span ref={dummy}></span>
              </main>
              
          
              <Form onSubmit={sendMessage} className = "chatForm" 
                style = 
                {{
                  // "border" : "solid 2px white", "borderRadius" : "0.4em",
                  "width" : "100%",
                  "display" : "flex", "justifyContent" : "space-between", 'marginTop' : '10px',
                  'borderTop' : 'solid white 3px'

                }}>
                  
                  {/* <input 
                    value={newMessage} onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Discuss!" 
                  /> */}
                  <Form.Group>
                  
                    <Form.Control as = "textarea" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Discuss!" rows = {1} style = {{'width': '365px', "margin" : "0.5em", "borderRadius" : "0.6 em"}}
                    onKeyDown = {(e) => {if (e.key === 'Enter') {e.preventDefault() ;sendMessageButton.current.click()}}}
                    />
                  </Form.Group>
                  <Button 
                    type="submit" disabled={!newMessage}
                    style = {{'marginBottom': '5px','marginTop': '5px' ,"cursor" : "pointer", "fontWeight" : "bold", }}
                    ref = {sendMessageButton}
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
    const messageColor = uid === props.currentUserID ? '#218aff' : 'white';
    const textColor = uid === props.currentUserID ? 'white' : 'black';
  
    return (
    <Container style = {{"display" : "flex", "justifyContent" : messageClass}}>
      <div>
        <p style = {{"margin" : "0", "padding" : "0"}}> {membersObject[uid]} </p>
        <div className={`${messageClass}`}
          style = {{"borderRadius" : "20px", "maxWidth" : "300px", "wordWrap" : "break-word",
                    "fontSize": "15px",
                    "padding": "10px 7px",
                    "lineHeight": "18px",
                    "backgroundColor" : `${messageColor}`,
                    "color": `${textColor}`,
                  }}>
          <p>{text}</p>
        </div>
      </div>
    </Container>)
  }
>>>>>>> bd53bb5eee25a4c491d1725a871c3b979a0193d8
  