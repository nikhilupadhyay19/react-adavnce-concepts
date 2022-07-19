import React from 'react';

const Product = (props) => {
  const { data: products } = props;
  return (
    <div className="row">
      {products.map((el, index) => (
        <div className="col-lg-3" key={el.cca3}>
          <div className="card product p-2 bg-light border">
            <div className="card-body">{el.name.common}</div>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => deleteProductHandler(el.cca3)}
            >
              Show Details... {index}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Product;
