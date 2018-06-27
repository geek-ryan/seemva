import React, { Component } from 'react';
import CardViewPC from '../components/cardview/CardViewPC';

import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectCTX';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';
import { UserProvider, UserConsumer } from '../contexts/UserCTX';
import { LabelProvider, LabelConsumer } from '../contexts/LabelCTX';
import { ActivityProvider, ActivityConsumer } from '../contexts/ActivityCTX';

class CardViewCC extends Component {
  render() {
    return (
      <React.Fragment>
        <UserProvider>
          <LabelProvider>
            <ProjectProvider>
              <TaskProvider>
                <ActivityProvider>
                  <UserConsumer>
                    {({ users, user_tasks }) => {
                      return (
                        <LabelConsumer>
                          {({ labels, label_tasks }) => {
                            return (
                              <ProjectConsumer>
                                {({ projects, handleAddProject }) => {
                                  return (
                                    <TaskConsumer>
                                      {({
                                        tasks,
                                        handleComplete,
                                        handleDeleteTask,
                                        handleAddTask,
                                      }) => {
                                        return (
                                          <ActivityConsumer>
                                            {({
                                              activities,
                                              handleAddActivity,
                                              handleDeleteActivity,
                                              handleEditActivity,
                                            }) => {
                                              return (
                                                <CardViewPC
                                                  users={users}
                                                  user_tasks={user_tasks}
                                                  labels={labels}
                                                  label_tasks={label_tasks}
                                                  projects={projects}
                                                  handleAddProject={
                                                    handleAddProject
                                                  }
                                                  tasks={tasks}
                                                  handleComplete={
                                                    handleComplete
                                                  }
                                                  handleDeleteTask={
                                                    handleDeleteTask
                                                  }
                                                  handleAddTask={handleAddTask}
                                                  activities={activities}
                                                  handleAddActivity={
                                                    handleAddActivity
                                                  }
                                                  handleDeleteActivity={
                                                    handleDeleteActivity
                                                  }
                                                  handleEditActivity={
                                                    handleEditActivity
                                                  }
                                                />
                                              );
                                            }}
                                          </ActivityConsumer>
                                        );
                                      }}
                                    </TaskConsumer>
                                  );
                                }}
                              </ProjectConsumer>
                            );
                          }}
                        </LabelConsumer>
                      );
                    }}
                  </UserConsumer>
                </ActivityProvider>
              </TaskProvider>
            </ProjectProvider>
          </LabelProvider>
        </UserProvider>
      </React.Fragment>
    );
  }
}

export default CardViewCC;
