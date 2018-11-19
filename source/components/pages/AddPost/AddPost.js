import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';


class AddPost extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
  }

  render() {
    const { route: { title } } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div>
          add post
        </div>
      </Fragment>
    )
  }
}

export default connect(
  () => ({}),
)(AddPost);
