import React from 'react';
import ProductPage from './pages/ProductPage/ProductPage';
// import { CustomFn } from './CustomFn/CustomFn';
import './style.css';

export default function App() {
  return (
    <div>
      <ProductPage
        name="Product Page"
        id="productPage"
        className="product-page"
      />
      {/* <CustomFn /> */}
    </div>
  );
}
