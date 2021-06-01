import Signup from "./Singup";
import Dashboard from "./dashboard/Dashboard";
import Login from "./Login";
import Questions from './Questions';
import {Container} from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import FinishedBookView from "./FinishedBookView";
import React, {useEffect} from 'react';
import ChooseAnotherBook from './ChooseAnotherBook';
//switch to be able to determine which page we are currently on
//route to determine which route on the page we are going to

function App() {
  useEffect(() => {
    console.log("APP mounted");
  }, [])
  //AuthProvider prolly may be outside, but it is easier to work with it as here}
  return (
      <div style = {{"width" : "100%", "margin" : "0", "padding" : "0"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path = "/" component = {Dashboard}/>
              <Route path = "/finished-book" component = {ChooseAnotherBook}/>
              <Route path = "/signup" component = {Signup}/>
              <Route path = "/login" component = {Login}/>
              <Route path = "/quiz" component = {Questions}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    
  );
}

export default App;
