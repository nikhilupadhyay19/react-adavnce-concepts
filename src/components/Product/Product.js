import React from 'react';
// import { ProductModal } from '../../components/ProductModal/ProductModal';
import { ProductModal } from '../ProductModal/ProductModal';
// console.log(ProductModal);
import './Product.scss';

const Product = (props) => {
  const { data: products, deleteProductHandler, changeNameHandler } = props;
  return (
    <div className="row">
      {products.map((el, index, arr) => (
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

            <div className="card-body">
              <input
                className="form-control"
                type="text"
                value={el.name.common}
                onChange={(e) => changeNameHandler(e, el.cca3)}
              />
              <ProductModal data={el} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Product;
