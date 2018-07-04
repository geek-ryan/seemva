import React, { Component } from 'react';
import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class ActivityProvider extends Component {
  state = {
    loading: false,
    target: '',
    activities: [],
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
