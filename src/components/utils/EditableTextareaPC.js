import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import '../../index.css';

class EditableTextareaPC extends Component {
  state = {
    content: this.props.content,
    body: this.props.body,
    visible: false,
    auto: false,
  };

  handleOnblur = () => {
    this.setState({ visible: false });
  };

  handleDoubleClick = () => {
    // this.textarea.focus();
    this.setState({ visible: true });
  };

  render() {
    return (
      <React.Fragment>
        <div className="motherDiv" onDoubleClick={this.handleDoubleClick}>
          {this.state.visible ? (
            <Input.TextArea
              rows={1}
              onBlur={this.handleOnblur}
              autoFocus={this.state.visible}
              defaultValue={this.props.body}
            />
          ) : (
            <div className="readable">{this.props.body}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default EditableTextareaPC;
