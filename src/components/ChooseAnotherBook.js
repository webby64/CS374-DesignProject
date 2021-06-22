import React, {useEffect, useState} from 'react';
import {db} from '../firebase';
import {useAuth} from '../contexts/AuthContext';
import {Card, Button} from 'react-bootstrap';
import firebase from 'firebase/app';
import {useHistory} from 'react-router-dom';




export default function ChooseAnotherBook() {
    const {currentUser} = useAuth();
    const [genre, setGenre] = useState('novels');
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState();
    

    


    useEffect(() => {
        db.collection("Books").doc(genre).collection(`${genre}Books`).get().then((booksQuerySnapshot) => {
            let allBooksArray = [];
            booksQuerySnapshot.forEach((bookDoc) => {
                allBooksArray.push({...bookDoc.data(), id : bookDoc.id});
                console.log(bookDoc.data());
            });
            setBooks(allBooksArray);
        }).then(() => {
            db.collection("Users").doc(currentUser.uid).get().then((userDoc) => {
                setUser(userDoc.data());
            })
        })
    }, [genre])


    

    return (
        <div style = {{marginTop : "5vh", display : "flex", flexDirection : "column", alignItems : "center"}}>
            <div style = {{margin : "1vh"}}>
                <Button style={{"margin":"5px"}} onClick = {() => {setGenre('novels')}}>Novels</Button>
                <Button style={{"margin":"5px"}} onClick = {() => {setGenre('philosophy')}}>Philosophy</Button>
                <Button style={{"margin":"5px"}} onClick = {() => {setGenre('psychology')}}>Psychology</Button>
                <Button style={{"margin":"5px"}} onClick = {() => {setGenre('non-fiction')}}>Non-finction</Button>
            </div>
            <div>
                {books.map((book) => <BookCard key = {book.id} title = {book.title} author = {book.author} genre = {genre} bookID = {book.id}/>)}
                {/* {JSON.stringify(user)} */}
            </div>
        </div>
    )
}


function BookCard(props) {

    const {currentUser} = useAuth();
    const history = useHistory();

    async function getBook(genre) {
        return new Promise(resolve => {
            db.collection("Books").doc(genre).collection(`${genre}Books`)
            .doc(props.bookID).get().then((bookDoc) => {
                resolve({...bookDoc.data(), id : bookDoc.id});
            });
        })
    }
    
    
    async function updateToUsers(groupInfo) {
        return new Promise (resolve => {
            db.collection("Users").doc(currentUser.uid).update({
            groupInfo : groupInfo
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
                        members : [currentUser.uid],
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
                            members : firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
                            currentChapterStartDate : firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {resolve({groupID : doc.id, genre : genre})})
                    }
                    else if (doc.data().groupSize < 4) {
                        db.collection("Groups").doc(genre).collection(`${genre}Groups`).doc(doc.id).update({
                            groupSize : firebase.firestore.FieldValue.increment(1),//incrementing the value might be unnecessary cause the size of the array changes and you can prolly get it
                            members : firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                        }).then(() => {resolve({groupID : doc.id, genre : genre})})
                    } else {
                        db.collection("Groups").doc(genre).collection(`${genre}Groups`).add({
                            groupSize : 1,
                            bookInfo : bookObject,
                            progress : 0,
                            members : [currentUser.uid],
                            currentChapterNumber : 1,
                            totalChapterNumber : 0,
                            createdAt : firebase.firestore.FieldValue.serverTimestamp()
                        }).then((docRef) => {resolve({groupID : docRef.id, genre : genre})})
                    } 
                })
            })
        })
    }

    async function handleButton() {
        let bookID = await getBook(props.genre);
        let groupID = await addToGroups(props.genre, bookID);
        await updateToUsers(groupID);
        history.push('/');
    }

    

    return ( 
        <Card style = {{ "flexBasis" : "33%", marginBottom : "2vh"}}>
            <Card.Body>
                <Card.Text>
                    {props.title}
                </Card.Text>
                <Card.Text>
                    {props.author}
                </Card.Text>
                <Button style = {{"marginLeft" : "4vw"}} onClick = {handleButton}>Choose</Button>
            </Card.Body>
        </Card>
    )
}









//the logic must be built upon sets
//We need to store the books a user read
//Then, to find the outer intersection of the ones a user read
//However, in this app, we will just put all the available options and let the user choose the book