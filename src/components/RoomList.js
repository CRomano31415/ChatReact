import React, { Component } from 'react';

class RoomList extends Component {
//to add a state you need the constructors
	constructor(props){
		super(props);
		this.state = {
			rooms: []
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

	render() {
		return (
			<div className="RoomList">
	    	 { 
	    	 	this.state.rooms.map( (room, key) =>
				<li key={ room.key } room={ room.name }>   
					{ room.name }
				</li>
			 )}
			</div>
		)
	}
}

export default RoomList;
