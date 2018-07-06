import React, { Component } from 'react';
import { Form, Input, Icon, Checkbox } from 'antd';

const FormItem = Form.Item;
class PasswordToggle extends Component {
  static defaultProps = {
    getFieldDecorator: '',
    passwordError: '',
  };

  state = {
    checked: false,
  };

  handleChangeCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  render() {
    const { checked } = this.state;
    const { passwordError, getFieldDecorator } = this.props;
    return (
      <React.Fragment>
        <label className="password-view">
          show password <Checkbox onChange={this.handleChangeCheck} />
        </label>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!',
              },
            ],
          })(
            <Input
              size="large"
              type={checked ? 'text' : 'password'}
              prefix={<Icon type="lock" />}
              placeholder="password"
            />
          )}
        </FormItem>
      </React.Fragment>
    );
  }
}

export default PasswordToggle;
