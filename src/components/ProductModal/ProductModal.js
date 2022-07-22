import React, { useState, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ProductModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const { data: product } = props;

  return (
    <Fragment>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{product.name.common}</ModalHeader>
        <ModalBody>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Region:
              <strong> {product.region}</strong>
            </li>
            <li className="list-group-item">
              Capital:
              <strong> {product.capital}</strong>
            </li>
            <li className="list-group-item">
              Population:
              <strong> {product.population}</strong>
            </li>
          </ul>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </Fragment>
  );
};

export { ProductModal };
