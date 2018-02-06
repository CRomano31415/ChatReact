
import * as firebase from 'firebase';
import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAGtc4XttGB4NXgRbG3eBd7tBeeBIoZuSU",
    authDomain: "react-chat-54321.firebaseapp.com",
    databaseURL: "https://react-chat-54321.firebaseio.com",
    projectId: "react-chat-54321",
    storageBucket: "react-chat-54321.appspot.com",
    messagingSenderId: "435674069481"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
      	<ul>
	      	<RoomList firebase={firebase}/>
	    </ul>
      </div>
    );
  }
}

export default App;
