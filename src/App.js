// import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavHeader from './components/NavHeader';
import ProductList from './components/ProductList';
import ProductScreen from './screen/ProductScreen';

function App() {
  return (
    <div>
      <NavHeader />
      <Container className="mt-3">
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
