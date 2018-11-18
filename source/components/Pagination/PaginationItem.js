import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './Pagination.scss';

class PaginationItem extends Component {

  static propTypes = {
    white: PropTypes.bool,
    index: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,

    onClick: PropTypes.func.isRequired,
  }

  handleChangePage = () => {
    const { index, onClick } = this.props;

    onClick(index);
  }

  render() {
    const { index, activePage, white } = this.props;

    const active = index === activePage;

    return (
      <li
        onClick={this.handleChangePage}
        className={classNames(styles.paginationItem, {
          [styles.active]: active,
          white,
        })}
      >
        {index}
      </li>
    );
  }
}

export default PaginationItem;
