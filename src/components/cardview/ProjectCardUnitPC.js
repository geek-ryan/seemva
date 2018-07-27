import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';

import TaskCardCC from '../../containers/TaskCardCC';
import EditTextareaPC from '../utils/EditTextareaPC';
import LoadingIconPC from '../utils/LoadingIconPC';

import { connect } from 'react-redux';
import { updateProject } from '../../actions';

class ProjectCardUnitPC extends Component {
  static defaultProps = {
    dispatch: () => {
      console.log('dispatch');
    },
    project: { id: 0, title: 'default' },
    onProjectDelete: () => {
      console.log('default');
    },
    tasks: [],
    taskNew: { visible: 0, title: 'default' },
    newTaskTitleChange: () => {
      console.log('default');
    },
    newTaskCancle: () => console.log('default'),
    newTaskOk: () => console.log('default'),
    newTaskShowEditor: () => console.log('default'),
  };

  state = {
    loading: false,
  };

  handleEdit = (...args) => {
    // this.setState({
    //   loading: true,
    // });
    this.props.dispatch(updateProject(this.props.project.id, { ...args }));
    // this.setState({
    //   loading: false,
    // });
  };

  render() {
    return (
      <React.Fragment>
        <Card className="project-card">
          <div className="project-card__title">
            {this.state.loading ? (
              <LoadingIconPC />
            ) : (
              <React.Fragment>
                <EditTextareaPC
                  {...this.props}
                  body={this.props.project.title}
                  keyType={'title'}
                  datatype={'project'}
                  editfunc={obj =>
                    this.props.dispatch(
                      updateProject(this.props.project.id, obj)
                    )
                  }
                />
                {this.props.usableDelete && (
                  <Button
                    className="project-delete-button"
                    type="danger"
                    icon="delete"
                    shape="circle"
                    size="small"
                    // 컨펌 모달 기능 넣어야 함
                    onClick={this.props.onProjectDelete(this.props.project.id)}
                  />
                )}
              </React.Fragment>
            )}
          </div>
          <div className="project-card__task">
            <div className="project-card__task-list">
              {this.props.tasks.map(task => {
                return this.props.project.id === task.projectId ? (
                  <TaskCardCC {...this.props} key={task.id} task={task} />
                ) : (
                  ''
                );
              })}
            </div>
          </div>
          {/**/}
          {/**/}
          {/**/}
          {/**/}
          {/**/}
          {/**/}
          {/* ------------- edit project partition -------------*/}
          {this.props.taskNew.visible ? (
            <div className="new-task-editor">
              <Input.TextArea
                onChange={this.props.newTaskTitleChange}
                placeholder="Title"
                value={this.props.taskNew.title}
                row={1}
              />
              <div className="new-task-editor__button">
                <Button type="default" onClick={this.props.newTaskCancel}>
                  Cancel
                </Button>
                <Button type="primary" onClick={this.props.newTaskOk}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="new-task-card__button"
              icon="plus"
              onClick={this.props.newTaskShowEditor}
            >
              Add New Task
            </Button>
          )}
          {/* ----------- edit project partition ------------*/}
          {/**/}
          {/**/}
          {/**/}
          {/**/}
          {/**/}
          {/**/}
        </Card>
      </React.Fragment>
    );
  }
}

// const pullingTasks = state => {
//   const taskArr = state.taskReducer.slice();
//   const assigneeArr = state.taskUserAssigneeReducer.slice();
//   const filteredAssigneeArr = assigneeArr.filter(
//     el => el.userId === state.currentReducer.userId
//   );
//   const result = taskArr.filter(el => {
//     return filteredAssigneeArr.filter(ele => {
//       return el.id === ele.taskId;
//     });
//   });
//   return { tasks: result };
// };

export default connect()(ProjectCardUnitPC);
