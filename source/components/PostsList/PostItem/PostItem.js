import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import url from 'routes/urls';

import styles from './PostItem.scss';


const PostItem = ({ id, title, body, userId }) => (
  <Link className={styles.postItem} to={url.post.path(id)}>
    <div className={styles.postTitle}>
      {title}
    </div>
    <div className={styles.postBody}>
      <pre>{body}</pre>
    </div>
    <div className={styles.postAuthor}>
      Автор: {userId}
    </div>
  </Link>
);

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default PostItem;
