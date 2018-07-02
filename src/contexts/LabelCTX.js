import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class LabelProvider extends Component {
  state = {
    target: '',
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
      const rees = await serverAPI.get('/task-label-assignees');
      this.setState({
        labels: res.data,
        labelTaskAssignees: rees.data,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  teamFilter = async teamid => {
    try {
      const res = await serverAPI.get('/labels');
      const arr = res.data.map(label => (label.teamId === teamid ? label : ''));
      this.setState({ labelFilter: arr });
    } catch (e) {
      const res = await serverAPI.get('/labels');
      const rees = await serverAPI.get('/task-label-assignees');
      this.setState({
        labels: res.data,
        labelTaskAssignees: rees.data,
        loading: false,
      });
    }
  }; // on team-filtered data to labelChosen

  taskFilter = async taskid => {
    try {
      const getAssignee = await serverAPI.get('/task-label-assignees');
      const arr = getAssignee.data.filter(element => element.taskId === taskid);
      const brr = this.state.labels.slice().filter(element => {
        let k = 0;
        for (let i = 0; i < arr.length; i++) {
          element.id === arr[i].labelId ? k++ : '';
        }
        return k > 0;
      });
      this.setState({ labelChosen: brr });
    } catch (e) {
      const res = await serverAPI.get('/labels');
      const getAssignee = await serverAPI.get('/task-label-assignees');
      this.setState({
        labels: res.data,
        labelTaskAssignees: getAssignee.data,
        loading: false,
      });
    }
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
        const arr = await serverAPI.get('/labels');
        const brr = this.state.labelFilter.slice();
        const crr = this.state.labelChosen.slice();
        brr.push(res.data);
        crr.push(res.data);
        this.setState({
          labels: arr,
          labelFilter: brr,
          labelChosen: crr,
          labelMatch: [],
          labelSearchText: '',
          labelNew: false,
          target: res.data.id,
        });
      }
    } catch (e) {
      const res = await serverAPI.get('/labels');
      const rees = await serverAPI.get('/task-label-assignees');
      this.setState({
        labels: res.data,
        labelTaskAssignees: rees.data,
        loading: false,
      });
    }
  }; // on created label to labels

  //
  //
  //   promise.all
  // map 엮어쓰기
  assigneeCreate = async taskid => {
    try {
      const assignees = this.state.labelTaskAssignees.slice(); //all of assignees
      const chosen = this.state.labelChosen.slice();
      let filteredAssignees = [];
      let preChosenAssignees = [];

      for (let j = 0; j < assignees.length; j++) {
        if (taskid !== assignees[j].taskId) {
          filteredAssignees.push(assignees[j]); // non tasked = non pre chosen assignees
        } else {
          preChosenAssignees.push(assignees[j]); // pre-chosen assignees
        }
      }

      if (chosen.length !== 0) {
        //request of newbees
        for (let i = 0; i < chosen.length; i++) {
          const newbees = await serverAPI.post('/task-label-assignees', {
            taskId: taskid,
            labelId: chosen[i].id,
          });
          filteredAssignees.push(newbees.data); // fixed chosen assignees
        }
      }

      // request for deleting
      for (let i = 0; i < preChosenAssignees.length; i++) {
        const oldbees = await serverAPI.delete(
          `/task-label-assignees/${preChosenAssignees[i].id}`
        );
      }

      // setState
      this.setState({
        labelTaskAssignees: filteredAssignees,
        labelMatch: [],
        labelChosen: [],
        labelSearchText: '',
      });
    } catch (e) {
      const res = await serverAPI.get('/labels');
      const rees = await serverAPI.get('/task-label-assignees');
      this.setState({
        labels: res.data,
        labelTaskAssignees: rees.data,
        loading: false,
      });
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
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { LabelProvider, Consumer as LabelConsumer };
