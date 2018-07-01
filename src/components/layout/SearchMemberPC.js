import React, { Component } from 'react';
import { List, Input, Icon, Button, Spin } from 'antd';

import MemberAvatarPC from '../utils/MemberAvatarPC';
import withUser from '../../hocs/withUser';

class SearchMemberPC extends Component {
  static defaultProps = {};

  render() {
    return (
      <React.Fragment>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={() => {}}
          placeholder="input search text"
          value={this.props.q}
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

export default withUser(SearchMemberPC);
