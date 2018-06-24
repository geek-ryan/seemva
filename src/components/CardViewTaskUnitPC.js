import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class CardViewTaskUnitPC extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon type={true ? 'check-circle-o' : 'check-circle'} />
        <Icon type="delete" />
        <h2>title</h2>
        <span>xxxx.xx.xx</span>
        <span>-</span>
        <span>xxxx.xx.xx</span>
        <div>jake, dave, kate - icon</div>
        <Icon type="message" />
        <span>12</span>
        <div>lable 1 , label 2, label 3 - icon</div>
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitPC;
