import React, { Component } from 'react';
import classNames from 'classnames';

import { Avatar, Button, Modal, Icon, List, Input } from 'antd';

import MemberAvatarPC from '../utils/MemberAvatarPC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';

class MemberGroupPC extends Component {
  static defaultProps = {
    onRemove: () => {}, // 멤버 삭제
    onClearMatch: () => {}, // 검색 매치된 사용자 데이터 초기화
    onAutocompleteSearch: q => {}, // 키워드 받아서 검색하는 함수
    onAddMember: () => {}, // 멤버 추가하는 함수(assignee에 추가)
    loading: false, // fetchData 될 경우 로딩 상태 여부
    matchUsers: [], // 키워드에 match된 사용자
    members: [], // 팀의 멤버
    useRemove: false, // 멤버 삭제 기능 사용할 지 여부
  };

  state = {
    q: '',
    visible: false,
  };

  handleShowModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCloseModal = () => {
    this.props.clearMatch();
    this.setState({
      q: '',
      visible: false,
    });
  };

  handleChangeQuery = e => {
    this.setState({ q: e.target.value }, () => {
      this.props.autocompleteSearch(this.state.q);
    });
  };

  handleAddMember = user => {
    this.props.onAddMember(user);
    this.handleCloseModal();
  };

  handleRemove = id => {
    this.props.onRemoveMember(id);
  };

  render() {
    const { visible, q } = this.state;
    const { loading, matchUsers, members, useRemove } = this.props;
    return (
      <React.Fragment>
        <div className="member-group">
          {loading ? (
            <Avatar icon="loading" />
          ) : (
            members.map(member => (
              <MemberTooltipAvatarPC
                key={member.id}
                {...member}
                useRemove={useRemove}
                onRemove={() => this.handleRemove(member.id)}
              />
            ))
          )}
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
              onChange={this.handleChangeQuery}
              placeholder="input search text"
              value={q}
            />
            <List
              className="user-search"
              dataSource={matchUsers}
              renderItem={item =>
                members.includes(item) ? (
                  <ListItem
                    // key={item.id}
                    member={true}
                    item={item}
                    onAddMemberGroup={() => {}}
                  />
                ) : (
                  <ListItem
                    // key={item.id}
                    member={false}
                    item={item}
                    onAddMemberGroup={() => {
                      this.handleAddMember(item);
                    }}
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
    <List.Item className={itemClass} onClick={props.onAddMemberGroup}>
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

export default MemberGroupPC;
