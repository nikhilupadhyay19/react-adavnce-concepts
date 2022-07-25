import React from 'react';
import ProductPage from './pages/ProductPage/ProductPage';
import { HooksPage } from './pages/HooksPage/HooksPage';
// import { CustomFn } from './CustomFn/CustomFn';
import './style.css';

export default function App() {
  return (
    <div>
      <HooksPage />
      <ProductPage
        name="Product Page"
        id="productPage"
        className="product-page"
      />
      {/* <CustomFn /> */}
    </div>
  );
}
