const db = require('./firebaseConfig');
const data = require('./data');

async function uploadData() {
  const collectionRef = db.collection('items'); // Reemplaza con el nombre de tu colección

  const promises = data.map((item) => {
    return collectionRef.doc(item.id.toString()).set(item);
  });

  try {
    await Promise.all(promises);
    console.log('Todos los datos han sido subidos a Firestore');
  } catch (error) {
    console.error('Error al subir datos:', error);
  }
}

uploadData();
