import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = ({ children }) => (
  <div className="modal">
    <div className="modal__content">{children}</div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: undefined,
};

export default Modal;
