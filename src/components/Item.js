import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRedo,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "firebase";

const Item = (props) => {
  let { label, resetTimestamp, id } = props;
  let db = firebase.firestore();
  const [now, setNow] = useState(new Date());
  const [editing, setEditing] = useState(false);
  const [labelBuffer, setLabelBuffer] = useState(label);

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
    console.log(e.target.value.trim());
  };

  const finishEditing = () => {
    db.collection("items").doc(id).set(
      {
        label: labelBuffer,
      },
      { merge: true }
    );
    setEditing(false);
  };

  let differenceMinutes = Math.round((now - resetTimestamp.toMillis()) / 60000);
  if (differenceMinutes < 0) {
    differenceMinutes = 0; // not sure why I need this...
  }
  const differenceHours = Math.floor(differenceMinutes / 60);
  const differenceRemainderMinutes = differenceMinutes % 60;

  return (
    <div>
      {editing ? (
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
              placeholder={labelBuffer}
              onChange={handleLabelTyping}
            />
          </Form.Group>
        </Form>
      ) : (
        <p>{labelBuffer}</p>
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
              resetTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
          if (editing) {
            finishEditing();
          } else {
            setEditing(true);
          }
        }}
        variant="secondary"
      >
        {editing ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
      </Button>
      <p></p>
    </div>
  );
};

export default Item;
