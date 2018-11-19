import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import PaginationItem from './PaginationItem';

import styles from './Pagination.scss';


class Pagination extends Component {

  static propTypes = {
    white: PropTypes.bool,
    step: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    className: PropTypes.string.isRequired,
  }

  state = { page: 1 }

  componentWillReceiveProps(nextProps) {
    const { page } = this.state;
    const { children, step } = this.props;

    if (
      Array.isArray(children) &&
      Array.isArray(nextProps.children) &&
      nextProps.children.length !== children.length &&
      children.length < step * page
    ) {
      this.setState({ page: 1 });
    }
  }

  handleChangePage = (page) => this.setState({ page });

  handleGoLeft = () => this.setState({ page: this.state.page - 1});

  handleGoRight = () => this.setState({ page: this.state.page + 1 });

  renderLeft() {
    const { page } = this.state;
    const { step, children } = this.props;

    if (Array.isArray(children)) {
      const display = children.length > step && page > 1;
      const className = classNames(styles.paginationLeft, {
        [styles.display]: display,
      });

      return (
        <div
          className={className}
          onClick={display ? this.handleGoLeft : null}
        />
      );
    }
  }

  renderRight() {
    const { page } = this.state;
    const { step, children } = this.props;

    if (Array.isArray(children)) {
      const count = children.length % step
        ? Math.floor(children.length / step + 1)
        : children.length / step;

      const display = children.length > step && page < count;
      const className = classNames(styles.paginationRight, {
        [styles.display]: display,
      });

      return (
        <div
          className={className}
          onClick={display ? this.handleGoRight : null}
        />
      );
    }
  }

  renderPaginations() {
    const { page } = this.state;
    const { step, children, white } = this.props;

    if (Array.isArray(children) && children.length > step) {

      const count = children.length % step
        ? Math.floor(children.length / step + 1)
        : children.length / step;

      const list = [];

      for (let i = 1; i <= count; i++) {
        list.push(i);
      }

      return (
        <ul className={styles.pagination}>
          {this.renderLeft()}
          {
            list.map((item, index) =>
              <PaginationItem
                white={white}
                key={item}
                index={item}
                activePage={page}
                onClick={this.handleChangePage}
              />
            )
          }
          {this.renderRight()}
        </ul>
      );
    }
  }

  render() {
    const { page } = this.state;
    const { step, children, className } = this.props;

    let content;

    if (Array.isArray(children)) {
      content = children.slice(
        (page - 1) * step, page * step
      );
    }

    else content = children;

    return (
      <div className={className}>
        {content}
        {this.renderPaginations()}
      </div>
    );
  }
}

export default Pagination;
