import Item from '../Item/Item';
import './styles.css';
import { Link } from 'react-router-dom';

const ItemlList = ({ items }) => {
  return (
    <div className="item-list-container">
      {items.map((item) => {
        return (
          <Link to={'/item/' + item.id} key={item.id}>
            <Item
              title={item.title}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ItemlList;
