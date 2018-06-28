import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class LabelProvider extends Component {
  state = {
    labels: [
      {
        id: 1,
        teamId: 1,
        color: 'red',
        body: 'label_01',
      },
      {
        id: 2,
        teamId: 1,
        color: 'blue',
        body: 'label_02',
      },
      {
        id: 3,
        teamId: 1,
        color: 'grean',
        body: 'label_03',
      },
    ],
    labelTaskAssignees: [
      {
        id: 1,
        labelId: 1,
        taskId: 1,
      },
      {
        id: 2,
        labelId: 2,
        taskId: 2,
      },
      {
        id: 3,
        labelId: 3,
        taskId: 3,
      },
      {
        id: 4,
        labelId: 1,
        taskId: 4,
      },
      {
        id: 5,
        labelId: 2,
        taskId: 5,
      },
      {
        id: 6,
        labelId: 3,
        taskId: 1,
      },
      {
        id: 7,
        labelId: 1,
        taskId: 2,
      },
    ],
    labelFilter: [],
    labelMatch: [],
    labelChosen: [],
    labelSearchText: '',
  };

  handleLabelFilter = teamid => {
    const arr = this.state.labels.map(
      label => (label.teamId === teamid ? label : '')
    );
    this.setState({ labelFilter: arr });
  };

  handleSearchChange = text => {
    const arr = this.state.labelFilter.slice();
    const brr = arr.filter(element => element.body.match(text));
    this.setState({ labelMatch: brr, labelSearchText: text });
  };

  handlePushLabel = e => {
    if (
      this.state.labelChosen.filter(
        element => element.id === parseInt(e.target.value)
      ).length
    ) {
      ('');
    } else {
      const chosenOne = this.state.labelFilter.filter(
        element => element.id === parseInt(e.target.value)
      )[0];
      const arr = this.state.labelChosen.slice();
      arr.push(chosenOne);
      this.setState({ labelChosen: arr });
    }
  };

  handlePullLabel = e => {
    const arr = this.state.labelChosen.slice();
    const brr = arr.filter(element => element.id !== parseInt(e.target.value));
    this.setState({ labelChosen: brr });
  };

  handleCombineLabelTask = taskid => {
    const array = this.state.labelTaskAssignees.slice();
    const numLabel = array.sort((a, b) => b.id - a.id)[0].id + 1;
    let assignArr = [];
    for (let i = 0; i < this.state.labelChosen.length; i++) {
      const objLabel = {
        taskId: taskid,
        id: numLabel + i,
        labelId: this.state.labelChosen[i].id,
      };
      assignArr.push(objLabel);
    }
    const brr = this.state.labelTaskAssignees.slice();
    for (let i = 0; i < assignArr.length; i++) {
      brr.push(assignArr[i]);
    }
    this.setState({
      labelTaskAssignees: brr,
      labelMatch: [],
      labelChosen: [],
      labelSearchText: '',
    });
  };

  render() {
    const value = {
      value: this.state,
      labels: this.state.labels,
      labelTaskAssignees: this.state.labelTaskAssignees,
      labelFilter: this.state.labelFilter,
      labelMatch: this.state.labelMatch,
      labelChosen: this.state.labelChosen,
      labelSearchText: this.state.labelSearchText,
      handleCombineLabelTask: this.handleCombineLabelTask,
      handleLabelFilter: this.handleLabelFilter,
      handlePullLabel: this.handlePullLabel,
      handlePushLabel: this.handlePushLabel,
      handleSearchChange: this.handleSearchChange,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { LabelProvider, Consumer as LabelConsumer };
