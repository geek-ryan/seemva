import React, { Component } from 'react';
import { Input, Button, List, Icon } from 'antd';

import classNames from 'classnames';

import LoadingIconPC from '../utils/LoadingIconPC';
import MemberAvatarPC from '../utils/MemberAvatarPC';

class UserSearchBar extends Component {
  state = {
    searching: false,
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
    // const itemClass = classNames(
    //   'user-search__item',
    //   props.member ? 'user-search__item--disabled' : ''
    // );

    if (this.props.userState.loading) {
      return <LoadingIconPC />;
    } else {
      const result = (
        <div>
          {this.props.userState.userMatch.map(element => {
            return (
              <List.Item
                key={element.id}
                className={
                  ('user-search__item',
                  this.props.userState.userChosen.filter(
                    el => el.id === element.id
                  ).length > 0
                    ? 'user-search__item--disabled'
                    : '')
                }
                onClick={() => {
                  this.props.userFunc.pushChoise(element.id);
                }}
              >
                <List.Item.Meta
                  avatar={
                    <MemberAvatarPC
                      profile={element.profile}
                      username={element.username}
                    />
                  }
                  title={element.username}
                  description={element.email}
                />
                <Icon type="plus" />
              </List.Item>
            );
          })}

          {/* <Button
            onClick={this.props.userFunc.pushChoise}
            key={element.id}
            value={element.id}
          >
            {element.username}
          </Button> */}
        </div>
      );

      const chosenLabels = (
        <div>
          {this.props.userState.userChosen.map(element => {
            return (
              <List.Item
                key={element.id}
                onClick={() => {
                  this.props.userFunc.pullChoise(element.id);
                }}
              >
                <List.Item.Meta
                  avatar={
                    <MemberAvatarPC
                      profile={element.profile}
                      username={element.username}
                    />
                  }
                  title={element.username}
                  description={element.email}
                />
                <Icon type="minus" />
              </List.Item>

              // <Button
              //   onClick={this.props.userFunc.pullChoise}
              //   key={element.id}
              //   value={element.id}
              // >
              //   {element.username}
              // </Button>
            );
          })}
        </div>
      );

      return (
        <React.Fragment>
          <div>
            {this.props.userState.userChosen.length
              ? chosenLabels
              : 'Please choose user'}
          </div>
          <Input
            onChange={this.handleSearchTextChange}
            placeholder="input search text"
            value={this.props.userState.userSearchText}
          />
          <div>{this.state.searching ? result : 'Loading users....'}</div>
        </React.Fragment>
      );
    }
  }
}

export default UserSearchBar;
