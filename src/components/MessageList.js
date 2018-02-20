import React, { Component } from 'react';
import '../styles/MessageList.css';


class MessageList extends Component {
//to add a state you need the constructors
	constructor(props){
		super(props);
		this.state = {
			messages: [],
			newMessages: ''
		}
		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.msgRef = this.props.firebase.database().ref('message');
	}


	componentDidMount() {
		this.msgRef.on('child_added', snapshot => {
			const msg = snapshot.val();
			msg.key = snapshot.key;

			this.setState({ messages: this.state.messages.concat( msg ) });
		});
	}

	displayMessages() {
		let msgs = this.state.messages;
		let roomId = this.props.activeRoom;
		let roomMsgs = msgs.filter(msg => msg.roomId === roomId);
		return roomMsgs 
	}

	enterMessage(e) {
	  	e.preventDefault();
		this.msgRef.push({
			content: this.state.newMessages,
			roomId: this.props.activeRoom,
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			username: this.props.activeUser
		});
		this.setState({ newMessages: ''});
	}

	// updateMessage(e) {
	//   	e.preventDefault();
	// 	this.msgRef.child(put key here).update({
	// 		content: this.state.newMessages,
	// 		roomId: this.props.activeRoom,
	// 		sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
	// 		username: this.props.activeUser
	// 	});
	// 	this.setState({ newMessages: ''});
	// }

	deleteMsg(e) {
	  	e.preventDefault();
	  	let activeRoomKey;
	  	let activeMsgKey;
	  	//this will get me the active room's key
	  	this.state.rooms.forEach((element)=>{
		  	if(element.name === this.props.activeRoom){
	  			activeRoomKey = element.key;
	  			return;
		  	}
	  	});
	  	//using the key, remove the item from db
		this.roomsRef.child(activeRoomKey).remove(); 
		this.setState({ newRooms: '' });
		(this.state.rooms.length > 0) ? this.setState({ createNewRoom: false}) : this.setState({ createNewRoom: true});
	}


	handleChange(e) {
	  	this.setState({ newMessages: e.target.value });
	}


	render() {
		return (
			<div className="Messages">
				{ this.props.activeRoom &&
					<div className="ChatMessages">
					<ul>
			    	 { 
				    	 this.displayMessages().map( (msg) =>
							<li key={ msg.key } roomid={ msg.roomId } sentat={ msg.sentAt } username={ msg.username } >   
								{msg.username}: { msg.content }
								<input type="checkbox" key={ msg.key }/>
							</li>
					 	)
					 }
					 </ul>
					</div>
				}{ this.props.activeRoom &&
					<div className="MsgForm">
						<form className="NewMsgForm">
						 {this.props.activeUser + " : "}
						 <input className='MsgText' type='text' value={this.state.newMessages} onChange={ (e) => this.handleChange(e) } />
						 <button type='submit' value='Enter' onClick={(e) => this.enterMessage(e)}>Enter </button> 
						 <button type='submit' value='Delete' onClick={(e) => this.deleteMsg(e)}>Delete Selected Messages </button> 
						 </form>
					</div>
				} { this.props.activeRoom === null && "Select a room to view messages"}
			</div>
		)
	}
}

export default MessageList;