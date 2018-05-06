
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class LinkItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  state = {
    isCopied: false,
  };

  handleCopy = url => () => {
    const fakeField = document.createElement('textarea');
    fakeField.innerText = url;
    document.body.appendChild(fakeField);
    fakeField.select();
    document.execCommand('copy');
    fakeField.remove();

    this.setState({ isCopied: true }, () =>
      setTimeout(() => this.setState({ isCopied: false }), 1000));
  }

  render() {
    const { url, className } = this.props;
    const { isCopied } = this.state;

    return (
      <div className={classNames('ui buttons', className)}>
        <a
          href={url}
          className="ui button"
          target="_blank"
        >
          <i className="external alternate icon" />
          {url}
        </a>
        <div className="or" />
        <button
          onClick={this.handleCopy(url)}
          className="ui vertical green button"
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
}

