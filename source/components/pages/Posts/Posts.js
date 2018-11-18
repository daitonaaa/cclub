import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';

import { Loading } from 'components/common';
import PostsList from 'components/PostsList';

import { fetchUsers } from 'actions/users';
import { fetchPosts, resetList } from 'actions/posts';


class Posts extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    usersList: PropTypes.array.isRequired,

    resetList: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchPosts, fetchUsers } = this.props;

    fetchUsers();
    fetchPosts();
  }

  // В таком случае после удаления не будет
  // меняться список (удаляться запись)
  // API этого не предоставляет, если это убрать
  // и написать проверку на наличие данных в дид маунте
  // то запись будет удаляться из списка
  componentWillUnmount() {
    const { resetList } = this.props;

    resetList();
  }

  render() {
    const { route: { title }, list, loading, usersList } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
        {
          loading ? (
            <Loading />
          ) : (
            <PostsList data={list} />
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.posts,
  usersList: state.users.list,
});

const mapDispatchToProps = {
  resetList,
  fetchUsers,
  fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);