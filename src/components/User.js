import React, { Component } from 'react';

class User extends Component {

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setActiveUser(user.displayName);
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
			<h3>Set a username</h3>
			<button type='submit' onClick={(e) => this.signIn(e)}>Sign In</button>
			<button type='submit' onClick={(e) => this.signOut(e)}>Sign Out</button>
		</div>
		)
	}
}

export default User;