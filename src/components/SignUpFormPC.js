import React, { Component } from 'react';
import { Form, Input, Icon, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class SingUpPC extends Component {
  render() {
    const { onChange, checked } = this.props;
    return (
      <div>
        <h2>Creat New Account</h2>
        <Form>
          <FormItem>
            <Input prefix={<Icon type="mail" />} placeholder="email" />
            <Input prefix={<Icon type="user" />} placeholder="username" />
            <span>
              view password <Checkbox onChange={onChange} />
            </span>
            <Input
              type={checked ? 'text' : 'password'}
              prefix={<Icon type="lock" />}
              placeholder="password"
            />
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
      </div>
    );
  }
}

export default SingUpPC;
