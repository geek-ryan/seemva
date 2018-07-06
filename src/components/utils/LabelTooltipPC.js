import React, { Component } from 'react';
import { Tooltip } from 'antd';

class LabelTooltipPC extends Component {
  static defaultProps = {
    color: '',
    body: '',
  };
  render() {
    const { color, body } = this.props;
    return (
      <Tooltip placement="bottom" title={body} style={{ fontSize: 10 }}>
        <div style={{ backgroundColor: color }} className="label-small-tag" />
      </Tooltip>
    );
  }
}

export default LabelTooltipPC;
