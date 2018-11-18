import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './Button.scss';


class Button extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,

    onClick: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { onClick } = this.props;

    onClick();
  }

  render() {
    const { title, style } = this.props;
    const { button, buttonGreen, buttonBlue } = styles;

    const buttonClassName = classNames(button, {
      [buttonBlue]: style === 'blue',
      [buttonGreen]: style === 'green',
    });

    return (
      <button
        onClick={this.handleClick}
        className={buttonClassName}
      >
        {title}
      </button>
    );
  }
}

export default Button;