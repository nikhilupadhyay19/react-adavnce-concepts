import React from 'react';
import './Product.scss';

const Product = (props) => {
  const { data: products, deleteProductHandler, changeNameHandler } = props;
  return (
    <div className="row">
      {products.map((el, index) => (
        <div className="col-lg-3 mb-20" key={el.cca3}>
          <div className="card shadow-sm bg-body rounded">
            <img src={el.flags.png} alt={el.name.common} className="flag-img" />
            <div className="card-body">
              <h5 className="card-title">
                <span>{index}</span> : {el.name.common}
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i class="icofont icofont-globe"></i>
                {el.region}
              </li>
              <li className="list-group-item">
                <i class="icofont icofont-building-alt"></i>
                {el.capital}
              </li>
              <li className="list-group-item">
                <i class="icofont icofont-users-social"></i>
                {el.population}
              </li>
            </ul>
            <div className="card-body">
              <input
                className="form-control"
                type="text"
                value={el.name.common}
                onChange={(e) => changeNameHandler(e, el.cca3)}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteProductHandler(el.cca3)}
              >
                <i className="icofont icofont-ui-delete v-tb"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Product;
