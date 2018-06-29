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
    labelNew: false,
  };

  handleLabelTaskSetting = taskid => {
    const arr = this.state.labelTaskAssignees
      .slice()
      .filter(element => element.taskId === taskid)
      .map(element => element.labelId);
    const brr = this.state.labels.slice().filter(element => {
      let k = 0;
      for (let i = 0; i < arr.length; i++) {
        element.id === arr[i] ? k++ : '';
      }
      return k > 0;
    });
    this.setState({ labelChosen: brr });
  };

  handleLabelFilter = teamid => {
    const arr = this.state.labels.map(
      label => (label.teamId === teamid ? label : '')
    );
    this.setState({ labelFilter: arr });
  };

  handleSearchChange = (text, teamId = 1) => {
    const arr = this.state.labelFilter.slice();
    const brr = arr.filter(element => element.body.match(text));
    if (brr.length < 1) {
      const array = this.state.labels.slice();
      const numLabel = array.sort((a, b) => b.id - a.id)[0].id + 1;
      const obj = {
        id: numLabel,
        teamId: parseInt(teamId),
        color: 'blue',
        body: text,
      };
      this.setState({
        labelMatch: [obj],
        labelSearchText: text,
        labelNew: true,
      });
    } else {
      this.setState({ labelMatch: brr, labelSearchText: text });
    }
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

  handleNewLabel = () => {
    if (this.state.labelNew) {
      const arr = this.state.labels.slice();
      const brr = this.state.labelFilter.slice();
      const crr = this.state.labelChosen.slice();
      arr.push(this.state.labelMatch[0]);
      brr.push(this.state.labelMatch[0]);
      crr.push(this.state.labelMatch[0]);
      this.setState({
        labels: arr,
        labelFilter: brr,
        labelChosen: crr,
        labelMatch: [],
        labelSearchText: '',
        labelNew: false,
      });
    }
  };

  handleCombineLabelTask = (taskid, type = 'add') => {
    const array = this.state.labelTaskAssignees.slice();
    const numLabel = array.sort((a, b) => b.id - a.id)[0].id + 1;

    if (type === 'add') {
      let assignArr = [];
      for (let i = 0; i < this.state.labelChosen.length; i++) {
        const objLabel = {
          taskId: taskid,
          id: numLabel + i,
          labelId: this.state.labelChosen[i].id,
        };
        assignArr.push(objLabel);
      }
      const arr = this.state.labelTaskAssignees.slice();
      for (let i = 0; i < assignArr.length; i++) {
        arr.push(assignArr[i]);
      }
      this.setState({
        labelTaskAssignees: arr,
        labelMatch: [],
        labelChosen: [],
        labelSearchText: '',
      });
    } else {
      const arr = this.state.labelTaskAssignees.slice().filter(element => {
        let k = 0;
        for (let i = 0; i < this.state.labelChosen.length; i++) {
          element.taskId === taskid ? '' : k++;
        }
        return k > 0;
      });
      for (let i = 0; i < this.state.labelChosen.length; i++) {
        arr.push({
          id: numLabel + i,
          taskId: taskid,
          labelId: this.state.labelChosen[i].id,
        });
      }
      this.setState({
        labelTaskAssignees: arr,
        labelMatch: [],
        labelChosen: [],
        labelSearchText: '',
      });
    }
  };

  render() {
    const value = {
      value: this.state,
      labels: this.state.labels,
      labelTaskAssignees: this.state.labelTaskAssignees,
      labelFilter: this.state.labelFilter,
      labelMatch: this.state.labelMatch,
      labelChosen: this.state.labelChosen,
      labelNew: this.state.labelNew,
      labelSearchText: this.state.labelSearchText,
      handleCombineLabelTask: this.handleCombineLabelTask,
      handleLabelFilter: this.handleLabelFilter,
      handlePullLabel: this.handlePullLabel,
      handlePushLabel: this.handlePushLabel,
      handleSearchChange: this.handleSearchChange,
      handleLabelTaskSetting: this.handleLabelTaskSetting,
      handleNewLabel: this.handleNewLabel,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { LabelProvider, Consumer as LabelConsumer };
