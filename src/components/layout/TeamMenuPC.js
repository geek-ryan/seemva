import React, { Component } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Icon, Button } from 'antd';

class TeamMenuPC extends Component {
  static defaultProps = {
    teams: [],
    current: 0,
  };

  render() {
    const { teams, current } = this.props;
    return (
      <div className="team-menu">
        <div
          className={classNames(
            'team-menu-item',
            current ? '' : 'team-menu-item--current'
          )}
        >
          <Link to="/team">
            {current ? '' : <Icon type="rocket" />}
            Welcome team
          </Link>
        </div>
        {teams.map(({ id, name, admin }) => (
          <div
            className={classNames(
              'team-menu-item',
              parseInt(current) === parseInt(id)
                ? 'team-menu-item--current'
                : ''
            )}
            key={id}
          >
            <Link to={`/team/${id}`}>
              {parseInt(current) === parseInt(id) ? <Icon type="rocket" /> : ''}
              {name}
            </Link>
            {admin ? (
              <Button
                type="primary"
                size="small"
                shape="circle"
                icon="edit"
                onClick={() => {}}
              />
            ) : (
              ''
            )}
          </div>
        ))}
        <Button icon="plus" className="team-add-button">
          add team
        </Button>
      </div>
    );
  }
}

export default TeamMenuPC;
