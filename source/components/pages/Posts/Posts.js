import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';

import Controls from './Controls';
import { Loading } from 'components/common';
import PostsList from 'components/PostsList';

import { fetchPosts, resetList } from 'actions/posts';


class Posts extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // search
    searchResults: PropTypes.array.isRequired,
    filterIsActive: PropTypes.bool.isRequired,

    resetList: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchPosts } = this.props;

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
    const {
      route: { title }, list, loading, history, searchResults, filterIsActive,
    } = this.props;

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
            <Fragment>
              <Controls history={history} />
              <PostsList data={filterIsActive ? searchResults : list} />
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.posts,
});

const mapDispatchToProps = {
  resetList,
  fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
