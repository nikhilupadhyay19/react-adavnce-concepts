import React, { useState, useEffect } from 'react';
import './ProductPage.scss';
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

  console.log(items);

  // States for search field...
  const [searchPram, setSearchPram] = useState('');

  // State for select field...
  const [selectPram, setSelectPram] = useState('All');

  // State for Modal

  // Props
  const { name, id, className } = props;

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

  // Event handlers...
  const searchItemsHandler = (e) => {
    setSearchPram(e.target.value);
  };

  const selectChangeHandler = (e) => {
    setSelectPram(e.target.value);
  };

  // custom functions that needs to be rendered on state change...
  const fItems = () => {
    return items.filter((item) => {
      if (item.continents[0] === selectPram) {
        return (
          item.name.common.toLowerCase().indexOf(searchPram.toLowerCase()) !==
            -1 && item.continents[0] === selectPram
        );
      } else if (selectPram === 'All') {
        return (
          item.name.common.toLowerCase().indexOf(searchPram.toLowerCase()) !==
          -1
        );
      }
    });
  };

  // Now I have communicated from child to parent. As I have get the id from product component based on which i have to filter data inside product page component...
  const deleteProductHandler = (id) => {
    const cItems = [...items];
    const index = cItems.findIndex((el) => el.cca3 === id);
    cItems.splice(index, 1);
    setItems(cItems);
  };

  const changeNameHandler = (e, id) => {
    const cItems = [...items];
    const index = cItems.findIndex((el) => el.cca3 === id);

    const item = Object.assign({}, cItems[index]);
    item.name.common = e.target.value;
    cItems[index] = item;

    setItems(cItems);
  };
  ////////////////////////////////////////////////////////////

  // Conditional return...
  if (error) {
    return <p>{error}</p>;
  } else if (!isLoaded) {
    return <p>Please wait while the items has been loaded...</p>;
  } else {
    return (
      <div id={id} className={className}>
        <div className="container">
          <div className="col-lg-12 mb-3">
            <h1>{name} loaded...</h1>
          </div>
          <div className="col-lg-12">
            <div className="row justify-content-between">
              <div className="col-lg-3 mb-5">
                <SelectBox
                  data={regions}
                  selectChangeHandler={selectChangeHandler}
                />
              </div>
              <div className="col-lg-3 mb-5">
                <SearchBox
                  className="search-box-countries"
                  htmlFor="Countries Search"
                  label="Search countries here..."
                  placeholder="Search Countries"
                  searchItemsHandler={searchItemsHandler}
                />
              </div>
            </div>
          </div>
          <Product
            data={fItems()}
            deleteProductHandler={deleteProductHandler}
            changeNameHandler={changeNameHandler}
          />
        </div>
      </div>
    );
  }
};

export default ProductPage;
