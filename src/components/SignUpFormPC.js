import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;

class SingUpPC extends Component {
  render() {
    return (
      <Form>
        <FormItem>
          <Input prefix={<Icon type="mail" />} placeholder="email" />
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type="user" />} placeholder="username" />
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type="lock" />} placeholder="password" />
        </FormItem>
        <FormItem>
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
    );
  }
}

export default SingUpPC;
