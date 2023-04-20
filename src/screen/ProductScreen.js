import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,  
  Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import  './ProductScreen.css';
import Product from '../components/Product.js';
// import data from '../../backend/data';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };

    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function ProductScreen() {
  const { slug } = useParams();

  const [{ error, product }, dispatch] = useReducer(reducer, {
    error: '',
    product:[],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        console.log(result,'res');
        dispatch({ type: 'FETCH_SUCCESS', payload: [result.data] });
      } catch (err) {
        debugger;
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return   <> 
   <div>
    {product.map((item, index) => {
      return (
        <Row>
        <Col md={6} id={item.id}>
          <img
             className="img-large"
            src={item.image}
            alt={item.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{item.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={item.rating} reviews={item.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <span>Price: ${item.price}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span>Description: {item.description}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>${item.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      
                      {item.countInStock > 0 ? (
                        <Badge bg="success">In stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {item.countInStock > 0 && (
                        <ListGroup.Item>
                          <div className='d-grid' style={{paddingTop:"inherit"}}>
                            <Button variant='primary'>Add to Cart</Button>
                          </div>
                        </ListGroup.Item>
                     
                      )}

              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      )
    })}
   
    </div>
</>
}

export default ProductScreen;
