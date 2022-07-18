import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';

const TIMEOUT = 10;

const ProductPage = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { name, id } = props;

  const timeout = (s) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(`Request is taking too long... More than ${s} seconds.`);
      }, s * 1000);
    });
  };

  const getJSON = async (url, errorMsg = 'Something well wrong...') => {
    try {
      const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${errorMsg} ${response.status} ${data.message}`);
      }
      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getJSON('https://restcountries.com/v3.1/all');
        setProducts((prevState) => {
          return (prevState = products);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    console.log('componentDidUpdate');
    setIsLoading(!isLoading);
  }, [products]);

  const showdetailsHandler = () => {
    console.log('Click Event Occured', this);
  };

  return (
    <div className="product-page" id={id}>
      Welcome to the {name}...
      {isLoading ? (
        <p>Please wait while the products has beem loaded....</p>
      ) : (
        <Product data={products} showdetailsHandler={showdetailsHandler} />
      )}
    </div>
  );
};

export default ProductPage;
