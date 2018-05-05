
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-enroute';
import PropTypes from 'prop-types';
import RouterService from './utils/router-service';
import configureStore from './store';
import App from './containers/app';
import Main from './containers/main';
import Admin from './containers/admin';

const store = configureStore();

const RoutesHandlers = props => (
  <Provider store={store}>
    <Router {...props}>
      <Route path="" component={App}>
        <Route path="/" component={Main} />
        <Route path="/admin" component={Admin} />
      </Route>
    </Router>
  </Provider>
);

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.handleNavigation = props.onNavigate.bind(this);
  }

  getChildContext() {
    const router = {
      navigate: this.navigate.bind(this),
      replace: this.replace.bind(this),
    };

    return {
      router,
    };
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handleNavigation);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleNavigation);
  }

  navigate(to, query = {}) {
    const path = RouterService.navigate(to, query);
    this.handleNavigation(path);
  }

  replace(to, query = {}) {
    const path = RouterService.replace(to, query);
    this.handleNavigation(path);
  }

  render() {
    return <RoutesHandlers {...this.props} />;
  }
}


Routes.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

Routes.childContextTypes = {
  router: PropTypes.object,
};
