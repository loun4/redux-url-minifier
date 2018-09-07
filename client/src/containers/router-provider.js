import { Component } from 'react';
import PropTypes from 'prop-types';
import RouterService from '../utils/router-service';

export default class RouterProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    router: PropTypes.object,
  };

  getChildContext() {
    return {
      router: RouterService,
    };
  }

  render() {
    return this.props.children;
  }
}
