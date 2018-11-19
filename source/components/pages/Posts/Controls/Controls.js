import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import url from 'routes/urls';

import { setFilters, resetFilter } from 'actions/posts';

import { Button, Input, Select } from 'components/common';

import styles from './Controls.scss';


class Controls extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    usersList: PropTypes.array.isRequired,
    searchUser: PropTypes.number.isRequired,
    searchText: PropTypes.string.isRequired,
    filterIsActive: PropTypes.bool.isRequired,

    setFilters: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  handleChangeFilter = (field, value) => {
    const { setFilters } = this.props;

    setFilters(field, value);
  }

  handleClearFilterts = () => {
    const { resetFilter } = this.props;

    resetFilter();
  }

  render() {
    const {
      history, usersList, searchUser, searchText, filterIsActive,
    } = this.props;

    const userOptions = usersList.map(({ id, username }) => ({
      value: id, label: username
    }));

    const buttonAddOptions = {
      style: 'blue',
      title: 'Добавить запись',
      onClick: () => history.push(url.addpost.path)
    };

    const inputSearchTextOptions = {
      value : searchText,
      title: 'Поиск по названию',
      onChange: (value) => this.handleChangeFilter('searchText', value),
    };

    const selectSearchUserOptions = {
      value: searchUser,
      options: userOptions,
      title: 'Фильтр по пользователю',
      onChange: (value) => this.handleChangeFilter('searchUser', value),
    };

    return (
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          <Button {...buttonAddOptions} />
          {
            filterIsActive && (
              <div
                className={styles.clearFilters}
                onClick={this.handleClearFilterts}
              >
                Сбросить
              </div>
            )
          }
        </div>
        <div className={styles.controlsRight}>
          <Input {...inputSearchTextOptions} />
          <div className={styles.controlsSelect}>
            <Select {...selectSearchUserOptions} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.posts.filter,
  usersList: state.users.list,
});

const mapDispatchToProps = {
  setFilters,
  resetFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
