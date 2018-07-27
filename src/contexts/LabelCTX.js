import React, { Component } from 'react';
// import serverAPI from '../serverAPI';

const { Provider, Consumer } = React.createContext();

class LabelProvider extends Component {
  state = {
    colors: {
      default: '#bfbfbf',
      yellow: '#fadb14',
      green: '#52c41a',
      magenta: '#eb2f96',
      orange: '#fa8c16',
      cyan: '#13c2c2',
      purple: '#722ed1',
      red: '#f5222d',
      blue: '#1890ff',
    },
    loading: false,
    labels: [
      // {
      //   id: 1,
      //   teamId: 1,
      //   color: 'red',
      //   body: 'red label',
      // },
    ],
  };

  // fetchData = async teamID => {
  //   const res = await serverAPI.get(`/teams/${teamID}/labels`);
  //   this.setState({
  //     labels: res.data,
  //   });
  // };

  // async componentDidMount() {
  //   await this.fetchData(this.props.teamID);
  // }

  // async componentDidUpdate(prevProps) {
  //   if (this.props.teamID !== prevProps.teamID) {
  //     await this.fetchData(this.props.teamID);
  //   }
  // }

  render() {
    const value = {
      // ...this.state,
      // teamID: this.props.teamID,
      // fetchLabelData: async () => {
      //   await this.fetchData(this.props.teamID);
      // },
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { LabelProvider, Consumer as LabelConsumer };
