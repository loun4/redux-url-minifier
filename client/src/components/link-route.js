
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class LinkRoute extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    query: PropTypes.shape({}),
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    query: {},
    className: null,
  };

  handleNavigation = (e) => {
    e.preventDefault();

    const { router } = this.context;
    const { to, query } = this.props;

    router.navigate(to, query);
  }

  render() {
    const { router } = this.context;
    const {
      to,
      query,
      children,
      className,
    } = this.props;

    const href = router.getFullPath(to, query);

    return (
      <a
        href={href}
        onClick={this.handleNavigation}
        className={classNames(className, {
          active: href === router.state.currentPath,
        })}
      >
        {children}
      </a>
    );
  }
}
