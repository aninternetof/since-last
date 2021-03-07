import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRedo } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

const Item = (props) => {
  let { label, resetTimestamp, id } = props;
  let db = firebase.firestore();
  const [now, setNow] = useState(new Date());

  const tick = () => {
    setNow(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 60000);
    return () => {
      clearInterval(timerID);
    };
  });

  let differenceHours = Math.floor((now - resetTimestamp.toMillis()) / 3600000);
  let differenceMinutes =
    Math.round((now - resetTimestamp.toMillis()) / 60000) -
    differenceHours * 60;

  return (
    <div>
      <p>{label}</p>
      <p>
        {differenceHours}h {differenceMinutes}m ago
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
      <p></p>
    </div>
  );
};

export default Item;
