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
    onChangeCurrent: () => console.log('default'),
    onCreateTeams: name => console.log('default'),
    onEditTeam: (teamID, teamname) => console.log('default'),
    onDeleteTeam: teamID => console.log('default'),
  };

  HandleChangeTeamCurrnetByRedux = id => {
    this.props.dispatch(currentTeam(id));
  };

  render() {
    const {
      teams,
      loading,
      current,
      teamCurrent,
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
            teamCurrent ? '' : 'team-menu-item--current'
          )}
        >
          <Link
            to={`${this.props.match.url}`}
            onClick={() => this.HandleChangeTeamCurrnetByRedux(0)}
          >
            {teamCurrent === 0 && <Icon type="rocket" />}
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
                  teamCurrent === id && 'team-menu-item--current'
                )}
                key={id}
              >
                <Link
                  to={`${this.props.match.url}/${id}`}
                  onClick={() => this.HandleChangeTeamCurrnetByRedux(id)}
                >
                  {teamCurrent === id && <Icon type="rocket" />}
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
  return {
    teams: state.teamReducer,
    teamCurrent: state.currentReducer.teamId,
  };
};

export default connect(pullingTeams)(TeamMenuPC);
