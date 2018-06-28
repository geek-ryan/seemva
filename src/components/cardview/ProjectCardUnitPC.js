import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal, Card, DatePicker } from 'antd';

import CardViewTaskUnitPC from './CardViewTaskUnitPC';
import EditableTextareaPC from '../utils/EditableTextareaPC';
import LabelSearchBar from '../utils/LabelSearchBar';

import '../../../node_modules/antd/dist/antd.css';

var moment = require('moment');

class ProjectCardUnitPC extends Component {
  static defaultProps = {
    project: {},
    tasks: [],
    date: [],
    labelTaskAssignees: [],
    labels: [],
    teamId: 1,
    handleAddProject: () => {},
    handleCombineLabelTask: () => {},
    handleEditProject: () => {},
  };

  state = {
    visible: false,
    title: '',
    body: '',
    startDate: moment().format('YYYY-MM-DD'),
    dueDate: moment().format('YYYY-MM-DD'),
    filteredLabels: [],
    matches: [],
    searching: false,
    labelString: '',
    choise: [],
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeBody = e => {
    this.setState({ body: e.target.value });
  };

  handleDateChange = (date, dateString) => {
    const startMoment = moment(dateString[0], 'YYYY-MM-DD');
    const dueMoment = moment(dateString[1], 'YYYY-MM-DD');
    if (startMoment > dueMoment) {
      alert('Please check date again');
    } else {
      this.setState({ startDate: dateString[0], dueDate: dateString[1] });
    }
  };

  // modal ----------------------
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    //find task+  assign+ number
    const arr = this.props.tasks.slice();
    const num = arr.sort((a, b) => b.id - a.id)[0].id + 1;
    const array = this.props.labelTaskAssignees.slice();
    const numLabel = arr.sort((a, b) => b.id - a.id)[0].id + 1;
    //made task content
    const obj = {
      title: this.state.title,
      body: this.state.body,
      startDate: this.state.startDate,
      dueDate: this.state.dueDate,
      projectId: this.props.project.id,
      complete: false,
    };
    //made label content
    let assignArr = [];
    for (let i = 0; i < this.state.choise.length; i++) {
      const objLabel = {
        taskId: num,
        id: numLabel + i,
        labelId: this.state.choise[i].id,
      };
      assignArr.push(objLabel);
    }
    //Add labelAssign and task
    this.props.handleAddTask(obj);
    this.props.handleCombineLabelTask(assignArr);
    this.setState({
      visible: false,
      title: '',
      body: '',
      matches: [],
      searching: false,
      labelString: '',
      choise: [],
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  //--Label search func-----

  componentDidMount = () => {
    const arr = this.props.labels.map(
      label => (label.teamId === this.props.teamId ? label : '')
    );
    // console.log(arr);
    this.setState({ filteredLabels: arr });
  };

  handleSearchChange = e => {
    if (e.target.value) {
      this.setState({ searching: true, labelString: e.target.value });
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
    return (
      <React.Fragment>
        <Card style={{ width: 400 }}>
          <EditableTextareaPC
            body={this.props.project.title}
            keyType={'title'}
            datatype={'project'}
            editfunc={this.props.handleEditProject}
            {...this.props}
          />
          {this.props.tasks.map(task => {
            return this.props.project.id === task.projectId ? (
              <CardViewTaskUnitPC key={task.id} task={task} {...this.props} />
            ) : (
              ''
            );
          })}

          <div onClick={this.showModal}>
            <Icon type="plus" /> Add New Task
          </div>

          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input
              onChange={this.handleChangeTitle}
              placeholder="Title"
              value={this.state.title}
            />
            <Input.TextArea
              onChange={this.handleChangeBody}
              placeholder="Body"
              value={this.state.body}
              row={4}
            />
            <DatePicker.RangePicker
              onChange={this.handleDateChange}
              value={[moment(), moment()]}
            />
            <LabelSearchBar
              handleSearchChange={this.handleSearchChange}
              handlePullLabel={this.handlePullLabel}
              handlePushLabel={this.handlePushLabel}
              filteredLabels={this.state.filteredLabels}
              matches={this.state.matches}
              searching={this.state.searching}
              labelString={this.state.labelString}
              choise={this.state.choise}
              {...this.props}
            />
          </Modal>
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
