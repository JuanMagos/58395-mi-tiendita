import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Item from '../../components/Item/Item';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import {
  collection,
  getFirestore,
  addDoc,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

import './styles.css';
const Cart = () => {
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const { products, clear, removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleInput = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm =
    formValue.name === '' || formValue.phone === '' || formValue.email === '';

  const createOrder = (event) => {
    event.preventDefault();
    const querySnapshot = collection(db, 'orders');
    const newOrder = {
      buyer: formValue,
      items: products.map((product) => {
        return {
          title: product.title,
          price: product.price,
          id: product.id,
          quantity: product.quantity,
        };
      }),
      date: new Date(),
      total: products.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      ),
    };

    addDoc(querySnapshot, newOrder)
      .then((response) => {
        updateProductStock();
        alert(`ORDEN CREADA CON EXITO! ID: ${response.id}`);
        clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error al crear la orden');
      });
  };

  const updateProductStock = () => {
    const batch = writeBatch(db);
    products.forEach((product) => {
      const querySnaphot = doc(db, 'items', product.id);
      batch.update(querySnaphot, {
        stock: product.stock - product.quantity,
      });
    });
    batch.commit().then((res) => console.log('Stock actualizado'));
  };

  return (
    <div>
      <h1>Tu carrito de compras</h1>
      <button onClick={clear}>Vaciar carrito</button>
      <Form className="form-container">
        <Form.Group className="mb-3 formulario">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Nombre"
            value={formValue.name}
            onChange={handleInput}
            name="name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 formulario">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Telefono"
            value={formValue.phone}
            onChange={handleInput}
            name="phone"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 formulario">
          <Form.Label>Direccion de E-Mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu E-Mail"
            value={formValue.email}
            onChange={handleInput}
            name="email"
            required
          />
        </Form.Group>
        <button
          onClick={createOrder}
          className="confirmar"
          type="submit"
          disabled={validateForm}
        >
          Confirmar compra
        </button>
      </Form>
      {products.length > 0 ? (
        <div className="item-list-container">
          {products.map((item) => {
            return (
              <div key={item.id}>
                <Item
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  action={() => removeItem(item.id)}
                  textButton="Eliminar"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <h2>No hay productos en el carrito</h2>
      )}
    </div>
  );
};

export default Cart;
