import React from 'react';
import PropTypes from 'prop-types';

import styles from './Comment.scss';


const Comment = ({ name, body, email }) => (
  <div className={styles.comment}>
    <div className={styles.commentAuthor}>
      <b>{name}</b> / {email}
    </div>
    <div className={styles.commentBody}>
      <pre>{body}</pre>
    </div>
  </div>
);

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Comment;
