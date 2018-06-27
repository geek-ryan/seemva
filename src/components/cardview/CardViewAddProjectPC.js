import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import '../../../node_modules/antd/dist/antd.css';

class CardViewAddProjectPC extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon type="plus" />
        <span>Add Project</span>
      </React.Fragment>
    );
  }
}

export default CardViewAddProjectPC;
