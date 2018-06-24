import React, { Component } from 'react';
import { Input, Icon, Checkbox } from 'antd';

class PasswordToggle extends Component {
  state = {
    checked: false,
  };
  handleChangeCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };
  static defaultProps = {
    onChangeChecked: () => {},
    checked: false,
  };
  render() {
    const { checked } = this.state;
    return (
      <React.Fragment>
        <label>
          show password <Checkbox onChange={this.handleChangeCheck} />
        </label>
        <Input
          type={checked ? 'text' : 'password'}
          prefix={<Icon type="lock" />}
          placeholder="password"
        />
      </React.Fragment>
    );
  }
}

export default PasswordToggle;
