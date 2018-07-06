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
                  editfunc={this.handleEdit}
                />
                {this.props.usableDelete && (
                  <Button
                    className="project-delete-button"
                    type="danger"
                    icon="delete"
                    shape="circle"
                    size="small"
                    // 컨펌 모달 기능 넣어야 함
                    onClick={() =>
                      this.props.projectFunc.Delete(this.props.project.id)
                    }
                  />
                )}
              </React.Fragment>
            )}
          </div>
          <div className="project-card__task">
            <div className="project-card__task-list">
              {this.props.taskState.tasks.map(task => {
                return this.props.project.id === task.projectId ? (
                  <TaskCardCC {...this.props} key={task.id} task={task} />
                ) : (
                  ''
                );
              })}
            </div>
          </div>

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
        </Card>
      </React.Fragment>
    );
  }
}

export default ProjectCardUnitPC;
