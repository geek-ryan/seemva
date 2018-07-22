import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardViewTaskUnitCC from '../../containers/CardViewTaskUnitCC';

class ModalSwitch extends React.Component {
  render() {
    const comp = () => (
      <CardViewTaskUnitCC routerVisible={true} {...this.props} />
    );
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/card"
            component={<CardViewTaskUnitCC {...this.props} />}
          />
          <Route path={`/card/task/${this.props.task.id}`} component={comp} />;
        </Switch>
      </div>
    );
  }
}

const ModalGallery = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
);

export default ModalGallery;
