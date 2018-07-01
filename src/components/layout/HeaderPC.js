import React, { Component } from 'react';
// import { Button, Modal, Icon } from 'antd';

import MemberGroupPC from '../utils/MemberGroupPC';
// import SearchMemberPC from '../layout/SearchMemberPC';

class HeaderPC extends Component {
  static defaultProps = {
    teamId: 1,
    teamname: 'team1',
    // members: [
    //   {
    //     id: 1,
    //     username: 'fds',
    //     profile:
    //       'https://ucarecdn.com/80280868-a954-4114-8dbc-cfcf5c9d23f5/IMG_3128.jpg',
    //   },
    //   {
    //     id: 2,
    //     username: 'syami',
    //     profile:
    //       'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
    //   },
    //   { id: 3, username: 'yooo', profile: '' },
    //   { id: 4, username: 'geek', profile: '' },
    //   { id: 5, username: 'geekerrrrrrrrr', profile: '' },
    // ],
  };

  render() {
    const { teamname } = this.props;
    return (
      <header className="header">
        <h2 className="header__team-name">
          {teamname ? teamname : 'welcome team'}
        </h2>
        <MemberGroupPC />
      </header>
    );
  }
}
export default HeaderPC;
