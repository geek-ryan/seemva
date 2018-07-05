import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class ProjectProvider extends Component {
  static defaultProps = {
    teamID: 0,
  };

  state = {
    userID: 0,
    projects: [],
  };

  fetchData = async teamID => {
    const res = await serverAPI.get(`/teams/${teamID}/projects`);
    this.setState({
      projects: res.data,
    });
  };

  async componentDidMount() {
    await this.fetchData(this.props.teamID);
    const res = await serverAPI.get(`/me`);
    this.setState({
      userID: res.data.id,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.teamID !== prevProps.teamID) {
      await this.fetchData(this.props.teamID);
    }
  }

  // shouldComponentUpdate = () => {
  //   return true;
  // };

  teamFilter = async teamID => {
    const res = await serverAPI.get(`/projects/${teamID}`);
    let brr = res.data.filter(
      element => element.teamId === parseInt(teamID, 10)
    );
    this.setState({ projects: brr });
  };

  Create = async title => {
    const payload = {
      ...title,
      teamId: this.props.teamID,
    };
    const res = await serverAPI.post('/projects', payload);
    this.setState(prevState => ({
      projects: prevState.projects.concat(res.data),
    }));
  };

  Update = async (id, keyType, body) => {
    await serverAPI.patch(`/projects/${id}`, {
      [keyType]: body,
    });
    await this.fetchData(this.props.teamID);
  };

  Delete = async id => {
    // const res = await serverAPI.get(`/projects/${id}`);
    await serverAPI.delete(`/projects/${id}`);
    await this.fetchData(this.props.teamID);
    // 개선 예정
    // res.data.tasks.map(task async => {
    //   await
    // })
  };

  render() {
    const value = {
      projectState: {
        ...this.state,
        teamCurrent: this.props.teamCurrent,
      },
      projectFunc: {
        Create: this.Create,
        Update: this.Update,
        Delete: this.Delete,
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ProjectProvider, Consumer as ProjectConsumer };
