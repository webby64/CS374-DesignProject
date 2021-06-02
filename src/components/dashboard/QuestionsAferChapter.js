import React, {useEffect, useState} from 'react';
import { Card , Container} from 'react-bootstrap';
import {db} from '../../firebase';





export default function QuestionsAfterChapter(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    //const [genre, setGenre] = useState()
    const {genre, bookId, currentChapter} = props;
    const [clickedNumber, setClickedNumber] = useState(0);

    useEffect(() => {
        if (clickedNumber === 3) {
            console.log("send the request");
            props.updateQuestionsAnswered();   
        }
    }, [clickedNumber])
    
    useEffect(() => {
        db.collection("Books").doc(genre)
        .collection(`${genre}Books`).doc(bookId)
        .collection("Chapters").doc(currentChapter.toString())
        .collection("Questions").get().then((querySnapshot) => {
            querySnapshot.forEach((questionDoc) => {
                console.log(questionDoc.data())
                setQuestions(prevQuestions => [...prevQuestions, questionDoc.data()])
            })
            setIsLoading(false);
        })
    }, [])

    return (
        <Container >
            <Card style = {{"backgroundColor" : "white", "color" : "#ff9b05", "fontWeight" : "800", "border" : "2px solid "}}>
                <Card.Body>
                    <Card.Title><strong>Discuss about the following questions:</strong></Card.Title>
                    {questions.map((question, index) => <QuestionContainer key = {index} text = {question.text} incrementClickedNumber = {() => {setClickedNumber(prev => prev + 1)}}/>)}
                </Card.Body>
            </Card>
        </Container>
    )
}


function QuestionContainer(props) {
    const [checked, setChecked] = useState(false);
    

    function handleClick() {
        setChecked(true);
        props.incrementClickedNumber();
    }

    return (
        <Card.Text>
            <input type = "checkbox" onClick = {handleClick} disabled = {checked}/>
            {props.text}
        </Card.Text>
    )
}