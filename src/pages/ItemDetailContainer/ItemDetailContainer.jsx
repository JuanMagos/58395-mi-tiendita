import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ItemDetailContainer = () => {
  const [itemSelected, setItemSelected] = useState(null);
  const { id } = useParams();

  const fetchProduct = () => {
    const db = getFirestore();
    const querySnapshot = doc(db, 'items', id);
    getDoc(querySnapshot)
      .then((res) => {
        setItemSelected({
          id: res.id,
          ...res.data(),
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {id && (
        <div className="item-detail-container">
          <ItemDetail itemSelected={itemSelected} />
        </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
