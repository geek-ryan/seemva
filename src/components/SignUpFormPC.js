import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

import PasswordTogglePC from './PasswordTogglePC';

const FormItem = Form.Item;

class SingUpPC extends Component {
  static defaultProps = {
    onSubmitRegister: () => {},
  };

  render() {
    const { onSubmitRegister } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>Creat New Account</h2>
        <Form onSubmit={onSubmitRegister}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ],
            })(<Input prefix={<Icon type="mail" />} placeholder="email" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('username', {})(
              <Input prefix={<Icon type="user" />} placeholder="username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {})(<PasswordTogglePC />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__button"
              style={{ width: '100%' }}
              disabled
            >
              Sign up
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SingUpPC);
