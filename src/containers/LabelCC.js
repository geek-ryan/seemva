import React, { Component } from 'react';
import LabelPC from '../components/cardview/LabelPC';
import serverAPI from '../serverAPI';

import { connect } from 'react-redux';
import {
  createLabelTaskAssignee,
  deleteLabelTaskAssignee,
  createLabel,
} from '../actions';

const moment = require('moment');

class LabelCC extends Component {
  state = {
    addedLabel: null,
    matchLabels: [],
  };

  selectSearchLabel = (value, taskID) => {
    console.log('select search label', value, taskID);

    const label = this.props.labels.find(
      item => parseInt(item.id, 10) === parseInt(value, 10)
    );

    this.props.dispatch(
      createLabelTaskAssignee({
        labelId: label.id,
        teamId: this.props.teamCurrent,
        taskId: taskID,
      })
    );

    // {teamId: 2, color: "blue", body: "label11", id: 1}
    // const res = await serverAPI.post(`/task-label-assignees`, {
    //   labelId: label.id,
    //   taskId: taskID,
    // });

    // this.setState(prevState => ({
    //   taskLabels: prevState.taskLabels.concat({
    // assigneeID: res.data.id,
    // id: label.id,
    //     color: label.color,
    //     body: label.body,
    //   }),
    // }));
    // await this.props.fetchLabelData();
    // await this.fetchAssignee(this.props.task.id);
  };

  createLabel = async (value, inputValue, taskID) => {
    // const theLabel = this.props.dispatch(
    //   createLabel({
    //     teamId: this.props.teamCurrent,
    //     color: 'red',
    //     body: inputValue,
    //     logDate: moment(),
    //   })
    // );
    // console.log('createLabel', theLabel);
    // this.props.dispatch(
    //   createLabelTaskAssignee({ labelId: theLabel.id, taskId: taskID })
    // );
    // const resLabel = await serverAPI.post(`/labels`, {
    //   teamId: parseInt(this.props.teamID, 10),
    //   body: inputValue,
    //   color: 'default',
    // });
    // const resAssignee = await serverAPI.post(`/task-label-assignees`, {
    //   labelId: resLabel.data.id,
    //   taskId: taskID,
    // });
    this.setState({
      addedLabel: {
        // assigneeID: resAssignee.data.id,
        // id: resLabel.data.id,
        color: 'default',
        body: inputValue,
        taskID: taskID,
      },
    });
  };

  matchSearch = value => {
    const matchLabels = value
      ? this.props.labels.filter(label => label.body.includes(value))
      : [];
    this.setState({ matchLabels });
  };

  selectColor = color => {
    this.setState(prevState => ({
      addedLabel: {
        ...prevState.addedLabel,
        color,
      },
    }));
  };

  closeColorPicker = async (visible, labelID) => {
    if (!visible) {
      // fetch patch로 color 변경
      // this.setState(
      //   prevState => ({
      //     taskLabels: prevState.taskLabels.concat(this.state.addedLabel),
      //   }),
      //   () => {
      //     this.setState({ addedLabel: null });
      //   }
      // );
      // await serverAPI.patch(`/labels/${labelID}`, {
      //   color: this.state.addedLabel.color,
      // });
      // await this.props.fetchLabelData();
      // await this.fetchAssignee(this.props.task.id);
      const theLabel = this.props.dispatch(
        createLabel({
          teamId: this.props.teamCurrent,
          color: this.state.addedLabel.color,
          body: this.state.addedLabel.body,
          logDate: moment(),
        })
      );
      console.log(
        'createLabel',
        theLabel,
        'task id',
        this.state.addedLabel.taskID
      );
      this.props.dispatch(
        createLabelTaskAssignee({
          labelId: theLabel.id,
          taskId: this.state.addedLabel.taskID,
        })
      );
      this.setState({ addedLabel: null });
    }
  };

  removeLabel = assigneeID => {
    this.props.dispatch(deleteLabelTaskAssignee(assigneeID));
    // fetch delete
    // await serverAPI.delete(`/task-label-assignees/${assigneeID}`);
    // await this.props.fetchLabelData();
    // await this.fetchAssignee(this.props.task.id);
  };

  render() {
    return (
      <LabelPC
        {...this.state}
        {...this.props}
        onCreateLabel={(value, inputValue) =>
          this.createLabel(value, inputValue, this.props.task.id)
        }
        onSelectSearchLabel={id =>
          this.selectSearchLabel(id, this.props.task.id)
        }
        matchSearch={this.matchSearch}
        selectColor={this.selectColor}
        closeColorPicker={this.closeColorPicker}
        removeLabel={this.removeLabel}
        handleSelect={this.handleSelect}
      />
    );
  }
}

const pullingTeamLabels = state => {
  const labels = state.labelReducer.slice();
  const filteredLabels = labels.filter(
    el => el.teamId === state.currentReducer.teamId
  );
  return { labels: filteredLabels };
};

// const pullilngCurrentTask = state => {
//   return { currentTask: state.currentReducer.taskId };
// };

const pullingTaskLabels = state => {
  const assignees = state.labelTaskAssigneeReducer.slice();
  const currentTask = state.currentReducer.taskId;
  const labels = state.labelReducer.slice();
  const filteredAssignees = assignees.filter(el => el.taskId === currentTask);
  let taskLabels = [];
  filteredAssignees.forEach(assignee =>
    labels.forEach(
      label =>
        label.id === assignee.labelId &&
        (() => {
          let element = { ...label, assigneeID: assignee.id };
          taskLabels.push(element);
        })()
    )
  );
  console.log('taskLabels', taskLabels, 'assignees', assignees);
  return { taskLabels };
};

const combine = state => {
  const aaa = pullingTeamLabels(state);
  // const bbb = pullilngCurrentTask(state);
  const ccc = pullingTaskLabels(state);
  return { ...aaa, ...ccc };
};

export default connect(combine)(LabelCC);
