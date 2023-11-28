import './styles.css';

const Item = ({
  title,
  description,
  price,
  image,
  quantity,
  action,
  textButton,
}) => {
  return (
    <div className="card-container">
      <h6 className="card-title">{title}</h6>
      <img src={image} alt={title} width={70} />
      <div className="card-description">
        <p>{description}</p>
      </div>
      {quantity && <span>Cantidad: {quantity}</span>}
      <p>${price}</p>
      {action && textButton && (
        <button onClick={() => action()}>{textButton}</button>
      )}
    </div>
  );
};

export default Item;
