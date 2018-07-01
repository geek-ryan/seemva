import React, { Component } from 'react';

import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectCTX';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';
import { UserProvider, UserConsumer } from '../contexts/UserCTX';
import { LabelProvider, LabelConsumer } from '../contexts/LabelCTX';
import { ActivityProvider, ActivityConsumer } from '../contexts/ActivityCTX';

import ProgressBarPC from '../components//utils/ProgressBarPC';

export default function withProgressBar(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <React.Fragment>
          <UserProvider>
            <LabelProvider>
              <ProjectProvider>
                <TaskProvider>
                  <ActivityProvider>
                    <UserConsumer>
                      {({ userState, userFunc }) => {
                        return (
                          <LabelConsumer>
                            {({ labelState, labelFunc }) => {
                              return (
                                <ProjectConsumer>
                                  {({ projectState, projectFunc }) => {
                                    return (
                                      <TaskConsumer>
                                        {({ taskState, taskFunc }) => {
                                          return (
                                            <ActivityConsumer>
                                              {({
                                                activityState,
                                                activityFunc,
                                              }) => {
                                                if (
                                                  userState.loading ||
                                                  projectState.loading ||
                                                  taskState.loading ||
                                                  activityState.loading ||
                                                  labelState.loading
                                                ) {
                                                  return (
                                                    <ProgressBarPC
                                                      userState={userState}
                                                      userFunc={userFunc}
                                                      labelState={labelState}
                                                      labelFunc={labelFunc}
                                                      projectState={
                                                        projectState
                                                      }
                                                      projectFunc={projectFunc}
                                                      taskState={taskState}
                                                      taskFunc={taskFunc}
                                                      activityState={
                                                        activityState
                                                      }
                                                      activityFunc={
                                                        activityFunc
                                                      }
                                                      {...this.props}
                                                    />
                                                  );
                                                } else {
                                                  return (
                                                    <WrappedComponent
                                                      userState={userState}
                                                      userFunc={userFunc}
                                                      labelState={labelState}
                                                      labelFunc={labelFunc}
                                                      projectState={
                                                        projectState
                                                      }
                                                      projectFunc={projectFunc}
                                                      taskState={taskState}
                                                      taskFunc={taskFunc}
                                                      activityState={
                                                        activityState
                                                      }
                                                      activityFunc={
                                                        activityFunc
                                                      }
                                                      {...this.props}
                                                    />
                                                  );
                                                }
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
  };
}
