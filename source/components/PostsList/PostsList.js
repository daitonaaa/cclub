import React from 'react';
import PropTypes from 'prop-types';

import { isNotEmpty } from 'utils';

import PostItem from './PostItem';
import Pagination from 'components/Pagination';

import styles from './PostsList.scss';


const PostsList = ({ data }) => (
  <Pagination step={12} className={styles.postsList}>
    {
      isNotEmpty(data) ? (
        data.map(item => (
          item && <PostItem key={item.id} {...item} />
        ))
      ) : (
        <div>
          Список записей пуст
        </div>
      )
    }
  </Pagination>
);

PostsList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PostsList;
