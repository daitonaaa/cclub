import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Loading.scss';


const Loading = ({ min }) => (
  <div className={classNames(styles.showbox, { [styles.showboxMin]: min })}>
    <div className={classNames(styles.loader, { [styles.loaderMin]: min })}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          r="20"
          cy="50"
          cx="50"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
          className={styles.path}
        />
      </svg>
    </div>
  </div>
);

Loading.propTypes = {
  min: PropTypes.bool,
};

export default Loading;