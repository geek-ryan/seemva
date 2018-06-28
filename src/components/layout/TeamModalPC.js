import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class TeamModalPC extends Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        width={320}
      >
        <Form layout="vertical">
          <FormItem label="teamname">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input the teamname!',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(TeamModalPC);
