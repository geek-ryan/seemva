import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';
import { Redirect } from 'react-router-dom';

import EditableTextareaPC from '../utils/EditableTextareaPC';
import ActivityCC from '../../containers/ActivityCC';
import LabelSearchBar from '../utils/LabelSearchBar';
import UserSearchBar from '../utils/UserSearchBar';
import LoadingIconPC from '../utils/LoadingIconPC';

var moment = require('moment');

class CardViewTaskModalPC extends Component {
  render() {
    if (!this.props.taskModal.visible) {
      return <Redirect to={'/card'} />;
    } else {
      return (
        <React.Fragment>
          {this.props.taskState.loading ? (
            <LoadingIconPC />
          ) : (
            <EditableTextareaPC
              body={this.props.task.title}
              keyType={'title'}
              datatype={'task'}
              editfunc={this.props.taskFunc.Update}
              {...this.props}
            />
          )}

          {this.props.taskState.loading ? (
            <LoadingIconPC />
          ) : (
            <EditableTextareaPC
              body={this.props.task.body}
              keyType={'body'}
              datatype={'task'}
              editfunc={this.props.taskFunc.Update}
              {...this.props}
            />
          )}

          <div>
            <Button onClick={this.props.taskModalCompleteConfirm}>
              Confirm
            </Button>
            <Button onClick={this.props.taskModalDeleteConfirm} type="dashed">
              Delete
            </Button>
          </div>

          <UserSearchBar taskId={this.props.task.id} {...this.props} />

          <LabelSearchBar taskId={this.props.task.id} {...this.props} />

          {this.props.taskState.loading ? (
            <LoadingIconPC />
          ) : (
            <div>
              start date:
              <DatePicker
                onChange={this.props.taskModalStartDateChange}
                value={moment(this.props.task.startDate, 'YYYY.MM.DD')}
              />
            </div>
          )}

          {this.props.taskState.loading ? (
            <LoadingIconPC />
          ) : (
            <div>
              due date:
              <DatePicker
                onChange={this.props.taskModalDueDateChange}
                value={moment(this.props.task.dueDate, 'YYYY.MM.DD')}
              />
            </div>
          )}

          <ActivityCC {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default CardViewTaskModalPC;
