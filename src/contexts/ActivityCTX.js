import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class ActivityProvider extends Component {
  state = {
    loading: false,
    target: '',
    activities: [
      {
        id: 1,
        taskId: 1,
        userId: 1,
        body: '완료된 작업 별 정렬 구현중',
        logDate: '2018.06.01 2:41:48',
      },
      {
        id: 2,
        taskId: 2,
        userId: 2,
        body: '완료된 작',
        logDate: '2018.06.01 2:41:48',
      },
      {
        id: 3,
        taskId: 3,
        userId: 3,
        body: '완료 구현중',
        logDate: '2018.06.01 2:41:48',
      },
      {
        id: 4,
        taskId: 4,
        userId: 1,
        body: '완료된 작 구현중',
        logDate: '2018.06.01 2:41:48',
      },
      {
        id: 5,
        taskId: 5,
        userId: 2,
        body: '완료된 작업 별 ',
        logDate: '2018.06.01 2:41:48',
      },
    ],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.get('/activities');
      this.setState({ activities: res.data, loading: false });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };

  Create = async o => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.post('/activities', o);
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: res.data.id,
      });
    } catch (e) {
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    }
  };

  Delete = async id => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.delete(`/activities/${id}`);
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    } catch (e) {
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    }
  };

  Update = async (id, keyType, body) => {
    this.setState({ loading: true });
    try {
      const res = await serverAPI.patch(`/activities/${id}`, {
        [keyType]: body,
      });
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    } catch (e) {
      const get = await serverAPI.get('/activities');
      this.setState({
        activities: get.data,
        loading: false,
        target: '',
      });
    }
  };

  render() {
    const value = {
      activityState: this.state,
      activityFunc: {
        Create: this.Create,
        Delete: this.Delete,
        Update: this.Update,
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { ActivityProvider, Consumer as ActivityConsumer };
