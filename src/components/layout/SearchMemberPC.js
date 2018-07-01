import React, { Component } from 'react';
import { List, Input, Icon, Button, Spin } from 'antd';

import MemberAvatarPC from '../utils/MemberAvatarPC';
import withUser from '../../hocs/withUser';

class SearchMemberPC extends Component {
  static defaultProps = {
    handlePushLabel: () => {},
    handlePullLabel: () => {},
    handleSearchChange: () => {},
  };

  state = {
    searching: false,
    // members: [
    //   {
    //     id: 1,
    //     username: 'fds',
    //     email: 'fds@seemva.mail',
    //     profile:
    //       'https://ucarecdn.com/80280868-a954-4114-8dbc-cfcf5c9d23f5/IMG_3128.jpg',
    //   },
    //   {
    //     id: 2,
    //     username: 'syami',
    //     email: 'syami@seemva.mail',
    //     profile:
    //       'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
    //   },
    //   { id: 3, username: 'yooo', email: 'yooo@seemva.mail', profile: '' },
    //   { id: 4, username: 'geek', email: 'geeek@seemva.mail', profile: '' },
    //   {
    //     id: 5,
    //     username: 'geekerrrrrrrrr',
    //     email: 'geekerrrrrrrrr@seemva.mail',
    //     profile: '',
    //   },
    // ],
  };

  componentDidMount = () => {
    this.props.userFunc.teamFilter();
    if (this.props.taskId) {
      this.props.userFunc.taskFilter(this.props.taskId);
    }
  };

  handleSearchTextChange = e => {
    this.setState({ searching: true });
    this.props.userFunc.searchText(e.target.value);
    if (!e.target.value) {
      this.setState({ searching: false });
    }
  };

  render() {
    // const result = (
    //   // <List.Item key={item.id} onClick={this.props.userFunc.pushChoise}>
    //   //   <List.Item.Meta
    //   //     avatar={
    //   //       <MemberAvatarPC profile={item.profile} username={item.username} />
    //   //     }
    //   //     title={item.username}
    //   //     description={item.email}
    //   //   />
    //   // </List.Item>
    // )

    const chosenMembers = (
      <div>
        {this.props.userState.userChosen.map(element => {
          return (
            <Button
              onClick={this.props.userFunc.pullChoise}
              key={element.id}
              value={element.id}
            >
              {element.username}
            </Button>
          );
        })}
      </div>
    );

    return (
      <React.Fragment>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.handleSearchTextChange}
          placeholder="input search text"
          value={this.props.userState.userSearchText}
        />
        {/* <List
          dataSource={this.props.userState.userMatch}
          renderItem={item =>
            this.state.searching ? (
              result
            ) : (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )
          }
        /> */}
        {/* <div>{this.state.searching ? result : 'Loading users....'}</div> */}
      </React.Fragment>
    );
  }
}

export default withUser(SearchMemberPC);
