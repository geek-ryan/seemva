import React from 'react';
import { Form, Input, Icon, Button, Modal, Layout } from 'antd';

import SideLinePC from '../components/layout/SideLinePC';
import SidebarPC from '../components/layout/SidebarPC';
import CardViewPC from '../components/cardview/CardViewPC';
import HeaderPC from '../components/layout/HeaderPC';

import { ProjectProvider, ProjectConsumer } from '../contexts/ProjectCTX';
import { TaskProvider, TaskConsumer } from '../contexts/TaskCTX';
import { UserProvider, UserConsumer } from '../contexts/UserCTX';
import { LabelProvider } from '../contexts/LabelCTX';
import { ActivityProvider } from '../contexts/ActivityCTX';
import { TeamProvider } from '../contexts/TeamCTX';

const { Header, Footer, Sider, Content } = Layout;

function CardViewPage() {
  return (
    <React.Fragment>
      <UserProvider>
        <TeamProvider>
          <ProjectProvider>
            <LabelProvider>
              <TaskProvider>
                <ActivityProvider>
                  <Layout>
                    <Sider style={{ color: 'white' }}>
                      <SideLinePC />
                    </Sider>
                    <Layout>
                      <Sider style={{ color: 'white' }}>
                        <SidebarPC />
                      </Sider>
                      <Layout>
                        <Header style={{ heihgt: '500px', color: 'white' }}>
                          <HeaderPC
                            style={{
                              width: '100%',
                              heihgt: '100px',
                              color: 'white',
                            }}
                          />
                        </Header>
                        <Content>
                          <ProjectConsumer>
                            {({ handleAddProject }) => (
                              <CardViewPC onAdd={handleAddProject} />
                            )}
                          </ProjectConsumer>
                        </Content>
                      </Layout>
                    </Layout>
                  </Layout>
                </ActivityProvider>
              </TaskProvider>
            </LabelProvider>
          </ProjectProvider>
        </TeamProvider>
      </UserProvider>
    </React.Fragment>
  );
}

export default CardViewPage;
