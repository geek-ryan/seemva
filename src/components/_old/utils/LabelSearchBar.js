import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';

import LoadingIconPC from '../utils/LoadingIconPC';

class LabelSearchBar extends Component {
  state = {
    searching: false,
  };

  componentDidMount = () => {
    this.props.labelFunc.teamFilter(this.props.project.teamId);
    if (this.props.taskId > 0) {
      this.props.labelFunc.taskFilter(this.props.taskId);
    }
  };

  shouldComponentUpdate = () => {
    return true;
  };

  handleSearchTextChange = e => {
    this.setState({ searching: true });
    this.props.labelFunc.searchText(e.target.value);
    if (!e.target.value) {
      this.setState({ searching: false });
    }
  };

  render() {
    if (this.props.labelState.loading) {
      return <LoadingIconPC />;
    } else {
      const result = (
        <div>
          {this.props.labelState.labelMatch.map(element => (
            <Button
              onClick={this.props.labelFunc.pushChoise}
              key={element.id}
              value={element.id}
            >
              {element.body}
            </Button>
          ))}
        </div>
      );

      const newLabel = this.props.labelState.labelMatch[0] ? (
        <Button
          onClick={this.props.labelFunc.Create}
          key={this.props.labelState.labelMatch[0].id}
          value={this.props.labelState.labelMatch[0].id}
        >
          {this.props.labelState.labelMatch[0].body}
          <Icon type="plus" />
        </Button>
      ) : (
        ''
      );

      const chosenLabels = (
        <div>
          {this.props.labelState.labelChosen.map(element => {
            return (
              <Button
                onClick={this.props.labelFunc.pullChoise}
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
            {this.props.labelState.labelChosen.length
              ? chosenLabels
              : 'Please choose labels'}
          </div>
          <Input
            onChange={this.handleSearchTextChange}
            placeholder="input search text"
            value={this.props.labelState.labelSearchText}
          />
          <div>
            {this.state.searching
              ? this.props.labelState.labelNew
                ? newLabel
                : result
              : 'Loading Labels....'}
          </div>
        </React.Fragment>
      );
    }
  }
}

export default LabelSearchBar;
