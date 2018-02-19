
import * as firebase from 'firebase';
import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
			activeRoom: null,
			newActiveRoom: '',
			activeUser: null
			}
		}

		setActiveRoom(roomname) {
	  	this.setState({ activeRoom: roomname });

		}

		setActiveUser(username) {
	  	this.setState({ activeUser: username });

		}

  render() {
    return (
      <div className="App">
	    <User firebase={ firebase } activeUser={ this.state.activeUser} setActiveUser={ (e) => this.setActiveUser(e) } />
	    { this.state.activeUser &&
      		<div className="AppContainer">
			<RoomList firebase={ firebase } activeRoom={ this.state.activeRoom } setActiveRoom={ (e) => this.setActiveRoom(e) } />
			<MessageList firebase={ firebase } activeRoom={ this.state.activeRoom } activeUser={ this.state.activeUser } />
			</div>
		}
	  </div>
    );
  }
}

export default App;
