import React, { Component } from 'react';
import { Form, Input, Icon, Button, Dropdown, Menu } from 'antd';

class HearderSearchBar extends Component {
  static defaultProps = {
    handlePushLabel: () => {},
    handlePullLabel: () => {},
    handleSearchChange: () => {},
  };

  state = {
    searching: false,
  };

  componentDidMount = () => {
    this.props.userFunc.teamFilter();
    if (this.props.taskId) {
      this.props.userFunc.taskFilter(this.props.taskId);
    }
  };

  handleSearchTextChange = e => {
    this.setState({ searching: true });
    this.props.userFunc.searchText(e.target.value);
    if (!e.target.value) {
      this.setState({ searching: false });
    }
  };

  render() {
    const result = (
      <div>
        {this.props.userState.userMatch.map(element => (
          <Button
            onClick={this.props.userFunc.pushChoise}
            key={element.id}
            value={element.id}
          >
            {element.username}
          </Button>
        ))}
      </div>
    );

    const chosenLabels = (
      <div>
        {this.props.userState.userChosen.map(element => {
          return (
            <Button
              onClick={this.props.userFunc.pullChoise}
              key={element.id}
              value={element.id}
            >
              {element.username}
            </Button>
          );
        })}
      </div>
    );

    return (
      <React.Fragment>
        <div>
          {this.props.userState.userChosen.length
            ? chosenLabels
            : 'Please choose user'}
        </div>
        <Input
          onChange={this.handleSearchTextChange}
          placeholder="input search text"
          value={this.props.userState.userSearchText}
        />
        <div>{this.state.searching ? result : 'Loading users....'}</div>
      </React.Fragment>
    );
  }
}

export default HearderSearchBar;
