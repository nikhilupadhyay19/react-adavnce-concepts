import React from 'react';

const Product = (props) => {
  const { data: products, showdetailsHandler } = props;
  return (
    <div className="container">
      <div className="row">
        {products.map((el) => (
          <div className="col-lg-3" key={el.cca3}>
            <div className="card product p-2 bg-light border">
              <div className="card-body">{el.name.common}</div>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => showdetailsHandler(el.cca3)}
              >
                Show Details...
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;
