import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

class CardViewTaskUnitPC extends Component {
  render() {
    // console.log('task props:', this.props);
    return (
      <React.Fragment>
        <Icon type={true ? 'check-circle-o' : 'check-circle'} />
        <Icon type="delete" />
        <h2>{this.props.title}</h2>
        <span>{this.props.startDate}</span>
        <span>-</span>
        <span>{this.props.dueDate}</span>
        <div>jake, dave, kate - icon</div>
        <Icon type="message" />
        <span>12</span>
        <div>lable 1 , label 2, label 3 - icon</div>
      </React.Fragment>
    );
  }
}

export default CardViewTaskUnitPC;
