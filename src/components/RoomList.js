import React, { Component } from 'react';
import '../styles/RoomList.css';


class RoomList extends Component {
//to add a state you need the constructors
	constructor(props){
		super(props);
		this.state = {
			rooms: [],
			newRooms: '',
			createNewRoom: false
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
		this.setState({ createNewRoom: false});
	}

	cancelRoom(e){
		e.preventDefault();
		this.setState({ createNewRoom: false});
	}

	ShowCreate(e) {
		//does nothing right now, eventually toggle?
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
					<button type='submit' id='CreateNew' onClick={(e) => this.ShowCreate(e)}>New Room</button>
				</div>
				<div className="RoomList">
		    	 { 
		    	 	this.state.rooms.map( (room, key) =>
						<li key={ room.key } room={ room.name } onClick={(e) => this.props.setActiveRoom(room.name)}>   
							{ room.name }
						</li>
				 )}
				</div>
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
			</div>
		)
	}
}

export default RoomList;
