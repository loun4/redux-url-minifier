
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const { REACT_APP_REST_URL: ENDPOINT } = process.env;

export default class LinkItem extends Component {
  static propTypes = {
    link: PropTypes.shape({
      id: PropTypes.string,
      linkURL: PropTypes.string,
      meta: PropTypes.shape({}),
    }).isRequired,
  };

  state = {
    shortURL: `${ENDPOINT}/link/${this.props.link.id}`,
    isCopied: false,
  };

  handleCopy = () => {
    const fakeField = document.createElement('textarea');
    fakeField.innerText = this.state.shortURL;
    document.body.appendChild(fakeField);
    fakeField.select();
    document.execCommand('copy');
    fakeField.remove();
    this.setState({ isCopied: true }, () =>
      setTimeout(() => this.setState({ isCopied: false }), 1000));
  }

  render() {
    const { shortURL, isCopied } = this.state;

    return (
      <div className="ui buttons">
        <a
          href={shortURL}
          className="ui button"
          target="_blank"
        >
          <i className="external alternate icon" />
          {shortURL}
        </a>
        <div className="or" />
        <button
          onClick={this.handleCopy}
          className="ui vertical green button"
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
};

