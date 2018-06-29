import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class TeamProvider extends Component {
  state = {
    teams: [],
    loading: false,
    current: 0,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.userId == null || props.userId !== state.userID) {
      return {
        userID: props.userId,
        receiveError: null,
      };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.userID != null && this.state.receiveError === null) {
      await this.fetchData(this.state.userID);
    }
  }

  fetchData = async userID => {
    const id = parseInt(this.props.id);
    try {
      const res = await serverAPI.get(`/users/${userID}?_embed=team-assignees`);
      const teams = res.data.map(() => {});
      this.setState({
        teams,
        loading: true,
      });
    } finally {
      this.setState({
        loading: false,
        current: id,
      });
    }
  };

  changeCurrent = id => {
    this.setState({
      current: id,
    });
  };

  render() {
    const value = {
      ...this.state,
      initialize: this.initialize,
      changeCurrent: this.changeCurrent,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { TeamProvider, Consumer as TeamConsumer };
