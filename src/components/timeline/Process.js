import React, { Component } from 'react';
import { Popover, Slider } from 'antd';

class Process extends Component {
  render() {
    const content = (
      <div>
        <p>{this.props.body}</p>
        <p>
          {this.props.startDate} ~ {this.props.dueDate}
        </p>
      </div>
    );
    return (
      <Popover
        className={'lineContainer'}
        content={content}
        title={this.props.title}
      >
        <div>
          <h5 className={'taskTitle'}>{this.props.title}</h5>
          <Slider
            dots={true}
            className={'slideline'}
            min={0}
            max={this.props.max}
            range
            defaultValue={[this.props.st, this.props.en]}
            disabled={true}
          />
        </div>
      </Popover>
    );
  }
}

export default Process;
