import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Item = (props) => {
  let { label, resetTimestamp, id } = props;
  return (
    <div>
      <p>{id}-{label}</p>
      <p>{resetTimestamp.toString()}</p>
      <FontAwesomeIcon icon={faTrash} />
      <p></p>
    </div>
  );
};

export default Item;
