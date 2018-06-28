import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Icon, Button, Avatar } from 'antd';
import TeamMenuCC from '../../containers/TeamMenuCC';

class SideNavPC extends Component {
  static defaultProps = {
    profile: '',
    username: '',
    onChangeProfile: () => {},
    onLogout: () => {},
  };

  state = {
    open: true,
  };

  handleSideBarOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;
    const { profile, username, onChangeProfile, onLogout } = this.props;
    return (
      <div className={classNames('sidebar', open ? '' : 'sidebar--closed')}>
        <Button
          className="sidebar__button"
          type="default"
          shape="circle"
          icon={open ? 'left' : 'right'}
          onClick={this.handleSideBarOpen}
        />

        <div className="sidebar__menu">
          {!open ? (
            <div className="user-avatar" onClick={onChangeProfile}>
              {profile ? <Avatar src={profile} /> : <Avatar>{username}</Avatar>}
            </div>
          ) : (
            ''
          )}
          <div className="board-type-menu">
            <div
              className={classNames(
                'board-type-menu__item',
                'board-type-menu__item--current'
              )}
            >
              <Link to="/team/1/card">
                <Icon type="appstore-o" />
              </Link>
            </div>
            <div className="board-type-menu__item">
              <Link to="/team/1/timeline">
                <Icon type="clock-circle-o" />
              </Link>
            </div>
            <div className="board-type-menu__item">
              <Link to="/team/1/calendar">
                <Icon type="calendar" />
              </Link>
            </div>
          </div>
        </div>
        <div className="sidebar__toggle-menu">
          <h1 className="sidebar-logo">SEEMVA</h1>
          <div className="sidebar-user">
            <div className="user-avatar--big" onClick={onChangeProfile}>
              {profile ? (
                <img src={profile} alt={`${username} avatar`} />
              ) : (
                <span>{username}</span>
              )}
              <Icon className="user-avatar__setting-button" type="setting" />
            </div>
            <p className="sidebar-user__name">{username}</p>
          </div>
          <TeamMenuCC />
          <Button onClick={onLogout}>Log out</Button>
        </div>
      </div>
    );
  }
}

export default SideNavPC;
