import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import TeamCreateButtonPC from './TeamCreateButtonPC';
import TeamEditButtonPC from './TeamEditButtonPC';
import TeamLeaveButtonPC from './TeamLeaveButtonPC';

import { connect } from 'react-redux';
import { currentTeam } from '../../actions';

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

  HandleChangeTeamCurrnetByRedux = id => {
    this.props.dispatch(currentTeam(id));
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
          <Link
            to={`${this.props.match.url}`}
            onClick={() => onChangeCurrent(0)}
          >
            {current ? '' : <Icon type="rocket" />}
            Welcome SEEMVA
          </Link>
        </div>
        {loading ? (
          <div className="loading-box">
            <Icon type="loading" />
          </div>
        ) : (
          teams.map(({ id, admin, teamname }) => {
            return (
              <div
                className={classNames(
                  'team-menu-item',
                  current === id ? 'team-menu-item--current' : ''
                )}
                key={id}
              >
                <Link
                  to={`${this.props.match.url}/${id}`}
                  onClick={() => this.HandleChangeTeamCurrnetByRedux(id)}
                >
                  {current === id ? <Icon type="rocket" /> : ''}
                  {teamname}
                </Link>
                {admin ? (
                  <TeamEditButtonPC
                    id={id}
                    name={teamname}
                    onEditTeam={teamname => onEditTeam(id, teamname)}
                    onDelete={() => onDeleteTeam(id, admin)}
                  />
                ) : (
                  <TeamLeaveButtonPC
                    name={teamname}
                    onDelete={() => onDeleteTeam(id, admin)}
                  />
                )}
              </div>
            );
          })
        )}
        <TeamCreateButtonPC onCreateTeam={onCreateTeam} />
      </div>
    );
  }
}

const pullingTeams = state => {
  return { teams: state.teamReducer };
};

export default connect(pullingTeams)(TeamMenuPC);
