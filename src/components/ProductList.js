import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
// import data from '../data.js';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Product from './Product';

// reducer take 2 parameter current & action
// type actions are created and if it doesnt matches with the action type default state
// returned
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function ProductList() {
  // state is created to return the products
  // const [products, setProducts] = useState([]);

  // useReducer function is created here and it takes to parameters 1st is {object} and
  // 2nd is dispatch function

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
      // setProducts(result.data)
    };
    fetchData();
  }, []);
  return (
    <Container>
      <div className="featureHeading">Feautred Products</div>
      <div className="products">
        <Row>
        {products.map((product) => (
          <Col sm={6} md={4} lg={3} className='mb-3'>
        <Product product={product} />
          </Col>
        ))}
        </Row>
      </div>
    </Container>
  );
}

export default ProductList;
