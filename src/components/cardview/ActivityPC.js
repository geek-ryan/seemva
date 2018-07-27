import React, { Component } from 'react';
import { Form, Input, Button, List } from 'antd';

import EditTextareaPC from '../utils/EditTextareaPC';
import MemberTooltipAvatarPC from '../utils/MemberTooltipAvatarPC';
import LoadingIconPC from '../utils/LoadingIconPC';

import { connect } from 'react-redux';
import { updateActivity } from '../../actions';

const moment = require('moment');

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
    task: {
      id: 1,
    },
    handleChanges: () => console.log('default'),
    handleAddActivity: () => console.log('default'),
    handleDeleteActivity: () => console.log('default'),
  };
  render() {
    const {
      activeFormBody,
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

        {false ? (
          <LoadingIconPC />
        ) : (
          <List
            className="activity-list"
            itemLayout="horizontal"
            dataSource={this.props.activities}
            renderItem={activity => (
              <List.Item>
                <List.Item.Meta
                  // avatar={
                  //   <MemberTooltipAvatarPC
                  //     {...this.props.users.find(
                  //       el => el.id === activity.userId
                  //     )}
                  //     size="small"
                  //   />
                  // }
                  title={
                    this.props.userCurrent === activity.userId ? (
                      <EditTextareaPC
                        activity={activity}
                        body={activity.body}
                        keyType={'body'}
                        datatype={'activity'}
                        editfunc={obj =>
                          this.props.dispatch(updateActivity(activity.id, obj))
                        }
                        {...this.props}
                      />
                    ) : (
                      <div>{activity.body}</div>
                    )
                  }
                />
                <span className="log-date">
                  {moment(activity.logDate).format('YYYY.MM.DD hh:mm:ss')}
                </span>
                {this.props.userCurrent === activity.userId && (
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
