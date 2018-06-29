import React, { Component } from 'react';
import { Form, Input, Icon, Button, Dropdown, Menu } from 'antd';

class LabelSearchBar extends Component {
  static defaultProps = {
    handlePushLabel: () => {},
    handlePullLabel: () => {},
    handleSearchChange: () => {},
  };

  state = {
    searching: false,
  };

  componentDidMount = () => {
    this.props.handleLabelFilter(this.props.teamId);
    if (this.props.taskId) {
      console.log('task label setting goinon');
      this.props.handleLabelTaskSetting(this.props.taskId);
    }
  };

  handleSearchTextChange = e => {
    this.setState({ searching: true });
    this.props.handleSearchChange(e.target.value);
    if (!e.target.value) {
      this.setState({ searching: false });
    }
  };

  render() {
    const result = (
      <div>
        {this.props.labelMatch.map(element => (
          <Button
            onClick={this.props.handlePushLabel}
            key={element.id}
            value={element.id}
          >
            {element.body}
          </Button>
        ))}
      </div>
    );

    const newLabel = (
      <div>
        {this.props.labelMatch.map(element => (
          <Button
            onClick={this.props.handleNewLabel}
            key={this.props.labelMatch[0].id}
            value={this.props.labelMatch[0].id}
          >
            {this.props.labelMatch[0].body}
            <Icon type="plus" />
          </Button>
        ))}
      </div>
    );

    const chosenLabels = (
      <div>
        {this.props.labelChosen.map(element => {
          console.log(this.props.labelChosen);
          console.log(element);

          return (
            <Button
              onClick={this.props.handlePullLabel}
              key={element.id}
              value={element.id}
            >
              {element.body}
            </Button>
          );
        })}
      </div>
    );

    return (
      <React.Fragment>
        <div>
          {this.props.labelChosen.length
            ? chosenLabels
            : 'Please choose labels'}
        </div>
        <Input
          onChange={this.handleSearchTextChange}
          placeholder="input search text"
          value={this.props.labelSearchText}
        />
        <div>
          {this.state.searching
            ? this.props.labelNew
              ? newLabel
              : result
            : 'Loading Labels....'}
        </div>
      </React.Fragment>
    );
  }
}

export default LabelSearchBar;
