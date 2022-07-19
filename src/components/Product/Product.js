import React from 'react';
import './Product.scss';

const Product = (props) => {
  const { data: products, deleteProductHandler, changeNameHandler } = props;
  return (
    <div className="row">
      {products.map((el, index) => (
        <div className="col-lg-3 mb-20" key={el.cca3}>
          <div className="card shadow-sm bg-body rounded">
            {/* <img src={el.flags.png} alt={el.name.common} className="flag-img" /> */}
            <div className="card-body">
              <h5 className="card-title">
                <span>{index}</span> : {el.name.common}
              </h5>
              <i
                className="icofont icofont-ui-delete v-tb"
                onClick={() => deleteProductHandler(el.cca3)}
              ></i>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Region:
                <strong> {el.region}</strong>
              </li>
              <li className="list-group-item">
                Capital:
                <strong> {el.capital}</strong>
              </li>
              <li className="list-group-item">
                Population:
                <strong> {el.population}</strong>
              </li>
            </ul>
            <div className="card-body">
              <input
                className="form-control"
                type="text"
                value={el.name.common}
                onChange={(e) => changeNameHandler(e, el.cca3)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Product;
