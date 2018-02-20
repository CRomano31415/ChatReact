import React, { Component } from 'react';
import '../styles/RoomList.css';


class RoomList extends Component {
//to add a state you need the constructors
	constructor(props){
		super(props);
		this.state = {
			rooms: [],
			newRooms: '',
			createNewRoom: false,
			editRoomName: false
		}
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
			this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) }, () => {console.log(this.state.rooms)});
		});
	}

	createRoom(e) {
	  	e.preventDefault();
		this.roomsRef.push({
			name: this.state.newRooms
		});
		this.setState({ newRooms: '' });
		this.setState({ createNewRoom: false});
	}

	cancelRoom(e){
		e.preventDefault();
		this.setState({ createNewRoom: false});
	}

	deleteRoom(e) {
	  	e.preventDefault();
	  	let activeRoomKey;
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

	editRoom(e) {
	  	e.preventDefault();
		this.setState({editRoomName: true});
	  	let activeRoomKey;
	  	//this will get me the active room's key
	  	this.state.rooms.forEach((element)=>{
		  	if(element.name === this.props.activeRoom){
	  			activeRoomKey = element.key;
	  			return;
		  	}
	  	});
	  	//using the key, update the item from db
		this.roomsRef.child(activeRoomKey).update({ name: this.state.newRooms }); 
		this.setState({ newRooms: '' });
		(this.state.rooms.length > 0) ? this.setState({ createNewRoom: false}) : this.setState({ createNewRoom: true});
	}

	ShowCreate(e) {
		this.setState({createNewRoom: true});
	}

	handleChange(e) {
	  	this.setState({ newRooms: e.target.value });
	}


	render() {
		return (
			<div className="Rooms">
				<div className="Title">
				Channels
				</div>
				<button type='submit' id='CreateNew' onClick={(e) => this.ShowCreate(e)}>New Room</button>
				{ this.state.createNewRoom &&
				<div className="ChatRoom">
					<form className="NewRoomForm">
					 Create new room
					 Enter a room name
					 <input className='RoomTxt' type='text' value={ this.state.newRooms } onChange={ (e) => this.handleChange(e) } />
					 <button type='submit' id='Cancel' onClick={(e) => this.cancelRoom(e)}>Cancel </button> 
					 <button type='submit' value='Create room' onClick={(e) => this.createRoom(e)}>Create room </button> 
					</form>
				</div>
				}
				<div className="RoomList">
				<ul>
		    	 { 
		    	 	this.state.rooms.map( (room, key) =>
						<li key={ room.key } room={ room.name } onClick={(e) => this.props.setActiveRoom(room.name)}>   
							{ room.name }
						</li>
				 	)}
			 	<button type='submit' id='Delete' onClick={(e) => this.deleteRoom(e)}>Delete a Room</button>
			 	<button type='submit' id='Edit' onClick={(e) => this.editRoom(e)}>Edit a Room's Name</button>
				{ this.state.editRoomName &&
				<div className="ChatRoom">
					 Enter a new room name for { this.props.activeRoom }
					 <input className='RoomTxt' type='text' value={ this.state.newRooms } onChange={ (e) => this.handleChange(e) } />
					 <button type='submit' value='Create room' onClick={(e) => this.editRoom(e)}> Update Name </button> 
				</div>
				}
				 </ul>
				</div>
			</div>
		)
	}
}

export default RoomList;
