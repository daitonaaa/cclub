import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import url from 'routes/urls';

import { Button } from 'components/common';

import styles from './Home.scss';


const Home = ({ history, route: { title } }) => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className={styles.home}>
      {/* <div className={styles.homeTitle}>
        Тестовое задание на Front-end разработчика
      </div>
      Исполнил: Оленин Александр Романович */}
      <div className={styles.homeControls}>
        <Button
          style="blue"
          title="Смотреть"
          onClick={() => history.push(url.posts.path)}
        />
      </div>
    </div>
  </Fragment>
);

Home.propTypes = {
  route: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Home;
