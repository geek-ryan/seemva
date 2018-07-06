import React, { Component } from 'react';
import { Form, Input, Button, List } from 'antd';

import EditTextareaPC from '../utils/EditTextareaPC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';
import LoadingIconPC from '../utils/LoadingIconPC';

class ActivityPC extends Component {
  static defaultProps = {
    members: [
      // {
      //   username: 'syami',
      //   email: 'syami@seemva.com',
      //   profile:
      //     'https://ucarecdn.com/b8800d01-4651-4b77-8ca8-de58bb78f196/syami.jpg',
      //   id: 1,
      // },
    ],
    userID: 0,
    activityState: {
      loading: false,
      activities: [
        // {
        //   id: 1,
        //   taskId: 1,
        //   userId: 1,
        //   body: '완료된 작업 별 정렬 구현중',
        //   logDate: '2018.06.01 2:41:48',
        // },
      ],
    },
    activityFunc: {
      Update: () => {},
    },
    task: {
      id: 1,
    },
    handleChanges: () => {},
    handleAddActivity: () => {},
    handleDeleteActivity: () => {},
  };
  render() {
    const {
      activeFormBody,
      activityState,
      activityFunc,
      task,
      handleChange,
      handleAddActivity,
      handleDeleteActivity,
    } = this.props;
    return (
      <div className="activity-content">
        <Form>
          <Form.Item>
            <Input
              placeholder="write comment..."
              value={activeFormBody}
              onChange={handleChange}
            />
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              onClick={handleAddActivity}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {activityState.loading ? (
          <LoadingIconPC />
        ) : (
          <List
            className="activity-list"
            itemLayout="horizontal"
            dataSource={activityState.activities.filter(
              activity => activity.taskId === task.id
            )}
            renderItem={activity => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <MemberTooltipAvatarPC
                      {...this.props.teamMembers.find(
                        ({ id }) => id === activity.userId
                      )}
                      size="small"
                    />
                  }
                  title={
                    activityState.me === activity.userId ? (
                      <EditTextareaPC
                        activity={activity}
                        body={activity.body}
                        keyType={'body'}
                        datatype={'activity'}
                        editfunc={activityFunc.Update}
                        {...this.props}
                      />
                    ) : (
                      <div>{activity.body}</div>
                    )
                  }
                />
                <span className="log-date">{activity.logDate}</span>
                {activityState.me === activity.userId && (
                  <Button
                    className="activity-delete-button"
                    type="danger"
                    size="small"
                    shape="circle"
                    value={activity.id}
                    onClick={handleDeleteActivity}
                    icon="delete"
                  />
                )}
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default ActivityPC;
