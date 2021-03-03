import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

const Item = (props) => {
  let { label, resetTimestamp, id } = props;
  let db = firebase.firestore();

  return (
    <div>
      <p>
        {id}-{label}
      </p>
      <p>{resetTimestamp.toString()}</p>
      <Button
        onClick={() => {
          db.collection("items").doc(id).delete();
        }}
        variant="danger"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <p></p>
    </div>
  );
};

export default Item;
