import React, {useState, useEffect, useRef} from 'react';
import {Card, Button, Alert, Container, Row, Col} from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext';
import {MemoryRouter, useHistory} from 'react-router-dom';
import {db} from '../../firebase';
import ProgressBar from "@ramonak/react-progress-bar";
import BookProgress from './BookProgress';
import CurrentChapter from './CurrentChapter';
import MembersPanel from './MembersPanel';
import QuestionsAfterChapter from './QuestionsAferChapter';
import firebase from 'firebase/app';
import Chatroom from './Chatroom';
import Tools from './Tools';
import UserProgress from './UserProgress';

import ProfileImage from './ProfileImage'

import Loader from "react-loader-spinner";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import {useCollectionData} from 'react-firebase-hooks/firestore';


export default function Dashboard() {
    //const [error, setError] = useState('');


    const {currentUser, logout} = useAuth();
    const [fetched, setFetched] = useState(false);
    const [groupData, setGroupData] = useState();
    const [bookData, setBookData] = useState();
    const [groupIsFull, setGroupIsFull] = useState(false); 

    const [isQuestionsPhase, setIsQuestionsPhase] = useState(false)
    const [questionsAnswered, setQuestionsAnswered] = useState(false)

    

    const history = useHistory();

    const _isMounted = useRef(true);
    
    


    // useEffect(() => {
    //     if (groupData !== undefined) {
    //         db.collection("Groups").doc(groupData.genre).collection(`${groupData.genre}Groups`).doc(groupData.id)
    //         .onSnapshot((groupDoc) => {
    //             if (groupDoc.data().groupSize === 4) {
    //                 setGroupIsFull(true);
    //             }
    //         })
    //     }
    // }, [groupData])

    function updateChapterLevels() {
        groupData.members.forEach((memberID) => {
            db.collection("Users").doc(memberID.uid).update({
                chaptersRead : firebase.firestore.FieldValue.increment(1)
            })
        })
    }


    function updateCurrentChapter() {
        return new Promise(resolve => {
            let currentChapterRef = db.collection("Groups").doc(bookData.genre).collection(`${bookData.genre}Groups`).doc(groupData.id);
            currentChapterRef.update({
                currentChapterNumber : firebase.firestore.FieldValue.increment(1),
                currentChapterStartDate : firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => resolve())
        })
    }

    async function updateCurrentChapterAndChapterLevels() {
        await updateCurrentChapter();
        updateChapterLevels();
    }


    useEffect(() => {//! LOGIC FOR ANSWERS
        if (questionsAnswered === true) {
            if (groupData.currentChapterNumber < bookData.totalChapterNumber){
                updateCurrentChapterAndChapterLevels();
                setQuestionsAnswered(false);
                setIsQuestionsPhase(false);
                transactionGetInfoAll();
            } else {
                history.push("/finished-book");
            }
        } 
        
    }, [questionsAnswered])

    useEffect(() => {
        console.log("Use Effect is triggered");
        transactionGetInfoAll();
        return () => {
            _isMounted.current = false;
        }
    }, []);

    // useEffect(() => {
    //     if (groupIsFull === true){
    //         transactionGetInfoAll();
    //     }
    // }, [groupIsFull])


    //we need to fetch all the data in one transaction probably
    //that might look ugly
    async function transactionGetInfoAll() {//this transaction gets all of the information needed
        let userRef = db.collection("Users").doc(currentUser.uid)
        return db.runTransaction(async (transaction) => {
            return transaction.get(userRef).then(async (userDoc) => {
                console.log("User Doc", JSON.stringify(userDoc.data()));
                let groupInfo = userDoc.data().groupInfo;
                let groupRef = db.collection("Groups").doc(groupInfo.genre).collection(`${groupInfo.genre}Groups`).doc(groupInfo.groupID);
                return transaction.get(groupRef).then(async (groupDoc) => {
                    if (groupDoc.data().groupSize === 4) {
                        setGroupData({...groupDoc.data(), id : groupInfo.groupID, currentChapterStartDate : groupDoc.data().currentChapterStartDate});
                        setGroupIsFull(true);
                    } else {
                        setGroupData({...groupDoc.data(), id : groupInfo.groupID, genre : groupInfo.genre});
                        groupRef.onSnapshot((groupDoc) => {
                            if (groupDoc.data().groupSize === 4) {
                                console.log("We are inside");
                                setGroupData(prev => {return {...prev, currentChapterStartDate : groupDoc.data().currentChapterStartDate}});
                                setGroupIsFull(true);
                            }
                        })
                    }
                    let bookRef = db.collection("Books").doc(groupInfo.genre).collection(`${groupInfo.genre}Books`).doc(groupDoc.data().bookInfo.id)
                    return transaction.get(bookRef).then(async (bookDoc) => {
                        console.log("The deepest control in transactions");
                        setBookData({...bookDoc.data(), id : bookDoc.id, genre : groupInfo.genre});
                        setFetched(true);//TODO: instead of fetching the book info, we should fetch the users' images because now the group info encapsulates the book info as well for better maintainability
                    })
                })
            })
        })
    }


    async function handleLogout() {
        try {
            await logout();
            history.push("/login");
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Container style = {{
            "backgroundColor" : "#03008F",
            "padding" : "0", "margin" : "0",
            "height" : "100vh"
        }} fluid>
            <Row>
                <Col></Col>
                <Col>{fetched && groupIsFull && <BookProgress bookName = {bookData.title} groupProgress = {(groupData.currentChapterNumber - 1) / groupData.bookInfo.totalChapterNumber} startDate = {groupData.createdAt}/>}</Col>
                
                <Col>
                    <div className = "w-100 text-center mt-2">
                        <Col style = {{marginRight:'0px'}}>{fetched && groupIsFull &&<ProfileImage/>}</Col>
                        <Button onClick = {handleLogout} style = {{
                            "backgroundColor" : "#ff9b05",
                            "border" : "1px solid white",
                            "marginTop" : "10px"
                        }}> <strong>Log Out </strong> </Button>
                    </div>
                </Col>
            </Row>
            {groupIsFull && fetched ? <Row>
                {/* <h2 style = {{"color" : "white"}}>{JSON.stringify(groupData)}</h2> */}
                <Col className = "col-5"><Chatroom groupID = {groupData.id} genre = {bookData.genre} currentUserID = {currentUser.uid} members = {groupData.members}/></Col>
                <Col className = "col-7">
                    {groupIsFull && <Container style = {{"height" : "100%", marginLeft : "0"}}>
                        <Row>
                            <Col><UserProgress currentUserID = {currentUser.uid} /></Col>
                            <Col><CurrentChapter currentChapter = {groupData.currentChapterNumber} currentChapterStartDate = {groupData.currentChapterStartDate} updateIsQuestionsPhase = {() => setIsQuestionsPhase(currentState => !currentState)}/></Col>
                            
                            {/* {<h2>{JSON.stringify(groupData)}</h2>} */}
                            {isQuestionsPhase && 
                                <div style = {{
                                    "position" : "absolute", "left" : "0px", "width" : "600px", "top" : "100px"
                                }}>
                                    <QuestionsAfterChapter 
                                    bookId = {bookData.id} currentChapter = {groupData.currentChapterNumber} 
                                    genre = {bookData.genre} updateQuestionsAnswered = {() => setQuestionsAnswered(true)}/>
                                </div>
                            }
                        </Row>
                        <Row>
                            <Col><MembersPanel groupMembers = {groupData.members}/></Col>
                            <Col>
                                <Tools />
                            </Col>
                        </Row>
                    </Container>}
                </Col>
            </Row> : 
                <div>
                    <Loader style = {{"marginLeft" : "45vw", "marginTop" : "20vh"}} color = "#ff9b05" />
                    <h2 style = {{"marginLeft" : "35vw", "color" : "white"}}>Please wait for group members to join</h2>
                </div>
            }
        </Container>
    )
}


// we can store the roup information in the user object
//this will decrease the data redundancy
//however, we would need to make an additional request to fetch group data
//we need to wait until the firestore finishes updating
//we cannot know when the updates happened
//the groupInfo should contain bookInfo in an object
//TODO: need to redesign the scheme if the app is gonna be deployed to the real life
//!When writing firebase code, we should keep all the doc or collection references in one file or context and share them among the components
//*When errors appear, we should try to solve them using catch blocks.
//*If the error was attempted to be solved mutiple times and was not solved or if the error is not solvable, e.g. no internet connection, then we should notify the user about that.
//! The database must notify the user that is currently in the group if the group was filled with 4 people
//* Maybe fetching all of the chapters and questions might be a good idea because those documents are not big in size so it should not cause much network problems











//TODO: We should put all of the necessary book information into the bookInfo inside groupData