import React, {useEffect, useState} from 'react';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {db} from '../../firebase';


export default function UserProgress(props) {
    const [numberOfMessages, setNumberOfMessages] = useState(0);
    const [numberOfChapters, setNumberOfChapters] = useState(0);
    const [fetched, setFetched] = useState(false);

    function listenToLevelUpdates(userID) {
        return new Promise(resolve => db.collection("Users").doc(userID).onSnapshot((userDoc) => {
            setNumberOfMessages(userDoc.data().messagesSent);
            setNumberOfChapters(userDoc.data().chaptersRead);
            setFetched(true);
        })
    )}

    

    

    useEffect(() => {
        listenToLevelUpdates(props.currentUserID);
    }, []);


    return (
        <div style = {{
            "backgroundColor" : "transparent", display : "flex", "height" : "220px",
            width : "270px", border : "2px solid white", borderRadius : "0.4em",
            flexDirection : "column" , alignItems: "center", "marginTop" : "2em"
        }}>
            <h2 style = {{"fontSize" : "1.5em", marginTop : "0.3em", color : "black"}}>Your Progress </h2>
            <div style = {{width : "100px",height : "100px", margin : "0.4em"}}>
                <CircularProgressbar 
                styles={buildStyles({
                    textSize: '16px',                
                    pathTransitionDuration: 0.5,
                    textColor: 'black',
                    trailColor: '#E54848',
                    pathColor : "#67C947",
                    backgroundColor: '#3e98c7'
                  })}
                value = {(numberOfMessages * 4 + (numberOfChapters * 15)) % 100} text = {`Level ${parseInt((numberOfMessages * 4 + (numberOfChapters * 15)) / 100)}`}/>
            </div>
            {fetched && <div>
                <h4 style = {{"fontSize" : "1em", color : "black"}}>Messages Sent: {numberOfMessages}</h4>
                <h4 style = {{"fontSize" : "1em", color : "black"}}>Chapters Read: {numberOfChapters}</h4>
            </div>}
        </div> 
    )
}