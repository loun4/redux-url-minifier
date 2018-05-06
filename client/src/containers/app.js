
import React, { Component } from 'react';
import '../css/semantic-ui-css/semantic.min.css';
import 'react-table/react-table.css';
import '../css/app.css';

export default class App extends Component {
  render() {
    return (
      <div className="app ui container">
        {this.props.children}
      </div>
    );
  }
}
