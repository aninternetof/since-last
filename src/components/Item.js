const Item = (props) => {
  let { label, resetTimestamp } = props;
  console.log(resetTimestamp);
  return (
    <div>
      <p>{label}</p>
      <p>{resetTimestamp.toString()}</p>
    </div>
  );
};

export default Item;
