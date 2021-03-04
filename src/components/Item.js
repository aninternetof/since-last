import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRedo } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

const Item = (props) => {
  let { label, resetTimestamp, id } = props;
  let db = firebase.firestore();

  let differenceMinutes = Math.round(
    (Date.now() - resetTimestamp.toMillis()) / 60000
  );

  return (
    <div>
      <p>{label}</p>
      <p>{differenceMinutes} minutes ago</p>
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
