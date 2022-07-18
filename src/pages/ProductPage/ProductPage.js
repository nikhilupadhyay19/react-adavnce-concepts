import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';
import { SelectBox } from '../../components/SelectBox/SelectBox';

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
        setProducts(products);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const showdetailsHandler = (id) => {
    const cProducts = [...products];
    const index = cProducts.findIndex((el) => el.cca3 === id);
    cProducts.splice(index, 1);
    setProducts(cProducts);
  };

  const pRegions = products
    .map((el) => el.continents[0])
    .reduce((acc, el) => {
      if (acc.indexOf(el) === -1) {
        acc.push(el);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const x = a.toLowerCase();
      const y = b.toLowerCase();
      if (x > y) return 1;
      if (x < y) return -1;
      return 0;
    });

  return (
    <div className="product-page" id={id}>
      <h1>Welcome to the {name}...</h1>
      <SelectBox data={pRegions} />
      {isLoading ? (
        <p>Please wait while the products has beem loaded....</p>
      ) : (
        <Product data={products} showdetailsHandler={showdetailsHandler} />
      )}
    </div>
  );
};

export default ProductPage;
