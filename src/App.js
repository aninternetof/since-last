import "./App.css";

import React, { Component } from "react";
import firebase from "firebase";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";

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

  // componentWillUnmount() {
  //   this.authRef && this.authRef.off();
  // }

  onGoogleSignInPress() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onGithubSignInPress() {
    let provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  onTwitterSignInPress() {
    let provider = new firebase.auth.TwitterAuthProvider();
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
      <>
        {user == null ? null : (
          <Navbar bg="light" expand="lg" className="justify-content-end">
            <Button onClick={this.onSignOutPress} variant="link">
              Log Out
            </Button>
            <Image
              alt=""
              src={user.photoURL}
              width="38"
              height="38"
              className="d-inline-block align-top"
              roundedCircle
            />
          </Navbar>
        )}
        <Container className="p-3">
          {user == null ? (
            <>
              <Button onClick={this.onGoogleSignInPress} variant="outline-dark">
                Continue with your Google account
              </Button>
              <Button onClick={this.onGithubSignInPress} variant="outline-dark">
                Continue with your Github account
              </Button>
              <Button
                onClick={this.onTwitterSignInPress}
                variant="outline-dark"
              >
                Continue with your Twitter account
              </Button>
            </>
          ) : null}
        </Container>
      </>
    );
  }
}

export default App;
