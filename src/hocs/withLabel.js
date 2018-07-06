import React, { Component } from 'react';
import serverAPI from '../serverAPI';
import { LabelConsumer } from '../contexts/LabelCTX';

export default function withLabel(WrappedComponent) {
  class LabelProxyComponent extends Component {
    state = {
      taskLabels: [
        // {
        //   id: 1,
        //   assigneeID: 1,
        //   color: 'red',
        //   body: 'red label',
        // },
      ],
      addedLabel: null,
      matchLabels: [],
    };

    fetchAssignee = async taskID => {
      const resAssignees = await serverAPI.get(
        `/task-label-assignees/?taskId=${taskID}`
      );
      let assigneeIds = [];
      let labelIds = [];
      for (const { id, labelId } of resAssignees.data) {
        assigneeIds.push(id);
        labelIds.push(labelId);
      }
      let taskLabels = [];
      for (const label of this.props.labels) {
        const index = labelIds.indexOf(label.id);
        index !== -1 &&
          taskLabels.push({
            id: label.id,
            assigneeID: assigneeIds[index],
            color: label.color,
            body: label.body,
          });
      }
      // 등록순으로 정렬하기 위해 필요함
      taskLabels.sort((a, b) => a.assigneeID - b.assigneeID);
      this.setState({
        taskLabels,
      });
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
      await this.props.fetchLabelData();
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
        await serverAPI.patch(`/labels/${labelID}`, {
          color: this.state.addedLabel.color,
        });
        // fetch patch로 color 변경
        this.setState(
          prevState => ({
            taskLabels: prevState.taskLabels.concat(this.state.addedLabel),
          }),
          () => {
            this.setState({ addedLabel: null });
          }
        );
        await this.props.fetchLabelData();
        await this.fetchAssignee(this.props.task.id);
      }
    };

    removeLabel = async assigneeID => {
      // fetch delete
      await serverAPI.delete(`/task-label-assignees/${assigneeID}`);
      await this.props.fetchLabelData();
      await this.fetchAssignee(this.props.task.id);
    };
    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          onLabelInit={async () => await this.fetchAssignee(this.props.task.id)}
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
        />
      );
    }
  }
  return class extends Component {
    render() {
      return (
        <LabelConsumer>
          {value => {
            return <LabelProxyComponent {...value} {...this.props} />;
          }}
        </LabelConsumer>
      );
    }
  };
}
