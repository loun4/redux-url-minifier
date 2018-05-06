
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { authenticate, deauthenticate } from '../actions/session';
import Header from '../components/header';

/* eslint-disable import/first */
import 'react-table/react-table.css';
import '../css/semantic-ui-css/semantic.min.css';
import '../css/app.css';

const ERROR_MSG = 'Something worng happened, please try again.';

class App extends Component {
  static propTypes = {
    session: PropTypes.shape({
      readyToAuthenticate: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
    }).isRequired,
    error: PropTypes.shape({}).isRequired,
    authenticate: PropTypes.func.isRequired,
    deauthenticate: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    if (this.props.session.readyToAuthenticate) {
      this.props.authenticate();
    }
  }

  render() {
    const {
      session: { isAuthenticated },
      deauthenticate,
      children,
      error,
    } = this.props;

    const hasSaveError = error.type === 'save';
    const hasGetError = error.type === 'get';

    if (hasGetError) {
      return (
        <div className="app ui container">
          <div className="ui negative message massive error-box">
            {ERROR_MSG}
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          deauthenticate={deauthenticate}
        />
        <div className="app ui container">
          {children}

          <div
            className={classNames('ui negative message notification', {
              'is-visible': hasSaveError,
            })}
          >
            {ERROR_MSG}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  session,
  error,
}) => ({
  session,
  error,
});

export default connect(mapStateToProps, {
  authenticate,
  deauthenticate,
})(App);
