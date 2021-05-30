import React, {useState, useRef, useEffect} from 'react';
import firebase from 'firebase/app';
import {db} from '../../firebase';
import {Container} from 'react-bootstrap';
import "./Chat.css"

import {useCollectionData} from 'react-firebase-hooks/firestore';


export default function ChatRoom(props) {
    const {groupID, genre} = props;
    const dummy = useRef();
    const messagesRef = db.collection("Groups").doc(genre).collection(`${genre}Groups`).doc(groupID).collection("Messages");
    const query = messagesRef.orderBy('createdAt');
  

    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [newMessage, setNewMessage] = useState('');
  
    const sendMessage = async (e) => {
      e.preventDefault();
      const uid = props.currentUserID
      const photoURL = "https://static.wikia.nocookie.net/avatar/images/1/12/Azula.png/revision/latest?cb=20140905084941"
      await messagesRef.add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setNewMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (
        <Container style = {{"backgroundColor" : "#FF9B05", 
                             "border" : "solid 2px white",
                             "margin" : "20px", 
                             "maxHeight" : "400px"
                             }}>
            <main style = {{"padding": "10px",
                            "height": "400px",
                            // "margin": "10vh 0 10vh",
                            
                            "overflowY": "scroll",
                            "display": "flex",
                            "flexDirection": "column"}}
            >
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} currentUserID = {props.currentUserID}  />)}
                <span ref={dummy}></span>
            </main>
        
            <form onSubmit={sendMessage} className = "chatForm"
                style = {{"maxHeight": "200px",
                        "position": "relative",
                        "width" : "500px",
                        "maxWidth": "400px",
                        "marginTop": "10px",
                        "backgroundColor" : "#FF9B05",
                        "display": "flex",
                        "fontSize": "1.5rem"}}
            >
                <input style = {{"line-height": "1.0",
                                "width": "100%",
                                "font-size": "1.5rem",
                                "background": "rgb(255, 255, 255)",
                                "color": "rgb(0, 0, 0)",
                                "border" : "solid 1px white",
                                "outline": "none"}}
                
                    value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Discuss!" />
                <button style = {{"backgroundColor": "orange",
                                  "color": "white",
                                  "padding": "15px 32px",
                                  "textAlign": "center",
                                  "textDecoration": "none",
                                  "display": "inline-block",
                                  "cursor": "pointer",
                                  "fontSize": "1.25rem"}}
                type="submit" disabled={!newMessage}>🕊️</button>
            </form>
        </Container>
    )
  }
  
  
  function ChatMessage(props) {
    const { text, uid} = props.message;
    const photoURL = "https://georgetownvoice.com/wp-content/uploads/2020/08/iroh-photo.jpg"
    const messageClass = uid === props.currentUserID ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img id = "chatimg" src={photoURL || "https://static.wikia.nocookie.net/avatar/images/1/12/Azula.png/revision/latest?cb=20140905084941"} />
        <p style = {{"max-width": "500px",
                    "marginBottom": "12px",
                    "lineHeight": "24px",
                    "padding": "10px 20px",
                    "border-radius": "25px",
                    "position": "relative",
                    "color": "white",
                    "textAlign": "center"
                }}>{text}</p>
      </div>
    </>)
  }
  