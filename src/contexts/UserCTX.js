import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class UserProvider extends Component {
  state = {
    loading: false,
    users: [],
    userTaskAssignees: [],
    userFilter: [],
    userMatch: [],
    userChosen: [],
    userSearchText: '',
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.get('/users');
      const rees = await serverAPI.get('/task-user-assignees');
      this.setState({
        users: res.data,
        userTaskAssignees: rees.data,
        userChosen: [],
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  teamFilter = (teamid = 1) => {
    const arr = this.state.users.slice();
    this.setState({ userFilter: arr });
  };

  taskFilter = taskid => {
    const arr = this.state.userTaskAssignees
      .slice()
      .filter(element => element.taskId === taskid)
      .map(element => element.userId);
    const brr = this.state.users.slice().filter(element => {
      let k = 0;
      for (let i = 0; i < arr.length; i++) {
        element.id === arr[i] ? k++ : '';
      }
      return k > 0;
    });
    this.setState({ userChosen: brr });
    // this.searchText(this.state.userSearchText);
  };

  pushChoise = idNum => {
    if (
      this.state.userChosen.filter(element => element.id === parseInt(idNum))
        .length
    ) {
      ('');
    } else {
      const chosenOne = this.state.userFilter.filter(
        element => element.id === parseInt(idNum)
      )[0];
      const arr = this.state.userChosen.slice();
      arr.push(chosenOne);
      this.setState({ userChosen: arr });
      // this.searchText(this.state.userSearchText);
    }
  };

  pullChoise = idNum => {
    const arr = this.state.userChosen.slice();
    const brr = arr.filter(element => element.id !== parseInt(idNum));
    this.setState({ userChosen: brr });
  };

  searchText = text => {
    const arr = this.state.userFilter.slice();
    const brr = arr.filter(element => element.username.match(text));
    // const crr = brr.filter(element => {
    //   let k = 0;
    //   for (let i = 0; i < this.state.userChosen.length; i++) {
    //     this.state.userChosen[i].id === element.id ? k++ : '';
    //   }
    //   return k === 0;
    // });
    this.setState({
      userMatch: brr,
      userSearchText: text,
    });
  };

  assigneeCreate = async taskid => {
    try {
      const assignees = this.state.userTaskAssignees.slice(); //all of assignees
      const chosen = this.state.userChosen.slice();
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
          const newbees = await serverAPI.post('/task-user-assignees', {
            taskId: taskid,
            userId: chosen[i].id,
          });
          filteredAssignees.push(newbees.data); // fixed chosen assignees
        }
      }

      // request for deleting
      for (let i = 0; i < preChosenAssignees.length; i++) {
        const oldbees = await serverAPI.delete(
          `/task-user-assignees/${preChosenAssignees[i].id}`
        );
      }

      // setState
      this.setState({
        userTaskAssignees: filteredAssignees,
        userMatch: [],
        userChosen: [],
        userSearchText: '',
      });
    } catch (e) {
      this.setState(prevState => ({
        tasks: prevState.tasks,
        loading: false,
      }));
    }
  };

  render() {
    const value = {
      userState: this.state,
      userFunc: {
        teamFilter: this.teamFilter,
        taskFilter: this.taskFilter,
        pushChoise: this.pushChoise,
        pullChoise: this.pullChoise,
        searchText: this.searchText,
        assigneeCreate: this.assigneeCreate,
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
