import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import { Input, Loading, Select, Button } from 'components/common';

import { fetchUsers } from 'actions/users';
import { formChangeField, formPost, formReset } from 'actions/posts';

import styles from './AddPost.scss';


class AddPost extends Component {

  static propTypes = {
    body: PropTypes.string,
    title: PropTypes.string,
    userId: PropTypes.number,
    error: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    formPostProcess: PropTypes.bool.isRequired,

    // users
    usersList: PropTypes.array.isRequired,
    usersLoading: PropTypes.bool.isRequired,

    formPost: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    formChangeField: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { usersList, fetchUsers } = this.props;

    if (!usersList.length) fetchUsers();
  }

  componentWillUnmount() {
    const { formReset } = this.props;

    formReset();
  }

  changeField = (field, value) => {
    const { formChangeField } = this.props;

    formChangeField(field, value);
  }

  addPost = () => {
    const { formPost, history } = this.props;

    formPost(history);
  }

  render() {
    const {
      body, title, userId, route, usersLoading, usersList, error, formPostProcess,
    } = this.props;

    const inputTitleOptions = {
      value: title,
      title: 'Название записи',
      onChange: (value) => this.changeField('title', value),
    };

    const inputBodyOptions = {
      value: body,
      title: 'Описание',
      onChange: (value) => this.changeField('body', value),
    };

    const selectUsersOptions = {
      value: userId,
      title: 'Пользователь',
      options: usersList && usersList.map(({ id, username }) => ({ label: username, value: id })),
      onChange: (value) => this.changeField('userId', value),
    };

    const buttonAddPostOptions = {
      style: 'blue',
      title: 'Добавить',
      onClick: this.addPost,
    };

    return (
      <Fragment>
        <Helmet>
          <title>{route.title}</title>
        </Helmet>
        <div className={styles.addPost}>
          <h1>Добавить новую запись</h1>
          {
            formPostProcess ? (
              <Loading />
            ) : (
              <Fragment>
                <Input {...inputTitleOptions} />
                {
                  usersLoading ? (
                    <Loading min />
                  ) : (
                    <div className={styles.addPostUsers}>
                      <Select {...selectUsersOptions} />
                    </div>
                  )
                }
                <div className={styles.addPostBody}>
                  <Input {...inputBodyOptions} />
                </div>
                <div className={styles.addPostControls}>
                  <Button {...buttonAddPostOptions} />
                  {
                    error && (
                      <div className={styles.addPostError}>
                        Заполните все поля
                      </div>
                    )
                  }
                </div>
              </Fragment>
            )
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.posts.form,
  usersList: state.users.list,
  usersLoading: state.users.usersIsFetching,
});

const mapDispatchToProps = {
  formPost,
  formReset,
  fetchUsers,
  formChangeField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPost);
