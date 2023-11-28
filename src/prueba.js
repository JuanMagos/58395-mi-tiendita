import { productsList } from '../../data';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const uploadDataToFirestore = async () => {
  const db = getFirestore();

  const ordersCollection = collection(db, 'items');

  const promises = productsList.map((product) => {
    const newProduct = {
      ...product,
      stock: 60,
    };
    return addDoc(ordersCollection, newProduct);
  });
  try {
    await Promise.all(promises);
    console.log('Todos los datos han sido subidos a Firestore');
  } catch (error) {
    console.error('Error al subir datos:', error);
  }
};
