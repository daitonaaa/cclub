import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const pureLink = ({ className, to, title }) => (
  <Link className={className} to={to}>
    {title}
  </Link>
);

pureLink.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default pure(pureLink);
