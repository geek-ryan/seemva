import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import TeamCreateButtonPC from './TeamCreateButtonPC';
import TeamEditButtonPC from './TeamEditButtonPC';
import TeamLeaveButtonPC from './TeamLeaveButtonPC';

class TeamMenuPC extends Component {
  static defaultProps = {
    teams: [],
    loading: false,
    current: 0,
    onChangeCurrent: () => {},
    onCreateTeams: name => {},
    onEditTeam: (teamID, teamname) => {},
    onDeleteTeam: teamID => {},
  };

  render() {
    const {
      teams,
      loading,
      current,
      onChangeCurrent,
      onCreateTeam,
      onEditTeam,
      onDeleteTeam,
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
            Welcome SEEMVA
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
              <Link
                to={`${this.props.match.url}/${id}`}
                onClick={() => this.props.onChangeCurrent(id)}
              >
                {current === id ? <Icon type="rocket" /> : ''}
                {name}
              </Link>
              {admin ? (
                <TeamEditButtonPC
                  id={id}
                  name={name}
                  onEditTeam={name => onEditTeam(id, name)}
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
