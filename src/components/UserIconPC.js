import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class UserIconPC extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon type="user" />
        <div>{this.props.Name}</div>
      </React.Fragment>
    );
  }
}

export default UserIconPC;
