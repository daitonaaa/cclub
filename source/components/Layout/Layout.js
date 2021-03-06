import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { renderRoutes } from 'react-router-config';

import { ServerError } from 'components/common';
import MainMenu from './MainMenu';

import styles from './Layout.scss';


const Layout = ({ route: { routes }, location }) => (
  <div styleName="layout">
    <div styleName="contain">
      <div styleName="logo">
        <img src="https://credit.club/static/media/credit-club-logo.122c505b.svg" alt="logo" />
      </div>
      <ServerError />
      <MainMenu location={location} />
      <div styleName="content">
        {renderRoutes(routes)}
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default CSSModules(Layout, styles);
