import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './pages/ItemDetailContainer/ItemDetailContainer';
import Cart from './pages/Cart/Cart';
import CartProvider from './context/CartProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from './context/ThemeProvider';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCxAwl3ki7qHZAuhQlC-P7TP-ZNtu4m_X4',
  authDomain: 'project-8948258991997020533.firebaseapp.com',
  projectId: 'project-8948258991997020533',
  storageBucket: 'project-8948258991997020533.appspot.com',
  messagingSenderId: '647358209226',
  appId: '1:647358209226:web:521c23979ceb58a746e833',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />

            <Route path="/category/:id" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
