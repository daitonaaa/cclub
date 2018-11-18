import React from 'react';
import PropTypes from 'prop-types';

import { isNotEmpty } from 'utils';

import Comment from './Comment';


const Comments = ({ data }) => (
  <div>
    {
      isNotEmpty(data) ? (
        data.map(item => (
          <Comment key={item.id} {...item} />
        ))
      ) : (
        <div>
          Список комментариев пуст
        </div>
      )
    }
  </div>
);

Comments.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Comments;