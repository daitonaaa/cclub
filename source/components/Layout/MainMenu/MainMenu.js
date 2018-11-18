import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import { Link } from 'components/common';

import url from 'routes/urls';

import styles from './MainMenu.scss';


class MainMenu extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  checkActiveMenuPoint = (path) => {
    const { location: { pathname } } = this.props;

    return pathname === path;
  }

  render() {
    const { mainMenu, mainMenuItem, activeMenuItem } = styles;

    return (
      <div className={mainMenu}>
        <Link
          title="Главная"
          to={url.home.path}
          className={classNames(mainMenuItem, {
            [activeMenuItem]: this.checkActiveMenuPoint(url.home.path)
          })}
        />
        <Link
          title="Записи"
          to={url.posts.path}
          className={classNames(mainMenuItem, {
            [activeMenuItem]: this.checkActiveMenuPoint(url.posts.path)
          })}
        />
      </div>
    );
  }
}

export default MainMenu;