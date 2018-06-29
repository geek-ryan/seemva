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
                                              return (
                                                <CardViewPC
                                                  userState={userState}
                                                  userFunc={userFunc}
                                                  labelState={labelState}
                                                  labelFunc={labelFunc}
                                                  projectState={projectState}
                                                  projectFunc={projectFunc}
                                                  taskState={taskState}
                                                  taskFunc={taskFunc}
                                                  activityState={activityState}
                                                  activityFunc={activityFunc}
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
