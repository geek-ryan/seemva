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
      return arr.filter(ele => ele.id !== action.id && ele).push(updated);
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
      return arr.filter(ele => ele.id !== action.id && ele).push(updated);
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
      return arr.filter(ele => ele.id !== action.id && ele).push(updated);
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
      return arr.filter(ele => ele.id !== action.id && ele).push(updated);
    case 'deleteUser':
      return arr.filter(ele => ele.id !== action.id && ele);
    case 'Users':
      return arr;
    default:
      return arr;
  }
};

export default combineReducers({
  projectReducer,
  taskReducer,
  userReducer,
  activityReducer,
});
