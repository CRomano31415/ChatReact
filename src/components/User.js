import React, { Component } from 'react';
import '../styles/User.css';

class User extends Component {

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {

			(user != null) ?  this.props.setActiveUser(user.displayName) : this.props.setActiveUser(null);

		});
	}

	signIn(e) {
	  	e.preventDefault();

	 	const provider = new this.props.firebase.auth.GoogleAuthProvider();
	  	this.props.firebase.auth().signInWithPopup( provider );
	}

	signOut(e) {
	  	e.preventDefault();
		this.props.firebase.auth().signOut();
		this.props.setActiveUser(null);
	}

render(){
	return (
		<div className='UserName'>
			<button type='submit' onClick={(e) => this.signIn(e)}>Sign In</button>
			<button type='submit' onClick={(e) => this.signOut(e)}>Sign Out</button>
		</div>
		)
	}
}

export default User;