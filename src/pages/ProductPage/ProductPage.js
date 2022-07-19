import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { SelectBox } from '../../components/SelectBox/SelectBox';

const TIMEOUT = 10;

const regions = [
  'All',
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
];

const ProductPage = (props) => {
  // States for data loading and error handling...
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // States for search field...
  const [searchQuery, setSearchQuery] = useState('');

  // State for select field...
  const [selectQuery, setSelectQuery] = useState('');

  // Props
  const { name, id, className } = props;

  // const [isLoading, setIsLoading] = useState(true);
  // const [selectQuery, setSelectQuery] = useState('Select Country Region...');

  // const { name, id } = props;

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
    const getItems = async () => {
      try {
        const data = await getJSON('https://restcountries.com/v3.1/all');
        const items = [...data];
        setItems(items);
        setIsLoaded(true);
      } catch (err) {
        setError(err);
      }
    };
    getItems();
  }, []);

  // const deleteProductHandler = (id) => {
  //   const cProducts = [...products];
  //   const index = cProducts.findIndex((el) => el.cca3 === id);
  //   cProducts.splice(index, 1);
  //   setProducts(cProducts);
  // };

  // const pRegions = products
  //   .map((el) => el.continents[0])
  //   .reduce((acc, el) => {
  //     if (acc.indexOf(el) === -1) {
  //       acc.push(el);
  //     }
  //     return acc;
  //   }, [])
  //   .sort((a, b) => {
  //     const x = a.toLowerCase();
  //     const y = b.toLowerCase();
  //     if (x > y) return 1;
  //     if (x < y) return -1;
  //     return 0;
  //   });
  // pRegions.unshift('Select Country Region...');

  // console.log(pRegions);

  // const selectChangeHandler = (e) => {
  //   const query = e.target.value;
  //   setSelectQuery(query);
  // };

  // useEffect(() => {
  //   console.log(selectQuery);
  //   const cProducts = [...products];
  //   if (selectQuery === 'Select Country Region...') {
  //     fProducts = cProducts;
  //     console.log(fProducts);
  //   } else {
  //     const fProducts = cProducts.filter(
  //       (el) => el.continents[0] === selectQuery
  //     );
  //     console.log(fProducts);
  //   }
  // }, [selectQuery]);

  // const cProducts = [...products];

  // console.log(`Filtered Products ::: ${fProducts}`);

  // return (
  //   // <div className="product-page" id={id}>
  //   //   <h1>Welcome to the {name}...</h1>
  //   //   <SelectBox data={regions} selectChangeHandler={selectChangeHandler} />
  //   //   {isLoading ? (
  //   //     <p>Please wait while the products has beem loaded....</p>
  //   //   ) : (
  //   //     <Product data={fProducts} deleteProductHandler={deleteProductHandler} />
  //   //   )}
  //   // </div>
  // );

  // Event handlers...
  const searchItemsHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const selectChangeHandler = (e) => {
    setSelectQuery(e.target.value);
  };

  // custom functions that needs to be rendered on state change...
  const filteredItems = () => {
    const fItems = items.filter(
      (el) =>
        el.name.common.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
    return fItems;
  };

  // Keep in mind. Do not mutate the orginal data...
  const products = [...items];

  // Conditional return...
  if (error) {
    return <p>{error}</p>;
  } else if (!isLoaded) {
    return <p>Please wait while the items has been loaded...</p>;
  } else {
    return (
      <div id={id} className={className}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1>Welcome to the {name}...</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <SelectBox
                data={regions}
                selectChangeHandler={selectChangeHandler}
              />
            </div>
            <div className="col-lg-6">
              <SearchBox
                className="search-box-countries"
                htmlFor="Countries Search"
                label="Search countries here..."
                placeholder="Search Countries"
                searchItemsHandler={searchItemsHandler}
              />
            </div>
          </div>
          <Product data={filteredItems()} />
        </div>
      </div>
    );
  }
};

export default ProductPage;
