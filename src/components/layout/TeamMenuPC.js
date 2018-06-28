import React, { Component } from 'react';
import classNames from 'classnames';

import { Route, Link } from 'react-router-dom';
import { Icon, Button } from 'antd';
import TeamModalPC from './TeamModalPC';

class TeamMenuPC extends Component {
  static defaultProps = {
    teams: [],
    current: 0,
  };

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  render() {
    const { teams, current, onChangeCurrent } = this.props;
    return (
      <div className="team-menu">
        <div
          className={classNames(
            'team-menu-item',
            current ? '' : 'team-menu-item--current'
          )}
        >
          <Link to="/team" onClick={() => onChangeCurrent(0)}>
            {current ? '' : <Icon type="rocket" />}
            Welcome team
          </Link>
        </div>
        {teams.map(({ id, name, admin }) => (
          <div
            className={classNames(
              'team-menu-item',
              current === id ? 'team-menu-item--current' : ''
            )}
            key={id}
          >
            <Link to={`/team/${id}`} onClick={() => onChangeCurrent(id)}>
              {current === id ? <Icon type="rocket" /> : ''}
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
        <Button
          icon="plus"
          className="team-add-button"
          onClick={this.showModal}
        >
          add team
        </Button>
        <TeamModalPC
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default TeamMenuPC;
