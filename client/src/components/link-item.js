
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class LinkItem extends Component {
  static propTypes = {
    link: PropTypes.shape({
      id: PropTypes.string,
      linkURL: PropTypes.string,
      shortURL: PropTypes.string,
      meta: PropTypes.shape({}),
    }).isRequired,
  };

  state = {
    isCopied: false,
  };

  handleCopy = shortURL => () => {
    const fakeField = document.createElement('textarea');
    fakeField.innerText = shortURL;
    document.body.appendChild(fakeField);
    fakeField.select();
    document.execCommand('copy');
    fakeField.remove();

    this.setState({ isCopied: true }, () =>
      setTimeout(() => this.setState({ isCopied: false }), 1000));
  }

  render() {
    const { link: { shortURL } } = this.props;
    const { isCopied } = this.state;

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
          onClick={this.handleCopy(shortURL)}
          className="ui vertical green button"
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
}

