import React, { Component } from 'react';
import { Form, Input, Icon, Button, Dropdown, Menu } from 'antd';

class LabelSearchBar extends Component {
  static defaultProps = {
    matches: [],
    handlePushLabel: () => {},
    handlePullLabel: () => {},
    handleSearchChange: () => {},
    choise: [],
    searching: false,
  };

  render() {
    const result = (
      <div>
        {this.props.matches.map(element => (
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

    const chosenLabels = (
      <div>
        {this.props.choise.map(element => (
          <Button
            onClick={this.props.handlePullLabel}
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
          {this.props.choise.length ? chosenLabels : 'Please choose labels'}
        </div>
        <Input
          onChange={this.props.handleSearchChange}
          placeholder="input search text"
          value=""
        />
        <div>{this.props.searching ? result : 'Loading Labels....'}</div>
      </React.Fragment>
    );
  }
}

export default LabelSearchBar;
