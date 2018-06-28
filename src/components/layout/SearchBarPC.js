import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class SearchBarPC extends Component {
  render() {
    return (
      <React.Fragment>
        <input placeholder="search" />
        <Icon type="search" />
      </React.Fragment>
    );
  }
}

export default SearchBarPC;
