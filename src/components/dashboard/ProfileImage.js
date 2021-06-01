import React, {useState, useEffect} from 'react';
import Popup from './components/Popup'
import "./ProfileImage.css"
import ProgressRing from './components/ProgressRing.js'
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaListAlt, FaClipboardList} from 'react-icons/fa'
import {BsGraphUp} from 'react-icons/bs'
import Chart from './components/Chart.js'
import {useAuth} from '../../contexts/AuthContext';

import {db} from '../../firebase';
import { useRouteMatch } from 'react-router';

function NonIdiomaticList(props) {
  // Build an array of items
  let array = [];
  for(let i = 0; i < props.items.length; i++) {
    array.push(
      <ul  key = {i} id="eachListItem"> {props.items[i]} </ul>
    );
  }
  // Render it
  return (
    <div>
      {array}
    </div>
  );
}

// Show the Modal/ Popup
function ViewMainModal(buttonPopup, setButtonPopup) {

  const clickAdd = React.useRef(null)
  const clickChangeFavBook = React.useRef(null)
  const clickChangeFavAuthor = React.useRef(null)

  const [userData, setUserData] = useState([])

  const [whichModalState, setState] = useState('mainModal')
  const [addedItem, setAddedItem] = useState("")
  const [wishListState, setWishList] = useState([]);
  const [booksReadState, setbooksReadState] = useState("")
  const [favBookState, setFavBookState] = useState("")
  const [favAuthorState, setFavAuthorState] = useState("")
  const [numBooksReadState, setNumBooksReadState] = useState(0)
  const [groupContributionState, setGroupContributionstate] = useState(25)
  const [numBooksReadList, setnumBooksReadList] = useState([])
  const [pagesReadList, setpagesReadList] = useState([])
  const [bookProgress, setProgress] = useState(0)
  const [favBookChanged, setFavBook] = useState('')
  const [favAuthorChanged, setFavAuthor] = useState('')
  const [nameState, setNameState] = useState('')
  const [chartLabelsState, setChartLabelsState] = useState([])

  const [bookImgUrl, setBookImgUrl] = useState('')
  const [userProfilePicUrl, setUserProfilePicUrl] = useState('')


  const currentUserID = useAuth().currentUser.uid
 

  useEffect(() => { 
    db
      .collection('Users')
      .get()
      .then((snapshot) => {
          
          for (var i= 0; i < snapshot.docs.length; i++) {
              const currSnap = snapshot.docs[i]
              console.log('curr', currSnap.id)
              if (currSnap.id === currentUserID) {
                  var theUserObject = currSnap.data()
              }
          }
          
          setUserData(prevUserData => [...prevUserData, theUserObject])
          setGroupContributionstate(theUserObject.groupContr)
          setbooksReadState(theUserObject.booksRead)
          setWishList(theUserObject.wishList)
          setFavAuthorState(theUserObject.favAuthor)
          setFavBookState(theUserObject.favBook)
          setNumBooksReadState(theUserObject.numberOfBooks)
          setnumBooksReadList(theUserObject.numBooksList)
          setpagesReadList(theUserObject.pagesReadList)
          setProgress(theUserObject.chaptersRead * 20)
          setNameState(theUserObject.name)
          setChartLabelsState(theUserObject.chartLabels)
          setUserProfilePicUrl(theUserObject.imgUrl)
          
      });

      db
      .collection('Books')
      .get()
      .then((snapshot) => {
        const currSnap = snapshot.docs[0]
        setBookImgUrl(currSnap.data().imgUrl)})
  }, [])


  console.log("after getting it", userData)
  

  var statState = {
                labels: chartLabelsState ,
                datasets: [
                  {
                    label: 'Number of Books Read',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: numBooksReadList
                  }
                ]
              }
  
  var pagesState = {
    labels: chartLabelsState ,
    datasets: [
      {
        label: 'Pages Read',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: pagesReadList,
      }
    ]
  }     

  // var uniqueWordsState = {
  //   labels: ['Week 1', 'Week 2','Week 3','Week 4','Week 5',"Week 6"],
  //   datasets: [
  //     {
  //       label: 'Unique Words',
  //       fill: false,
  //       lineTension: 0,
  //       backgroundColor: 'rgba(75,192,192,1)',
  //       borderColor: 'rgba(0,0,0,1)',
  //       borderWidth: 2,
  //       data: [0, 1000, 2000, 2300, 2400]
  //     }
  //   ]
  // }
  

  function writefavBookToDB(value) {
    db.collection('Users').doc(currentUserID).update({
    favBook: value,
    })
  }

  function writefavAuthortoDB(value) {
    db.collection('Users').doc(currentUserID).update({
      favAuthor: value,
      })
  }

  function writewishListtoDB(value) {
    db.collection('Users').doc(currentUserID).update({
      wishList: value,
      })
  }



  return(
    <Popup trigger={buttonPopup} setTrigger = {setButtonPopup}>
      <Button id = "bookList-btn" variant="light" onClick={() => setState("bookList")}><FaListAlt/> Book List</Button>
      <Button id = "wishList-btn" variant="light" onClick={() => setState("wishList")}><FaClipboardList/> Wish List</Button>
      <Button id = "stats-btn" variant="light" onClick={() => setState("stats")}><BsGraphUp/> Stats</Button>

      {whichModalState === 'mainModal' && (
        <div id="avatarAndProgressRing">
          <h2 id = "userNameModal">{nameState}</h2>

          <img id = "profileImg-modal" src = {userProfilePicUrl} alt="avatar"></img>
          
          <div id = "progressRing"><ProgressRing totalProgress = {bookProgress}/></div> {/* TotalProgress is the Users' current progress recorded.*/}
          
          <div id="backgroundCircle">
            <svg overflow="visible">
              <circle id = 'progressBGCircle' r="100" stroke="#C94747" strokeWidth="20" fill="transparent"/>
            </svg>
          </div>

          <div id='favBook'>My Fav Book: <div id = "userInfoPageDetails" className="badge bg-highlight text-wrap">{favBookState}</div></div>

          
            <input id = "changeFavBook-input" placeholder = "Insert new Book Title" type='text' name="Add-Fav-Book" 
                value = {favBookChanged} onChange={event => setFavBook(event.target.value)}
                onKeyDown = {e => {if (e.key === 'Enter') clickChangeFavBook.current.click()}}
              />
            <Button ref={clickChangeFavBook} 
                id = "changeFavBook-btn" className = 'btn-sm' variant='secondary' 
                onClick = {() => {if (favBookChanged !== "") {setFavBookState(favBookChanged); writefavBookToDB(favBookChanged); setFavBook('')} else alert("Please Insert the book Title") }}></Button>
          
          <div id='favAuthor'>My Fav Author: <span id = "userInfoPageDetails" className="badge bg-highlight text-wrap">{favAuthorState}</span></div>
          <input id = "changeFavAuthor-input" placeholder = "Insert new Author Name" type='text' name="Add-Fav-Author" 
              value = {favAuthorChanged} onChange={event => setFavAuthor(event.target.value)}
              onKeyDown = {e => {if (e.key === 'Enter') clickChangeFavAuthor.current.click()}}
            />
          <Button ref={clickChangeFavAuthor} 
              id = "changeFavAuthor-btn" className = 'btn-sm' variant='secondary' 
              onClick = {() => {if (favAuthorChanged !== "") {setFavAuthorState(favAuthorChanged); writefavAuthortoDB(favAuthorChanged);setFavAuthor('')} else alert("Please Insert the Author Name") }}></Button>
          
          <div id='booksReadText'>Number of Books Read: <span id = "userInfoPageDetails">{numBooksReadState}</span></div>
          <div id='groupContribution'>Group Contribution: <span id = "userInfoPageDetails">{groupContributionState}%</span></div>

        </div>
      )}

      {whichModalState === 'bookList' && (
        <div>      
          <Button id="myPage-btn" variant="light" size="sm"onClick={() => setState("mainModal")}>My Page</Button>
          <div className = "theLists">
            <div id = "boxInList">Books Read:
            <NonIdiomaticList items = {booksReadState}/> 
            </div>
          </div>
        </div>
      )}

      {whichModalState === 'wishList' && (
         <div>
         <Button id="myPage-btn" variant="light" size="sm"onClick={() => setState("mainModal")}>My Page</Button>
         <div className = "theLists">
          <div id = 'boxInList'>Wish List:
          <NonIdiomaticList items = {wishListState}/>
          <input id = "askAddBook" placeholder = "Insert Book Title" type='text' name="Add Book" 
              value = {addedItem} onChange={event => setAddedItem(event.target.value)}
              onKeyDown = {e => {if (e.key === 'Enter') clickAdd.current.click()}}
              />
          <Button variant = "secondary" className='btn-sm' id = "addWish-btn" 
                  onClick = {() => {if (addedItem !== "") {setWishList(wishListState.concat(addedItem)); writewishListtoDB(wishListState.concat(addedItem));setAddedItem('')} else alert("Please add the book title First")}}
                  ref = {clickAdd}
                  >Add</Button>
          </div>
         </div>
       </div>
      )}

      {whichModalState === 'stats' && (
         <div>      
          <Button id="myPage-btn" variant="light" size="sm"onClick={() => setState("mainModal")}>My Page</Button>
          <div className="userInfoGraph">{Chart(statState)}</div>
          <Button id="booksRead-btn" style = {{ border: "3px solid green"}} variant="light" size="sm"onClick={() => setState("stats")}>Books Read</Button>
          {/* <Button id="uniqueWords" variant="light" size="sm"onClick={() => setState("uniqueWordsStat")}>Unique Words</Button> */}
          <Button id="pagesRead-btn" variant="light" size="sm"onClick={() => setState("pagesReadStat")}>Pages Read</Button>
       </div>
      )}

      {/* {whichModalState === 'uniqueWordsStat' && (
         <div>      
          <Button id="myPage-btn" variant="light" size="sm"onClick={() => setState("mainModal")}>My Page</Button>
          <div className="userInfoGraph">{Chart(uniqueWordsState)}</div>
          <Button id="booksRead" variant="light" size="sm"onClick={() => setState("stats")}>Books Read</Button>
          <Button id="uniqueWords" style = {{ border: "2px solid white"}} variant="light" size="sm"onClick={() => setState("uniqueWordsStat")}>Unique Words</Button>
          <Button id="pagesRead" variant="light" size="sm"onClick={() => setState("pagesReadStat")}>Pages Read</Button>
       </div>
      )} */}
      
      {whichModalState === 'pagesReadStat' && (
         <div> 
          <Button id="myPage-btn" variant="light" size="sm"onClick={() => setState("mainModal")}>My Page</Button>
          <div className="userInfoGraph">{Chart(pagesState)}</div>
          <Button id="booksRead-btn" variant="light" size="sm"onClick={() => setState("stats")}>Books Read</Button>
          {/* <Button id="uniqueWords" variant="light" size="sm"onClick={() => setState("uniqueWordsStat")}>Unique Words</Button> */}
          <Button id="pagesRead-btn" style = {{ border: "3px solid green"}} variant="light" size="sm"onClick={() => setState("pagesReadStat")}>Pages Read</Button>
       </div>
      )}
    </Popup>
  )
}


function ProfileImage() {
  const [buttonPopup, setButtonPopup] = useState(false)
  const [userProfilePicUrl, setUserProfilePicUrl] = useState('')
  const [currBookPicUrl, setCurrPicUrl] = useState('')
  const currentUserID = useAuth().currentUser.uid;

  useEffect(() => { 
    db
      .collection('Users')
      .get()
      .then((snapshot) => {
        for (var i= 0; i < snapshot.docs.length; i++) {
          const currSnap = snapshot.docs[i]
          if (currSnap.id === currentUserID) {
            var theUserObject = currSnap.data()
          }
        }
      setUserProfilePicUrl(theUserObject.imgUrl)
      setCurrPicUrl(theUserObject.bookImgUrl)

    })
  })

  return (
    <div className="ProfileImage">
      <main>
        {/* <h1>React popups</h1>
        <br/>
        <Button onClick = {() => setButtonPopup(true)}> open Popup</Button> */}

        <div>
          {ViewMainModal(buttonPopup, setButtonPopup)}
        </div>
        <img id = "profileImg-frontpage" onClick = {() => setButtonPopup(true)} src = {userProfilePicUrl} alt="avatar"></img>
      </main>
    </div>
  );
}

export default ProfileImage;
