import { useContext, useEffect, useState } from 'react';
import ItemlList from '../../components/ItemList/ItemlList';
import { ThemeContext } from '../../context/ThemeContext';
import { useParams } from 'react-router-dom';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';

const ItemListContainer = () => {
  const colorTheme = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  const fetchProducts = () => {
    const db = getFirestore();
    const productsQuery = collection(db, 'items');
    const idFormated = id?.includes('-') ? id?.replace('-', ' ') : id;

    const querySnaphot = !id
      ? productsQuery
      : query(productsQuery, where('category', '==', idFormated));

    getDocs(querySnaphot)
      .then((response) => {
        const products = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setItems(products);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: colorTheme.theme === 'light' ? 'white' : 'gray',
      }}
    >
      <ItemlList items={items} />
    </div>
  );
};

export default ItemListContainer;
