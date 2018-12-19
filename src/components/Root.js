import React, { Component } from 'react';
import {Header} from './Header';

export default class Root extends Component {
  render() {
    console.log(this.props);
    return (
      <Header />
    );
  }
}
