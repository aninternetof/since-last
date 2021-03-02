import "./App.css";

import React, { Component } from "react";
import firebase from "firebase";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";

import Item from "./components/Item";

class App extends Component {
  authRef = null;

  state = {
    user: null,
    items: [],
  };

  componentDidMount() {
    this.authRef = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user,
      });
      if (user != null) {
        this.loadMessages();
      }
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

  createItem() {
    let db = firebase.firestore();
    db.collection("items").add({
      owner: firebase.auth().currentUser.uid,
      label: "The baby ate",
      resetTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createdTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  loadMessages() {
    firebase
      .firestore()
      .collection("items")
      .where("owner", "==", firebase.auth().currentUser.uid)
      // .orderBy("createdTimestamp")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.metadata.hasPendingWrites) {
          return;
        }
        this.setState({
          items: querySnapshot.docs,
        });
      });
  }

  render() {
    let { user, items } = this.state;

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
        <Container
          style={{ width: "80%", maxWidth: "800px", marginTop: "60px" }}
        >
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
          ) : (
            <>
              {items.map((item) => (
                <Item key={item.id} id={item.id} {...item.data()} />
              ))}
              <Button
                block
                size="lg"
                onClick={this.createItem}
                variant="dark"
                className={"login-button"}
              >
                Add Item
              </Button>
            </>
          )}
        </Container>
      </>
    );
  }
}

export default App;
