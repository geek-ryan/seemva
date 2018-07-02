import React, { Component } from 'react';
import { LabelConsumer } from '../contexts/LabelCTX';

export default function withLabelCTX(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <LabelConsumer>
          {({ labelState, labelFunc }) => (
            <WrappedComponent
              labelState={labelState}
              labelFunc={labelFunc}
              {...this.props}
            />
          )}
        </LabelConsumer>
      );
    }
  };
}
