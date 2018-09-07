import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import loader from '../imgs/loader.svg';

const Loader = ({ className }) => (
  <div className={classNames('loader', className)}>
    <img src={loader} alt="" width="60" height="60" />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: null,
};

export default Loader;
