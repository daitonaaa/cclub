import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import styles from './ServerError.scss';


class ServerError extends Component {

  static propTypes = {
    system: PropTypes.bool,
    error: PropTypes.string,
  }

  state = { show: false }

  componentDidMount() {
    this.app = document.getElementById('cclub');
    this.container = document.createElement('div');
    this.app.appendChild(this.container);

    this.setState({ show: true });
  }

  componentWillUnmount() {
    this.app.removeChild(this.container);
  }

  render() {
    const { show } = this.state;
    const {
      error,
      system,
    } = this.props;

    if (show && system) return ReactDOM.createPortal(
      <div className={styles.serverError}>
        {`Ошибка: ${error}.`}
      </div>,
      this.container
    );

    return null;
  }
}


const mapStateToProps = state => ({
  ...state.serverError,
});

export default connect(mapStateToProps)(ServerError);
