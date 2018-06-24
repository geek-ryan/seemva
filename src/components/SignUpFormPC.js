import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;

class SingUpPC extends Component {
  render() {
    return (
      <div>
        <h2>Creat New Account</h2>
        <Form>
          <FormItem>
            <Input prefix={<Icon type="mail" />} placeholder="email" />
            <Input prefix={<Icon type="user" />} placeholder="username" />
            <Input prefix={<Icon type="lock" />} placeholder="password" />
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
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

export default SingUpPC;
