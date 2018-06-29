import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class UserProvider extends Component {
  state = {
    users: [
      {
        id: 1,
        username: 'fds',
      },
      {
        username: 'loki',
        id: 2,
      },
      {
        username: 'jojo',
        id: 3,
      },
    ],
    userTaskAssignees: [
      {
        id: 1,
        userId: 1,
        taskId: 1,
      },
      {
        id: 2,
        userId: 1,
        taskId: 2,
      },
      {
        id: 3,
        userId: 1,
        taskId: 3,
      },
      {
        id: 4,
        userId: 2,
        taskId: 1,
      },
      {
        id: 5,
        userId: 2,
        taskId: 2,
      },
      {
        id: 6,
        userId: 3,
        taskId: 4,
      },
      {
        id: 7,
        userId: 3,
        taskId: 5,
      },
      {
        id: 8,
        userId: 2,
        taskId: 4,
      },
      {
        id: 9,
        userId: 1,
        taskId: 5,
      },
    ],
    userFilter: [],
    userMatch: [],
    userChosen: [],
    userSearchText: '',
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
  };

  pushChoise = e => {
    if (
      this.state.userChosen.filter(
        element => element.id === parseInt(e.target.value)
      ).length
    ) {
      ('');
    } else {
      const chosenOne = this.state.userFilter.filter(
        element => element.id === parseInt(e.target.value)
      )[0];
      const arr = this.state.userChosen.slice();
      arr.push(chosenOne);
      this.setState({ userChosen: arr });
    }
  };

  pullChoise = e => {
    const arr = this.state.userChosen.slice();
    const brr = arr.filter(element => element.id !== parseInt(e.target.value));
    this.setState({ userChosen: brr });
  };

  searchText = (text, teamId = 1) => {
    const arr = this.state.userFilter.slice();
    const brr = arr.filter(element => element.username.match(text));
    this.setState({
      userMatch: brr,
      userSearchText: text,
    });
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
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
