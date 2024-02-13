
import "./Card.css";

function Card({ name, image })
{
  return <img alt={name} src={image} />;
}

export default Card;