import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Icon, Button, Tooltip } from 'antd';
import TeamCreateButtonPC from './TeamCreateButtonPC';
import TeamEditButtonPC from './TeamEditButtonPC';
import TeamLeaveButtonPC from './TeamLeaveButtonPC';

class TeamMenuPC extends Component {
  static defaultProps = {
    teams: [],
    loading: false,
    current: 0,
    onChangeCurrent: () => {},
    onDeleteTeam: teamID => {},
    onCreateTeams: name => {},
  };

  render() {
    const {
      teams,
      loading,
      current,
      onDeleteTeam,
      onChangeCurrent,
      onCreateTeam,
    } = this.props;
    return (
      <div className="team-menu">
        <div
          className={classNames(
            'team-menu-item',
            current ? '' : 'team-menu-item--current'
          )}
        >
          <Link to="/card" onClick={() => onChangeCurrent(0)}>
            {current ? '' : <Icon type="rocket" />}
            Welcome team
          </Link>
        </div>
        {loading ? (
          <div className="loading-box">
            <Icon type="loading" />
          </div>
        ) : (
          teams.map(({ id, admin, name }) => (
            <div
              className={classNames(
                'team-menu-item',
                current === id ? 'team-menu-item--current' : ''
              )}
              key={id}
            >
              <Link to={`/card/${id}`} onClick={() => onChangeCurrent(id)}>
                {current === id ? <Icon type="rocket" /> : ''}
                {name}
              </Link>
              {admin ? (
                <TeamEditButtonPC
                  name={name}
                  onDelete={() => onDeleteTeam(id, admin)}
                />
              ) : (
                <TeamLeaveButtonPC
                  name={name}
                  onDelete={() => onDeleteTeam(id, admin)}
                />
              )}
            </div>
          ))
        )}
        <TeamCreateButtonPC onCreateTeam={onCreateTeam} />
      </div>
    );
  }
}

export default TeamMenuPC;
