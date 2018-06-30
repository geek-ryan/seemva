import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class ActivityProvider extends Component {
  state = {
    loading: false,
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
    const pre = this.state.activities.slice();
    this.setState({ loading: true });
    try {
      const res = await serverAPI.post('/activities', o);
      pre.push(res.data);
      this.setState({ activities: pre, loading: false });
    } catch (e) {
      this.setState(prevState => ({
        activities: prevState.activities,
        loading: false,
      }));
    }
  };

  Delete = async id => {
    this.setState({ loading: true });
    try {
      this.setState(() => {
        const arr = this.state.activities.map(
          activity => (activity.id === id ? '' : activity)
        );
        return { activities: arr, loading: false };
      });
      const res = await serverAPI.delete(`/activities/${id}`);
    } catch (e) {
      this.setState(prevState => ({
        activities: prevState.activities,
        loading: false,
      }));
    }
  };

  Update = async (id, keyType, body) => {
    this.setState({ loading: true });
    try {
      this.setState(() => {
        let arr = this.state.activities.slice();
        const brr = arr.map(
          element =>
            element.id === parseInt(id)
              ? { ...element, [keyType]: body }
              : element
        );
        return { activities: brr, loading: false };
      });
      const res = await serverAPI.patch(`/activities/${id}`, {
        [keyType]: body,
      });
    } catch (e) {
      this.setState(prevState => ({
        activities: prevState.activities,
        loading: false,
      }));
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
