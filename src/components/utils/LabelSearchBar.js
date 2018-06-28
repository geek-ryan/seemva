import React, { Component } from 'react';
import { Form, Input, Icon, Button, Dropdown, Menu } from 'antd';

class LabelSearchBar extends Component {
  static defaultProps = {
    labels: [],
    lableTaskAssignees: [],
  };

  state = {
    filteredLabels: [],
    matches: [],
    searching: false,
    labelString: 'input search string',
    choise: [],
  };

  componentDidMount = () => {
    const arr = this.props.labels.map(
      label => (label.teamId === this.props.teamId ? label : '')
    );
    // console.log(arr);
    this.setState({ filteredLabels: arr });
  };

  handleSearchChange = e => {
    if (e.target.value) {
      this.setState({ searching: true });
      const arr = this.state.filteredLabels.slice();
      const brr = arr.filter(element => element.body.match(e.target.value));
      this.setState({ matches: brr });
    } else {
      this.setState({ searching: false });
    }
  };

  handlePushLabel = e => {
    if (
      this.state.choise.filter(
        element => element.id === parseInt(e.target.value)
      ).length
    ) {
      ('');
    } else {
      const chosenOne = this.state.filteredLabels.filter(
        element => element.id === parseInt(e.target.value)
      )[0];
      const arr = this.state.choise.slice();
      arr.push(chosenOne);
      this.setState({ choise: arr });
    }
  };

  handlePullLabel = e => {
    console.log('get in');
    const arr = this.state.choise.slice();
    console.log(arr, e.target.value);
    const brr = arr.filter(element => element.id !== parseInt(e.target.value));
    console.log(brr);
    this.setState({ choise: brr });
  };

  render() {
    const result = (
      <div>
        {this.state.matches.map(element => (
          <Button
            onClick={this.handlePushLabel}
            key={element.id}
            value={element.id}
          >
            {element.body}
          </Button>
        ))}
      </div>
    );

    const chosenLabels = (
      <div>
        {this.state.choise.map(element => (
          <Button
            onClick={this.handlePullLabel}
            key={element.id}
            value={element.id}
          >
            {element.body}
          </Button>
        ))}
      </div>
    );

    return (
      <React.Fragment>
        <div>
          {this.state.choise.length ? chosenLabels : 'Please choose labels'}
        </div>
        <Input
          onChange={this.handleSearchChange}
          placeholder="input search text"
        />
        <div>{this.state.searching ? result : 'Loading Labels....'}</div>
      </React.Fragment>
    );
  }
}

export default LabelSearchBar;
