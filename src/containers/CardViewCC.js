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
                          {({
                            labels,
                            labelTaskAssignees,
                            labelFilter,
                            labelMatch,
                            labelChosen,
                            labelSearchText,
                            labelNew,
                            handleCombineLabelTask,
                            handleLabelFilter,
                            handlePullLabel,
                            handlePushLabel,
                            handleSearchChange,
                            handleLabelTaskSetting,
                            handleNewLabel,
                          }) => {
                            return (
                              <ProjectConsumer>
                                {({
                                  projects,
                                  handleAddProject,
                                  handleEditProject,
                                }) => {
                                  return (
                                    <TaskConsumer>
                                      {({
                                        tasks,
                                        handleComplete,
                                        handleDeleteTask,
                                        handleAddTask,
                                        handleEditTask,
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
                                                  labelTaskAssignees={
                                                    labelTaskAssignees
                                                  }
                                                  handleCombineLabelTask={
                                                    handleCombineLabelTask
                                                  }
                                                  labelFilter={labelFilter}
                                                  labelMatch={labelMatch}
                                                  labelChosen={labelChosen}
                                                  labelSearchText={
                                                    labelSearchText
                                                  }
                                                  handleLabelFilter={
                                                    handleLabelFilter
                                                  }
                                                  handlePullLabel={
                                                    handlePullLabel
                                                  }
                                                  handlePushLabel={
                                                    handlePushLabel
                                                  }
                                                  handleSearchChange={
                                                    handleSearchChange
                                                  }
                                                  handleLabelTaskSetting={
                                                    handleLabelTaskSetting
                                                  }
                                                  projects={projects}
                                                  handleAddProject={
                                                    handleAddProject
                                                  }
                                                  handleEditProject={
                                                    handleEditProject
                                                  }
                                                  tasks={tasks}
                                                  handleComplete={
                                                    handleComplete
                                                  }
                                                  handleDeleteTask={
                                                    handleDeleteTask
                                                  }
                                                  handleAddTask={handleAddTask}
                                                  handleEditTask={
                                                    handleEditTask
                                                  }
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
                                                  handleNewLabel={
                                                    handleNewLabel
                                                  }
                                                  labelNew={labelNew}
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
