import React from 'react';

const Product = (props) => {
  const { data: products } = props;
  return (
    <div className="container">
      <div className="row">
        {products.map((el) => (
          <div className="col-lg-3" key={el.cca3}>
            <div className="card product p-2 bg-light border">
              <div className="card-body">{el.name.common}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;
