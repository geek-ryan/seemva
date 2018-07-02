import React, { Component } from 'react';
import classNames from 'classnames';

import { Button, Modal, Icon, List, Input } from 'antd';

import MemberAvatarPC from '../utils/MemberAvatarPC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';

class HeaderPC extends Component {
  state = {
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

  render() {
    const { visible } = this.state;
    const { onChangeQuery, matchUsers, members, q } = this.props;
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
          title={'Add Members'}
          visible={visible}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          <React.Fragment>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={onChangeQuery}
              placeholder="input search text"
              value={q}
            />
            <List
              className="user-search"
              dataSource={matchUsers}
              renderItem={item =>
                members.includes(item) ? (
                  <ListItem
                    key={item.id}
                    member={true}
                    item={item}
                    onClick={() => {}}
                  />
                ) : (
                  <ListItem
                    key={item.id}
                    member={false}
                    item={item}
                    onClick={() => {}}
                  />
                )
              }
            />
            {/* {spin 나중에} */}
          </React.Fragment>
        </Modal>
      </React.Fragment>
    );
  }
}

function ListItem(props) {
  const itemClass = classNames(
    'user-search__item',
    props.member ? 'user-search__item--disabled' : ''
  );
  return (
    <List.Item className={itemClass}>
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
      <Icon type="arrow-right" />
    </List.Item>
  );
}

export default HeaderPC;
