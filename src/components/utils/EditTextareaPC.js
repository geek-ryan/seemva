import React, { Component } from 'react';
import { Input } from 'antd';

class EditTextareaPC extends Component {
  static defaultProps = {};

  state = {
    content: this.props.content,
    body: this.props.body,
    visible: false,
    auto: false,
  };

  handleOnblur = () => {
    this.props.editfunc({ [this.props.keyType]: this.state.body });
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
        {/* <span className="edit-textarea--blank">
          {this.props.body ? '' : 'blank'}
        </span> */}
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
