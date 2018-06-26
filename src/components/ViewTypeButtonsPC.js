import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class ViewTypeButtonsPC extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon type="switcher" />
        <Icon type="clock-circle-o" />
        <Icon type="table" />
      </React.Fragment>
    );
  }
}

export default ViewTypeButtonsPC;
