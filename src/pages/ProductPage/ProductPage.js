import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';

const TIMEOUT = 10;

const ProductPage = (props) => {
  const [products, setProducts] = useState([]);
  const [cProducts, setCProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { name, id } = props;

  // console.log('Contructor ..... Rum only once at mounting pahse...');

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
    // console.log(
    //   'Component Did Mount.... Contain blank array array as dependency... Run only once...'
    // );
    console.log(products);
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

  // useEffect(() => {
  //   // console.log(
  //   //   'Component Did update... Contain array with dependency... run only when there is a change in the dependency..'
  //   // );
  //   setIsLoading(!isLoading);
  // }, [products]);

  // const showdetailsHandler = (id) => {
  //   const cProducts = [...products];
  //   const index = cProducts.findIndex((el) => el.cca3 === id);
  //   cProducts.splice(index, 1);
  //   setUProducts(cProducts);
  // };

  // useEffect(() => {
  //   return setProducts((prevState) => {
  //     return (prevState = cProducts);
  //   });
  // }, [cProducts]);

  // console.log('Render...');

  return (
    <div className="product-page" id={id}>
      Welcome to the {name}...
      {/* {isLoading ? (
        <p>Please wait while the products has beem loaded....</p>
      ) : (
        <Product data={products} showdetailsHandler={showdetailsHandler} />
      )} */}
      <Product data={products} />
    </div>
  );
};

export default ProductPage;
