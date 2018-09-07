import React from 'react';
import PropTypes from 'prop-types';
import LinkRoute from './link-route';

const Header = ({ isAuthenticated, deauthenticate }) => (
  <div className="ui inverted menu">
    <LinkRoute to="/" className="header item">
      URL shortener
    </LinkRoute>

    <div className="right menu">
      <LinkRoute to="/admin" className="item">
        Admin
      </LinkRoute>

      {isAuthenticated && (
        <button className="item" onClick={deauthenticate}>
          <i className="sign out alternate icon" />
          Sign out
        </button>
      )}
    </div>
  </div>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  deauthenticate: PropTypes.func.isRequired,
};

Header.contextTypes = {
  router: PropTypes.object,
};

export default Header;
