import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';

import { Loading } from 'components/common';

import PostsList from 'components/PostsList';

import { fetchUser, resetUser } from 'actions/users';
import { fetchUserPosts, resetList } from 'actions/posts';

import styles from './User.scss';


class User extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,

    // user
    userInfo: PropTypes.object.isRequired,
    userIsFetching: PropTypes.bool.isRequired,
    
    // posts
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,

    fetchUser: PropTypes.func.isRequired,
    resetList: PropTypes.func.isRequired,
    resetUser: PropTypes.func.isRequired,
    fetchUserPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      fetchUser, fetchUserPosts, match: { params: { id } },
    } = this.props;

    fetchUser(id);
    fetchUserPosts(id);
  }

  componentWillUnmount() {
    const { resetList, resetUser } = this.props;

    resetUser();
    resetList();
  }

  render() {
    const {
      list, loading, userIsFetching, userInfo: { name, username, email, phone },
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>
            {userIsFetching ? 'Загрузка...' : username}
          </title>
        </Helmet>
        {
          userIsFetching ? (
            <Loading />
          ) : (
            <div className={styles.user}>
              <h1>{username}</h1>
              <div>Полное имя: <b>{name}</b></div>
              <div>Email: <b>{email}</b></div>
              <div>Телефон: <b>{phone}</b></div>
              <div className={styles.userPosts}>
                <h2>Записи пользователя</h2>
                {
                  loading ? (
                    <Loading min />
                  ) : (
                    <PostsList data={list} />
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
  ...state.users,
  ...state.posts,
});

const mapDispatchToProps = {
  fetchUser,
  resetUser,
  resetList,
  fetchUserPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);