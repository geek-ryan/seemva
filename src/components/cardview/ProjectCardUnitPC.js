import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';

import TaskCardCC from '../../containers/TaskCardCC';
import EditTextareaPC from '../utils/EditTextareaPC';
import LoadingIconPC from '../utils/LoadingIconPC';

class ProjectCardUnitPC extends Component {
  state = {
    loading: false,
  };

  handleEditProjectTitle = async (...args) => {
    this.setState({
      loading: true,
    });
    await this.props.projectFunc.Update(...args);
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Card className="project-card">
          <div>
            <div>
              {this.state.loading ? (
                <LoadingIconPC />
              ) : (
                <React.Fragment>
                  <EditTextareaPC
                    body={this.props.project.title}
                    keyType={'title'}
                    datatype={'project'}
                    editfunc={this.handleEditProjectTitle}
                    {...this.props}
                  />
                  {this.props.usableDelete && (
                    <Button
                      type="danger"
                      icon="delete"
                      // 컨펌 모달 기능 넣어야 함
                      onClick={() =>
                        this.props.projectFunc.Delete(this.props.project.id)
                      }
                    />
                  )}
                </React.Fragment>
              )}
            </div>

            {this.props.taskState.tasks.map(task => {
              return (
                this.props.project.id === task.projectId && (
                  <TaskCardCC key={task.id} task={task} {...this.props} />
                )
              );
            })}
          </div>

          {this.props.taskNew.visible ? (
            <div className="new-task-editor">
              <Input.TextArea
                onChange={this.props.newTaskTitleChange}
                placeholder="Title"
                value={this.props.taskNew.title}
                row={1}
              />
              <Button onClick={this.props.newTaskCancel}>Cancel</Button>
              <Button type="primary" onClick={this.props.newTaskOk}>
                Save
              </Button>
            </div>
          ) : (
            <Button icon="plus" onClick={this.props.newTaskShowEditor}>
              Add New Task
            </Button>
          )}
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
