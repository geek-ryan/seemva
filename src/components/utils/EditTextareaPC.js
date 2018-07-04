import React, { Component } from 'react';
import { Input } from 'antd';

import LoadingIconPC from './LoadingIconPC';

class EditTextareaPC extends Component {
  static defaultProps = {};

  state = {
    content: this.props.content,
    body: this.props.body,
    visible: false,
    auto: false,
  };

  handleOnblur = () => {
    if (this.props[this.props.datatype].id && this.props.editfunc) {
      this.props.editfunc(
        this.props[this.props.datatype].id,
        this.props.keyType,
        this.state.body
      );
    }
    this.setState({ visible: false });
  };

  handleDoubleClick = () => {
    // this.textarea.focus();
    this.setState({ visible: true });
  };

  handleChange = e => {
    this.setState({ body: e.target.value });
  };

  render() {
    return (
      <div className="edit-textarea" onDoubleClick={this.handleDoubleClick}>
        <div className="readable">{this.props.body}&nbsp;</div>
        {this.state.visible && (
          <Input.TextArea
            onBlur={this.handleOnblur}
            autoFocus={this.state.visible}
            defaultValue={this.props.body}
            onChange={this.handleChange}
            autosize={false}
          />
        )}
      </div>
    );
  }
}

export default EditTextareaPC;
