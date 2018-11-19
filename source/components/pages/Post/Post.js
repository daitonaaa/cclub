import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import url from 'routes/urls';

import { helpers } from 'utils';
import { fetchComments, resetComments } from 'actions/comments';
import { fetchPost, resetPost, deletePost } from 'actions/posts';

import Comments from './Comments';
import { Loading, Button } from 'components/common';

import styles from './Post.scss';


class Post extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    single: PropTypes.shape({
      id: PropTypes.number,
      body: PropTypes.string,
      title: PropTypes.string,
      userId: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
    comments: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    fetchingComments: PropTypes.bool.isRequired,

    fetchPost: PropTypes.func.isRequired,
    resetPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    resetComments: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchPost, fetchComments, match: { params: { id } } } = this.props;

    fetchPost(+ id);
    fetchComments(+ id);
  }

  componentWillUnmount() {
    const { resetPost, resetComments } = this.props;

    resetPost();
    resetComments();
  }

  handleDelete = () => {
    const { deletePost, history, single: { id } } = this.props;

    deletePost(id, history);
  }

  renderBackButton() {
    return (
      <Link
        to={url.posts.path}
        className={styles.postBack}
      >
        <i /> Назад
      </Link>
    );
  }

  render() {
    const {
      loading, comments, fetchingComments,
      single: { title, body, userId, username },
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>
            {loading ? 'Загрузка...' : helpers.ucFirst(title)}
          </title>
        </Helmet>
        {
          loading ? (
            <Loading />
          ) : (
            <div className={styles.post}>
              {this.renderBackButton()}
              <h1>{title}</h1>
              <div className={styles.postBody}>
                <pre>{body}</pre>
              </div>
              <div className={styles.postAuthor}>
                <Link to={url.user.path(userId)}>
                  Автор: {username}
                </Link>
              </div>
              <div className={styles.postControls}>
                <Button
                  title="Редактировать"
                  style="blue"
                  onClick={() => alert('Редактировать')}
                />
                <div className={styles.postRemove} onClick={this.handleDelete}>
                  Удалить
                </div>
              </div>
              <div className={styles.postComments}>
                <h2>Комментарии ({comments.length})</h2>
                {
                  fetchingComments ? (
                    <Loading min />
                  ) : (
                    <Comments data={comments} />
                  )
                }
              </div>
            </div>
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.posts,
  ...state.comments,
});

const mapDispatchToProps = {
  fetchPost,
  resetPost,
  deletePost,
  resetComments,
  fetchComments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
