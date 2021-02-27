import "./App.css";

import React, { Component } from "react";
import firebase from "firebase";

import Row from "react-bootstrap/Row";
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
    console.log("hey");
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
        <Container style={{ width: "80%", marginTop: "60px" }}>
          {user == null ? (
            <>
              <Row style={{ marginBottom: "40px" }}>
                <h1>
                  Keep track of how long it has been since you did something.
                </h1>
              </Row>
              <Row>
                <h3>Continue with</h3>
              </Row>
              <Row>
                <Button
                  block
                  size="lg"
                  onClick={this.onGoogleSignInPress}
                  variant="danger"
                  className={"login-button"}
                >
                  Google
                </Button>
              </Row>
              <Row>
                <Button
                  block
                  size="lg"
                  onClick={this.onTwitterSignInPress}
                  variant="primary"
                  className={"login-button"}
                >
                  Twitter
                </Button>
              </Row>
              <Row>
                <Button
                  block
                  size="lg"
                  onClick={this.onGithubSignInPress}
                  variant="dark"
                  className={"login-button"}
                >
                  Github
                </Button>
              </Row>
            </>
          ) : null}
        </Container>
      </>
    );
  }
}

export default App;
