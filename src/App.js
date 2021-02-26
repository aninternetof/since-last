import "./App.css";

import React, { Component } from "react";
import firebase from "firebase";

import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

class App extends Component {
  authRef = null;

  state = {
    user: null,
  };

  componentDidMount() {
    this.authRef = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authRef && this.authRef.off();
  }

  onSignInPress() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onSignOutPress() {
    firebase.auth().signOut();
  }

  checkUser() {
    if (!this.state.user) {
      alert("You must be logged in");
      return false;
    }
    return true;
  }

  render() {
    let { user } = this.state;

    return (
      <Container className="p-3">
        {user == null ? null : (
          <Button onClick={this.onSignOutPress} variant="outline-dark">
            Log out
          </Button>
        )}
        <Jumbotron>
          <h1 className="header">Welcome To React-Bootstrap</h1>
        </Jumbotron>
        {user == null ? (
          <Button onClick={this.onSignInPress} variant="outline-dark">
            Continue with your Google account
          </Button>
        ) : null}
      </Container>
    );
  }
}

export default App;
