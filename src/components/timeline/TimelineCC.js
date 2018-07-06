import React, { Component } from 'react';
import moment from 'moment';
import Timeline from './Timeline';

import withProjectCTX from '../../hocs/withProjectCTX';
import withLabel from '../../hocs/withLabel';
import withActivityCTX from '../../hocs/withActivityCTX';

class TimelineCC extends Component {
  //   componentDidMount = () => {
  //     this.props.projectFunc.teamFilter(this.props.projectState.teamCurrent);
  //   };

  static defaultProps = {
    id: 2,
  };

  state = {
    date: {
      start: moment()
        .subtract(7, 'days')
        .format('YYYY.MM.DD'),
      end: moment().format('YYYY.MM.DD'),
    },
  };

  componentDidMount = () => {
    const ididid = this.props.teamCurrent;
    console.log('TimelineCC', parseInt(ididid, 10));
    this.props.projectFunc.teamFilter(ididid);
  };

  handleStart = (date, dateString) => {
    const newDate = moment(dateString).format('YYYY.MM.DD');
    const end = this.state.date.end;
    if (
      moment(newDate, 'YYYY.MM.DD').format('X') <
      moment(end, 'YYYY.MM.DD').format('X')
    ) {
      this.setState({ date: { start: newDate, end: end } });
    } else {
      alert('Wrong input');
    }
  };

  handleEnd = (date, dateString) => {
    const newDate = moment(dateString).format('YYYY.MM.DD');
    const start = this.state.date.start;

    if (
      moment(newDate, 'YYYY.MM.DD').format('X') >
      moment(start, 'YYYY.MM.DD').format('X')
    ) {
      this.setState({ date: { start: start, end: newDate } });
    } else {
      alert('Wrong input');
    }
  };

  render() {
    return (
      <Timeline
        {...this.props}
        {...this.state}
        onStart={this.handleStart}
        onEnd={this.handleEnd}
      />
    );
  }
}

export default withLabel(withProjectCTX(withActivityCTX(TimelineCC)));
