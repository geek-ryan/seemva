import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

import SidebarOpenButtonPC from './SidebarOpenButtonPC';
import UserIconPC from './UserIconPC';
import ViewTypeButtonsPC from './ViewTypeButtonsPC';

class SideLinePC extends Component {
  render() {
    return (
      <React.Fragment>
        <SidebarOpenButtonPC />
        <UserIconPC />
        <ViewTypeButtonsPC />
      </React.Fragment>
    );
  }
}

export default SideLinePC;
