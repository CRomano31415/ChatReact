import React, { Component } from 'react';

class RoomList extends Component {
//to add a state you need the constructors
	constructor(props){
		super(props);
		this.state = {
			rooms: [],
			newRooms: ''
		}
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;

			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
	}

	createRoom(e) {
	  	e.preventDefault();
		this.roomsRef.push({
			name: this.state.newRooms
		});
		this.setState({ newRooms: '' });
	}


	handleChange(e) {
	  	this.setState({ newRooms: e.target.value });
	}


	render() {
		return (
			<div className="Rooms">
				<div className="RoomList">
				The active room through Room list is {  this.props.activeRoom }
		    	 { 
		    	 	this.state.rooms.map( (room, key) =>
						<li key={ room.key } room={ room.name } onClick={(e) => this.props.setActiveRoom(room.name)}>   
							{ room.name }
						</li>
				 )}
				</div>
				<div className="ChatRoom">
					<form>
					 Create new room
					 Enter a room name
					 <input type='text' value={ this.state.newRooms } onChange={ (e) => this.handleChange(e) } />
					 <button type='submit' id='Cancel'>Cancel </button> 
					 <button type='submit' value='Create room' onClick={(e) => this.createRoom(e)}>Create room </button> 
					</form>
				</div>
			</div>
		)
	}
}

export default RoomList;
