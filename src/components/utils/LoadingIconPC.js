import React, { Component } from 'react';
import { Icon } from 'antd';

class LoadingIconPC extends Component {
  render() {
    console.log('loading icon');
    return <Icon style={{ height: '100%', width: '100%' }} type="loading" />;
  }
}

export default LoadingIconPC;
