import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';

import EditableTextareaPC from '../utils/EditableTextareaPC';
import ActivityCC from '../../containers/ActivityCC';
import LabelSearchBar from '../utils/LabelSearchBar';
import UserSearchBar from '../utils/UserSearchBar';

var moment = require('moment');

class CardViewTaskModalPC extends Component {
  render() {
    return (
      <React.Fragment>
        <EditableTextareaPC
          body={this.props.task.title}
          keyType={'title'}
          datatype={'task'}
          editfunc={this.props.taskFunc.Update}
          {...this.props}
        />
        <EditableTextareaPC
          body={this.props.task.body}
          keyType={'body'}
          datatype={'task'}
          editfunc={this.props.taskFunc.Update}
          {...this.props}
        />
        <div>
          <Button onClick={this.props.taskModalCompleteConfirm}>Confirm</Button>
          <Button onClick={this.props.taskModalDeleteConfirm} type="dashed">
            Delete
          </Button>
        </div>

        <UserSearchBar taskId={this.props.task.id} {...this.props} />

        <LabelSearchBar taskId={this.props.task.id} {...this.props} />

        <div>
          start date:
          <DatePicker
            onChange={this.props.taskModalStartDateChange}
            value={moment(this.props.task.startDate, 'YYYY.MM.DD')}
          />
          due date:
          <DatePicker
            onChange={this.props.taskModalDueDateChange}
            value={moment(this.props.task.dueDate, 'YYYY.MM.DD')}
          />
        </div>
        <ActivityCC {...this.props} />
      </React.Fragment>
    );
  }
}

export default CardViewTaskModalPC;
