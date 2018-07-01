import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import { Button, Modal, Icon, List, Input, Spin } from 'antd';

import MemberAvatarPC from '../utils/MemberAvatarPC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';
import serverAPI from '../../serverAPI';

class HeaderPC extends Component {
  state = {
    loading: false,
    q: '',
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
      // { id: 3, username: 'yooo', profile: '' },
      // { id: 4, username: 'geek', profile: '' },
      // { id: 5, username: 'geekerrrrrrrrr', profile: '' },
    ],
    visible: false,
  };

  handleShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      visible: false,
    });
  };

  changeQuery = e => {
    this.setState({ q: e.target.value }, () => {
      this.autocompleteSearchDebounced(this.state.q);
    });
  };

  autocompleteSearchDebounced = q => {
    return debounce(this.autocompleteSearch, 250)(q);
  };

  autocompleteSearch = q => {
    this.fetchSearch(q);
  };

  fetchMembers = async teamID => {
    const res = await serverAPI(`/team-assignee?teamId=${teamID}`);
  };

  fetchSearch = async q => {
    const res = await serverAPI(`/users?q=${q}`);
  };

  componentDidMount() {}

  componentWillUnMount() {
    this.autocompleteSearchDebounced.cancel();
  }

  render() {
    const { members, q, visible } = this.state;
    return (
      <React.Fragment>
        <div className="member-group">
          {members.map(member => (
            <MemberTooltipAvatarPC key={member.id} {...member} />
          ))}
        </div>
        <Button
          className="member-group__button"
          icon="user-add"
          shape="circle"
          onClick={this.handleShowModal}
        />
        <Modal
          style={{ top: 20 }}
          title={'New Member'}
          visible={visible}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          <React.Fragment>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={this.changeQuery}
              placeholder="input search text"
              value={q}
            />
            <List
              dataSource={this.props.members}
              renderItem={item =>
                this.state.searching ? (
                  <ListItem item={item} />
                ) : (
                  <div className="demo-loading-container">
                    <Spin />
                  </div>
                )
              }
            />
          </React.Fragment>
        </Modal>
      </React.Fragment>
    );
  }
}

function ListItem(props) {
  return (
    <List.Item key={props.item.id} onClick={() => {}}>
      <List.Item.Meta
        avatar={
          <MemberAvatarPC
            profile={props.item.profile}
            username={props.item.username}
          />
        }
        title={props.item.username}
        description={props.item.email}
      />
    </List.Item>
  );
}

export default HeaderPC;
