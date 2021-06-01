import React, {useState, useEffect} from "react";
import {Form, Card, Button} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {db, app} from '../firebase';
import firebase from 'firebase/app';
import {history, useHistory} from 'react-router-dom';


export default function Questions(props) {
    let questions = [
        {
            id : "philosophy",
            questionText : "Did you like listening to stories from your parents before going to sleep when you were a child?",
            answerOptions : [
                {answerText : "Yes", genre : "philosophy"},
                {answerText : "No", genre : "philosophy"}
            ]
        },
        {
            id : "non-fiction",
            questionText : "Do u want to learn how to improve yourself?",
            answerOptions : [
                {answerText : "Yes", genre : "non-fiction"},
                {answerText : "No", genre : "non-fiction"}
            ]
        },
        {
            id : "psychology",
            questionText : "Do you like movies like Alien?",
            answerOptions : [
                {answerText : "Yes", genre : "psychology"},
                {answerText : "No", genre : "psychology"}
            ]
        },
        {
            id : "novel",
            questionText : "Does political discussion trigger emotions in you?",
            answerOptions : [
                {answerText : "Yes", genre : "novel"},
                {answerText : "No", genre : "novel"}
            ]
        }
    ]

    const [questionCount, setQuestionCount] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(false);
    const history = useHistory()

    const [novelChosen, setNovelChosen] = useState(false);
    const [nonfictionChosen, setNonfictionChosen] = useState(false);
    const [psychologyChosen, setPsychologyChosen] = useState(false);
    const [philosophyChosen, setPhilosophyChosen] = useState(false);

    const {currentUser} = useAuth();

    async function getBook(genre) {
        return new Promise(resolve => {
            db.collection("Books").doc(genre).collection(`${genre}Books`)
            .limit(1).get().then((querySnapshot) => {
                querySnapshot.forEach((singleBookDoc) => {
                    resolve({...singleBookDoc.data(), id : singleBookDoc.id});
                })
            })
        })
    }


    async function addToUsers(groupInfo) {
        return new Promise (resolve => {
            db.collection("Users").doc(currentUser.uid).set({
            groupInfo : groupInfo,
            messagesSent : 0,
            chaptersRead : 0,
            name : props.location.state.name,

            groupContr: 0,
            booksRead: 0,
            wishList: [],
            favAuthor: "",
            favBook: "",
            numberOfBooks: 0,
            numBookList: [],
            pagesReadList: [],
            currBookProgress: 0,
            chartLabels: [],
            imgUrl: ""
            
        }).then(() => {resolve()})})
    }


    async function addToGroups(genre, bookObject) {
        return new Promise(resolve => {
            db.collection("Groups").doc(genre).collection(`${genre}Groups`)
            .orderBy("createdAt", "desc").limit(1).get().then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    db.collection("Groups").doc(genre).collection(`${genre}Groups`).add({
                        groupSize : 1,
                        bookInfo : bookObject,
                        progress : 0,
                        members : [{uid : currentUser.uid, name : props.location.state.name}],
                        currentChapterNumber : 1,
                        totalChapterNumber : bookObject.totalChapterNumber,//this data abstractly belongs to the book entity. However, it takes a huge role for the group data as well. Therefore, having this piece of data in both entities should not really hurt as it is not intertwined with any other data.
                        createdAt : firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then((docRef) => {
                        resolve({groupID : docRef.id, genre : genre});
                    })
                }
                querySnapshot.forEach((doc) => {
                    if (doc.data().groupSize === 3) {
                        db.collection("Groups").doc(genre).collection(`${genre}Groups`).doc(doc.id).update({
                            groupSize : firebase.firestore.FieldValue.increment(1),//incrementing the value might be unnecessary cause the size of the array changes and you can prolly get it
                            members : firebase.firestore.FieldValue.arrayUnion({uid : currentUser.uid, name : props.location.state.name}),
                            currentChapterStartDate : firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {resolve({groupID : doc.id, genre : genre})})
                    }
                    else if (doc.data().groupSize < 4) {
                        db.collection("Groups").doc(genre).collection(`${genre}Groups`).doc(doc.id).update({
                            groupSize : firebase.firestore.FieldValue.increment(1),//incrementing the value might be unnecessary cause the size of the array changes and you can prolly get it
                            members : firebase.firestore.FieldValue.arrayUnion({uid : currentUser.uid, name : props.location.state.name})
                        }).then(() => {resolve({groupID : doc.id, genre : genre})})
                    } else {
                        db.collection("Groups").doc(genre).collection(`${genre}Groups`).add({
                            groupSize : 1,
                            bookInfo : bookObject,
                            progress : 0,
                            members : [{uid : currentUser.uid, name : props.location.state.name}],
                            currentChapterNumber : 1,
                            totalChapterNumber : 0,
                            createdAt : firebase.firestore.FieldValue.serverTimestamp()
                        }).then((docRef) => {resolve({groupID : docRef.id, genre : genre})})
                    } 
                })
            })
        })
    }

    async function sendAnswersToFirebase() {
        if (philosophyChosen) {
            console.log("Philosophy Chosen");
            let bookID = await getBook("philosophy");
            let groupID = await addToGroups("philosophy", bookID);
            await addToUsers(groupID);
            history.push("/");
        } else if (nonfictionChosen) {
            console.log("nonfinction Chosen");
            let bookID = await getBook("non-fiction");
            let groupID = await addToGroups("non-fiction", bookID);
            await addToUsers(groupID);
            history.push("/");
        } else if (psychologyChosen) {
            console.log("psychology Chosen");
            let bookID = await getBook("psychology");
            let groupID = await addToGroups("psychology", bookID);
            await addToUsers(groupID);
            history.push("/");
        } else if (novelChosen) {
            console.log("novels Chosen");
            //it is not set because it is async
            //transactionAddToGroups("philosophy");
            let bookID = await getBook("novels");
            let groupID = await addToGroups("novels", bookID);
            await addToUsers(groupID);
            history.push("/");
        } else {
            let bookID = await getBook("philosophy");
            let groupID = await addToGroups("philosophy", bookID);
            await addToUsers(groupID);
            history.push("/");
        }
    }

    
    useEffect(() => {//prolly this is the right way to do this task
        if (questionsAnswered) {//this gets triggered before the questionCount updates
            sendAnswersToFirebase();
        }
    }, [questionsAnswered])


    async function handleAnswerButton(answerOption) {
        if (answerOption.answerText === "Yes") {
            switch (answerOption.genre) {
                case "novel":
                    setNovelChosen(true);
                    break;
                case "non-fiction":
                    setNonfictionChosen(true);
                    break;
                case "psychology":
                    setPsychologyChosen(true);
                    break;
                case "philosophy":
                    setPhilosophyChosen(true);//this is an async call. Therefore it gets triggered only after the request is sent. I need to put this call in an async function and use then or I need to make the send to database call async as well so that it got queued only after this call gets finished.
                    break;
                default:
                    console.log("The expr does not match any available ones");
            }
        }
        const currentQuestionCount = questionCount;
        if (currentQuestionCount === questions.length - 1) {
            setQuestionsAnswered(true);
        }else {
            setQuestionCount(currentQuestionCount + 1);
        }
    }


    return (
        <Card style = {{"marginTop" : "240px", "width" : "400px", "marginLeft" : "auto", "marginRight" : "auto"}}>
            <Card.Title>{questions[questionCount].questionText}</Card.Title>
            <div className = "answersContainer" style = {{"marginLeft" : "150px"}}>
                {questions[questionCount].answerOptions.map((answerOption, index) => (
                    <Button onClick = {() => {handleAnswerButton(answerOption);}} key = {index}>{answerOption.answerText}</Button>
                ))}
            </div>
        </Card>
    )
}



//potential states for the qustions: novel, business, psychology,
//originally, this code should run in the background
//in the real app, you would send an array of questions
//then, you would need to send an array of answers from the client
//this way no analysis would be done on the client side
//server would have access to all the questions
//then, the analysis would be done on the server side
//no i am minimizing the way the genre is chosen by chosen the firest one that matches
//this is bad
//you send all the genres and answers and make a whole distribution for a user
//therefore, the question ids should be put back into numbers
//asking users time-to-time questions that are gonna enhance their experience of using the web app
//in traditional servers, you would send an object information that determines the group and
//the frontend would use it to further proceed on


//there should be a global or in-between-states contexts that tracks if the requests ended up being processed
//in between questions and dashboard, it takes some time for the database to get updated
//before it gets updated we cannot really display the next page
//or we can stay on the questions page till it finishes


//when the fourth user joins, we need to start the timer for the current chapter probably
//so apparently, firebase add or set resolves a promise when the entry is successfully saved on firebase
//some transitions from one page to another may take longer than the other ones and it should be basically fine