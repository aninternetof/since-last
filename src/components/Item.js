import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRedo,
  faEdit,
  faCheck,
  faUserMinus,
  faPlus,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "firebase";

const Item = (props) => {
  let { label, resetTimestamp, id, sharedWith } = props;
  if (sharedWith == null) {
    sharedWith = [];
  }
  let db = firebase.firestore();
  const [now, setNow] = useState(new Date());
  const [editingLabel, setEditingLabel] = useState(false);
  const [editingSharing, setEditingSharing] = useState(false);
  const [labelBuffer, setLabelBuffer] = useState(label);
  const [sharingBuffer, setSharingBuffer] = useState("");

  const tick = () => {
    setNow(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 60000);
    return () => {
      clearInterval(timerID);
    };
  });

  const handleLabelTyping = (e) => {
    setLabelBuffer(e.target.value.trim());
  };

  const handleSharingTyping = (e) => {
    setSharingBuffer(e.target.value.trim());
  };

  const finishEditing = () => {
    db.collection("items").doc(id).set(
      {
        label: labelBuffer,
      },
      { merge: true }
    );
    setEditingLabel(false);
  };

  const submitSharing = () => {
    sharedWith.push(sharingBuffer);
    db.collection("items").doc(id).set(
      {
        sharedWith: sharedWith,
      },
      { merge: true }
    );
    setSharingBuffer("");
  };

  let differenceMinutes = Math.round((now - resetTimestamp.toMillis()) / 60000);
  if (differenceMinutes < 0) {
    differenceMinutes = 0; // not sure why I need this...
  }
  const differenceHours = Math.floor(differenceMinutes / 60);
  const differenceRemainderMinutes = differenceMinutes % 60;

  return (
    <div>
      {editingLabel ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            finishEditing();
          }}
        >
          <Form.Group controlId="formLabel">
            <Form.Control
              autoFocus
              type="text"
              placeholder={label}
              onChange={handleLabelTyping}
            />
          </Form.Group>
        </Form>
      ) : (
        <p>{label}</p>
      )}
      <p>
        {differenceHours}h {differenceRemainderMinutes}m ago
      </p>
      <Button
        onClick={() => {
          db.collection("items").doc(id).delete();
        }}
        variant="danger"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button
        onClick={() => {
          db.collection("items").doc(id).set(
            {
              // resetTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              resetTimestamp: new Date(),
            },
            { merge: true }
          );
        }}
        variant="info"
      >
        <FontAwesomeIcon icon={faRedo} />
      </Button>
      <Button
        onClick={() => {
          if (editingLabel) {
            finishEditing();
          } else {
            setEditingLabel(true);
          }
        }}
        variant="secondary"
      >
        {editingLabel ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
      </Button>
      <Button
        onClick={() => {
          if (editingSharing) {
            setEditingSharing(false);
          } else {
            setEditingSharing(true);
          }
        }}
        variant="warning"
      >
        {editingSharing ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <FontAwesomeIcon icon={faShareSquare} />
        )}
      </Button>
      {editingSharing ? (
        sharedWith.map((person) => (
          <p key={person}>
            {person}
            <Button
              onClick={() => {
                db.collection("items")
                  .doc(id)
                  .set(
                    {
                      sharedWith: sharedWith.filter((item) => item !== person),
                    },
                    { merge: true }
                  );
              }}
              variant="warning"
            >
              <FontAwesomeIcon icon={faUserMinus} />
            </Button>
          </p>
        ))
      ) : (
        <></>
      )}
      {editingSharing ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group controlId="formLabel">
            <Form.Control
              type="email"
              placeholder="john@doe.com"
              value={sharingBuffer}
              onChange={handleSharingTyping}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitSharing}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Item;
