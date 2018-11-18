import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore.js';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory  from 'history/createBrowserHistory';

import routes from 'routes/routes';

import 'scss/common.scss';


const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('cclub')
);
