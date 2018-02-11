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
			username: "Claudia"
		});
		this.setState({ newMessages: ''});
	}

	handleChange(e) {
	  	this.setState({ newMessages: e.target.value });
	}


	render() {
		return (
			<div className="Messages">
				<div className="ChatMessages">
		    	 { 
			    	 this.displayMessages().map( (msg) =>
						<li key={ msg.key } roomid={ msg.roomId } sentat={ msg.sentAt } username={ msg.username } >   
							{msg.username}: { msg.content }
						</li>
				 	)
				}

				</div>
				<div className="MsgForm">
					<form className="NewMsgForm">
					 <input className='MsgText' type='text' value={this.state.newMessages} onChange={ (e) => this.handleChange(e) } />
					 <button type='submit' value='Enter' onClick={(e) => this.enterMessage(e)}>Enter </button> 
					 </form>
				</div>
			</div>
		)
	}
}

export default MessageList;