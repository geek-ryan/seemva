import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class LabelProvider extends Component {
  state = {
    loading: false,
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

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.get('/labels');
      this.setState({ labels: res.data, loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  teamFilter = teamid => {
    const arr = this.state.labels.map(
      label => (label.teamId === teamid ? label : '')
    );
    this.setState({ labelFilter: arr });
  }; // on team-filtered data to labelChosen

  taskFilter = taskid => {
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
  }; // on team-task-filtered data to labelChosen

  searchText = (text, teamId = 1) => {
    const arr = this.state.labelFilter.slice();
    const brr = arr.filter(element => element.body.match(text));
    if (brr.length < 1) {
      const obj = {
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
      this.setState({
        labelMatch: brr,
        labelSearchText: text,
        labelNew: false,
      });
    }
  }; // on matched label data by seerch text to labelMatch

  pushChoise = e => {
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
  }; // on clicked label to labelChosen

  pullChoise = e => {
    const arr = this.state.labelChosen.slice();
    const brr = arr.filter(element => element.id !== parseInt(e.target.value));
    this.setState({ labelChosen: brr });
  }; // off clicked label from labelChosen

  Create = async () => {
    try {
      if (this.state.labelNew) {
        const res = await serverAPI.post('/labels', this.state.labelMatch[0]);
        const arr = this.state.labels.slice();
        const brr = this.state.labelFilter.slice();
        const crr = this.state.labelChosen.slice();
        arr.push(res.data);
        brr.push(res.data);
        crr.push(res.data);
        this.setState({
          labels: arr,
          labelFilter: brr,
          labelChosen: crr,
          labelMatch: [],
          labelSearchText: '',
          labelNew: false,
        });
      }
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
  }; // on created label to labels

  assigneeCreate = async taskid => {
    try {
      const assignees = this.state.labelTaskAssignees.slice();
      const chosen = this.state.labelChosen.slice();
      const assignLastNum = assignees.sort((a, b) => b.id - a.id)[0].id + 1;
      let filtered = [];

      for (let j = 0; j < assignees.length; j++) {
        if (taskid !== assignees[j].taskId) {
          filtered.push(assignees[j]);
        }
      }

      if (chosen.length !== 0) {
        for (let i = 0; i < chosen.length; i++) {
          const assignee = {
            id: assignLastNum + i,
            taskId: taskid,
            labelId: chosen[i].id,
          };
          filtered.push(assignee);
        }
      }

      this.setState({
        labelTaskAssignees: filtered,
        labelMatch: [],
        labelChosen: [],
        labelSearchText: '',
      });

      // const pre = this.state.tasks.slice();
      // const res = await serverAPI.post('/tasks', o);
      // pre.push(res.data);
      // this.setState({ tasks: pre, loading: false });
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
  };

  render() {
    const value = {
      labelState: this.state,
      labelFunc: {
        assigneeCreate: this.assigneeCreate,
        teamFilter: this.teamFilter,
        pullChoise: this.pullChoise,
        pushChoise: this.pushChoise,
        searchText: this.searchText,
        taskFilter: this.taskFilter,
        Create: this.Create,
      },

      // value: this.state,
      // labels: this.state.labels,
      // labelTaskAssignees: this.state.labelTaskAssignees,
      // labelFilter: this.state.labelFilter,
      // labelMatch: this.state.labelMatch,
      // labelChosen: this.state.labelChosen,
      // labelNew: this.state.labelNew,
      // labelSearchText: this.state.labelSearchText,
      // handleCombineLabelTask: this.handleCombineLabelTask,
      // handleLabelFilter: this.handleLabelFilter,
      // handlePullLabel: this.handlePullLabel,
      // handlePushLabel: this.handlePushLabel,
      // handleSearchChange: this.handleSearchChange,
      // handleLabelTaskSetting: this.handleLabelTaskSetting,
      // handleNewLabel: this.handleNewLabel,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { LabelProvider, Consumer as LabelConsumer };
