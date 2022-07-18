import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';

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
      const response = await fetch(url);
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
    console.log('componentDidMount');
    const getProducts = async () => {
      try {
        const products = await Promise.race([
          getJSON('https://restcountries.com/v3.1/all'),
          timeout(10),
        ]);
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

  return (
    <div className="product-page" id={id}>
      Welcome to the {name}...
      {isLoading ? (
        <p>Please wait while the products has beem loaded....</p>
      ) : (
        <Product data={products} />
      )}
    </div>
  );
};

export default ProductPage;
