import React, { Component } from 'react';

import LabelPC from '../components/cardview/LabelPC';

import serverAPI from '../serverAPI';

import { connect } from 'react-redux';
import { deleteLabel } from '../actions';
class LabelCC extends Component {
  state = {
    addedLabel: null,
    matchLabels: [],
  };

  selectSearchLabel = async (value, taskID) => {
    const label = this.props.labels.find(
      item => parseInt(item.id, 10) === parseInt(value, 10)
    );
    // {teamId: 2, color: "blue", body: "label11", id: 1}
    const res = await serverAPI.post(`/task-label-assignees`, {
      labelId: label.id,
      taskId: taskID,
    });

    this.setState(prevState => ({
      taskLabels: prevState.taskLabels.concat({
        assigneeID: res.data.id,
        id: label.id,
        color: label.color,
        body: label.body,
      }),
    }));
    // await this.props.fetchLabelData();
    await this.fetchAssignee(this.props.task.id);
  };

  createLabel = async (value, inputValue, taskID) => {
    const resLabel = await serverAPI.post(`/labels`, {
      teamId: parseInt(this.props.teamID, 10),
      body: inputValue,
      color: 'default',
    });
    const resAssignee = await serverAPI.post(`/task-label-assignees`, {
      labelId: resLabel.data.id,
      taskId: taskID,
    });
    this.setState({
      addedLabel: {
        assigneeID: resAssignee.data.id,
        id: resLabel.data.id,
        color: 'default',
        body: inputValue,
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
      this.setState(
        prevState => ({
          taskLabels: prevState.taskLabels.concat(this.state.addedLabel),
        }),
        () => {
          this.setState({ addedLabel: null });
        }
      );
      await serverAPI.patch(`/labels/${labelID}`, {
        color: this.state.addedLabel.color,
      });
      // await this.props.fetchLabelData();
      // await this.fetchAssignee(this.props.task.id);
    }
  };

  removeLabel = async assigneeID => {
    this.props.dispatch(deleteLabel(assigneeID));
    // fetch delete
    await serverAPI.delete(`/task-label-assignees/${assigneeID}`);
    // await this.props.fetchLabelData();
    // await this.fetchAssignee(this.props.task.id);
  };

  render() {
    return (
      <LabelPC
        {...this.props}
        onCreateLabel={(value, inputValue) =>
          this.createLabel(value, inputValue, this.props.task.id)
        }
        onSelectSearchLabel={id =>
          this.selectSearchhLabel(id, this.props.task.id)
        }
        matchSearch={this.matchSearch}
        selectColor={this.selectColor}
        closeColorPicker={this.closeColorPicker}
        removeLabel={this.removeLabel}
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

const pullilngCurrentTask = state => {
  return { currentTask: state.currentReducer.taskId };
};

const pullingTaskLabels = state => {
  const assignees = state.taskLabelReducer.slice();
  const currentTask = state.currentReducer.taskId.slice();
  const labels = state.labelReducer.slice();
  const filteredAssignees = assignees.filter(el => el.taskId === currentTask);
  const taskLabels = labels.filter(el => filteredAssignees.labelId === el.id);
  return { taskLabels };
};

const combine = state => {
  const aaa = pullingTeamLabels(state);
  const bbb = pullilngCurrentTask(state);
  const ccc = pullingTaskLabels(state);
  return { ...aaa, ...bbb, ...ccc };
};

export default connect(combine)(LabelCC);
