import dummy from './dummy';
import { combineReducers } from 'redux';

const projectReducer = (arr = dummy.projects, action) => {
  switch (action.type) {
    case 'createProject':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readProject':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'updateProject':
      const element = arr.filter(ele => ele.id === action.id && ele)[0];
      const updated = { ...element, ...action.obj };
      return arr.filter(ele => ele.id !== action.id && ele).concat(updated);
    case 'deleteProject':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Projects':
      return arr;
    default:
      return arr;
  }
};

const taskReducer = (arr = dummy.tasks, action) => {
  switch (action.type) {
    case 'createTask':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readTask':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'updateTask':
      const element = arr.filter(ele => ele.id === action.id && ele)[0];
      const updated = { ...element, ...action.obj };
      return arr.filter(ele => ele.id !== action.id && ele).concat(updated);
    case 'deleteTask':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Tasks':
      return arr;
    default:
      return arr;
  }
};

const activityReducer = (arr = dummy.activities, action) => {
  switch (action.type) {
    case 'createActivity':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readActivity':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'updateActivity':
      const element = arr.filter(ele => ele.id === action.id && ele)[0];
      const updated = { ...element, ...action.obj };
      return arr.filter(ele => ele.id !== action.id && ele).concat(updated);
    case 'deleteActivity':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Activities':
      return arr;
    default:
      return arr;
  }
};

const userReducer = (arr = dummy.users, action) => {
  switch (action.type) {
    case 'createUser':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readUser':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'updateUser':
      const element = arr.filter(ele => ele.id === action.id && ele)[0];
      const updated = { ...element, ...action.obj };
      return arr.filter(ele => ele.id !== action.id && ele).concat(updated);
    case 'deleteUser':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Users':
      return arr;
    default:
      return arr;
  }
};

const teamReducer = (arr = dummy.teams, action) => {
  switch (action.type) {
    case 'createTeam':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readTeam':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'updateTeam':
      const element = arr.filter(ele => ele.id === action.id && ele)[0];
      const updated = { ...element, ...action.obj };
      return arr.filter(ele => ele.id !== action.id && ele).concat(updated);
    case 'deleteTeam':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Teams':
      return arr;
    default:
      return arr;
  }
};

const labelReducer = (arr = dummy.labels, action) => {
  switch (action.type) {
    case 'createLabel':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readLabel':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'updateLabel':
      const element = arr.filter(ele => ele.id === action.id && ele)[0];
      const updated = { ...element, ...action.obj };
      return arr.filter(ele => ele.id !== action.id && ele).concat(updated);
    case 'deleteLabel':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Labels':
      return arr;
    default:
      return arr;
  }
};

const teamUserAssigneeReducer = (arr = dummy.teamUserAssignee, action) => {
  switch (action.type) {
    case 'createTeamUserAssignee':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readTeamUserAssignee':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'deleteTeamUserAssignee':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'TeamUserAssignees':
      return arr;
    default:
      return arr;
  }
};

const taskUserAssigneeReducer = (arr = dummy.taskUserAssignee, action) => {
  switch (action.type) {
    case 'createTaskUserAssignee':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readTaskUserAssignee':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'deleteTaskUserAssignee':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'TaskUserAssignees':
      return arr;
    default:
      return arr;
  }
};

const labelTaskAssigneeReducer = (arr = dummy.labelTaskAssignee, action) => {
  switch (action.type) {
    case 'createLabelTaskAssignee':
      return [
        ...arr,
        {
          ...action.obj,
          id: action.id,
        },
      ];
    case 'readLabelTaskAssignee':
      return arr.filter(ele => ele.id === action.id && ele)[0];
    case 'deleteLabelTaskAssignee':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'LabelTaskAssignees':
      return arr;
    default:
      return arr;
  }
};

const currentReducer = (current = dummy.current, action) => {
  switch (action.type) {
    case 'currentUser':
      return {
        ...current,
        userId: action.id,
      };
    case 'currentTeam':
      return {
        ...current,
        teamId: action.id,
      };
    case 'currentTask':
      return {
        ...current,
        taskId: action.id,
      };
    case 'currentViewType':
      return {
        ...current,
        viewType: action.typeStr,
      };
    default:
      return current;
  }
};

export default combineReducers({
  projectReducer,
  taskReducer,
  userReducer,
  activityReducer,
  teamReducer,
  labelReducer,
  teamUserAssigneeReducer,
  taskUserAssigneeReducer,
  labelTaskAssigneeReducer,
  currentReducer,
});
