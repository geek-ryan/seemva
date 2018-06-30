import React, { Component } from 'react';
import { Button } from 'antd';

import MemberAvatarPC from '../utils/MemberAvatarPC';
// import UserIconPC from '../utils/UserIconPC';
// import SearchBarPC from './SearchBarPC';

class HeaderPC extends Component {
  static defaultProps = {
    teamname: 'team1',
    members: [
      {
        id: 1,
        username: 'fds',
        profile:
          'https://ucarecdn.com/80280868-a954-4114-8dbc-cfcf5c9d23f5/IMG_3128.jpg',
      },
      {
        id: 2,
        username: 'syami',
        profile:
          'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
      },
      { id: 3, username: 'yooo', profile: '' },
      { id: 4, username: 'geek', profile: '' },
      { id: 5, username: 'geekerrrrrrrrr', profile: '' },
    ],
  };
  // state = {
  //   visible: false,
  // };

  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // handleOk = e => {
  //   this.setState({
  //     visible: false,
  //   });
  // };
  // handleCancel = e => {
  //   this.setState({
  //     visible: false,
  //   });
  // };

  render() {
    const { teamname, members } = this.props;
    return (
      <div className="header">
        <h2 className="header__team-name">
          {teamname ? teamname : 'welcome team'}
        </h2>
        <div>
          {members.map(member => (
            <MemberAvatarPC key={member.id} {...member} />
          ))}
          <Button icon="plus" shape="circle" />
        </div>
        {/* <span>
          <Icon type="plus-circle-o" onClick={this.showModal} />
          <SearchBarPC />
        </span> */}

        {/* <Modal
          title={'New Member'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>This will be search form for member</p>
        </Modal> */}
      </div>
    );
  }
}

export default HeaderPC;
