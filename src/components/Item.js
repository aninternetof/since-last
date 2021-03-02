const Item = (props) => {
  let { label, resetTimestamp, id } = props;
  return (
    <div>
      <p>{id}-{label}</p>
      <p>{resetTimestamp.toString()}</p>
      <p></p>
    </div>
  );
};

export default Item;
