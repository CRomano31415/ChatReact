
import * as firebase from 'firebase';
import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import './styles/App.css';


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
		constructor(props){
		super(props);
		this.state = {
			activeRoom: '',
			newActiveRoom: ''
			}
		}

		setActiveRoom(roomname) {
	  	//highlight active room and modify state in App js
	  	this.setState({ activeRoom: roomname });

		}

  render() {
    return (
      <div className="App">
      	<ul>
	      	<RoomList firebase={ firebase } activeRoom={ this.state.activeRoom } setActiveRoom={ (e) => this.setActiveRoom(e) } />
	      	<MessageList firebase={ firebase } activeRoom={ this.state.activeRoom }/>
	    </ul>
      </div>
    );
  }
}

export default App;
