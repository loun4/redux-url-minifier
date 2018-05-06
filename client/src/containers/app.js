
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deauthenticate } from '../actions/session';
import Header from '../components/header';

/* eslint-disable import/first */
import 'react-table/react-table.css';
import '../css/semantic-ui-css/semantic.min.css';
import '../css/app.css';

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    deauthenticate: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  handle() {

  }

  render() {
    const { isAuthenticated, deauthenticate, children } = this.props;

    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          deauthenticate={deauthenticate}
        />
        <div className="app ui container">
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  session: { isAuthenticated },
}) => ({
  isAuthenticated,
});

export default connect(mapStateToProps, {
  deauthenticate,
})(App);
