import React, { Component } from 'react';

class RoomList extends Component {
//to add a state you need the constructors
	constructor(props){
		super(props);
		this.state = {
			rooms: []
		}
//	this.roomsRef = this.props.firebase.database().ref('rooms');
	}


	componentDidMount() {
//		this.roomsRef.on('child_added', snapshot => {
//			console.log(snapshot);
			console.log("here");
//		});
	}

	render() {
		return (
			<li> hi </li>
			);
	}
}

export default RoomList;
