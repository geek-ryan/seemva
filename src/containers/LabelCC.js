import React, { Component } from 'react';

import { LabelConsumer } from '../contexts/LabelCTX';
import LabelPC from '../components/cardview/LabelPC';

class LabelCC extends Component {
  render() {
    return (
      <LabelConsumer>
        {value => {
          return (
            <LabelPC
              {...value}
              onInit={async () => await value.fetchAssignee(this.props.task.id)}
              onCreateLabel={id => value.createLabel(id, this.props.task.id)}
              onSelectSearchLabel={id =>
                value.selectSearchLabel(id, this.props.task.id)
              }
            />
          );
        }}
      </LabelConsumer>
    );
  }
}

export default LabelCC;
