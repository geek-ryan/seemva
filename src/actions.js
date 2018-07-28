const randomId = () => {
  return parseInt(Math.random() * 1000000000000000000000);
};

//----------project-----------------------

export const createProject = obj => ({
  type: 'createProject',
  id: randomId(),
  obj,
});

export const readProject = id => ({
  type: 'readProject',
  id,
});

export const updateProject = (id, obj) => ({
  type: 'updateProject',
  id,
  obj,
});

export const deleteProject = id => ({
  type: 'deleteProject',
  id,
});

export const Projects = () => ({
  type: 'Projects',
});

//----------task-------------------------

export const createTask = obj => ({
  type: 'createTask',
  id: randomId(),
  obj,
});

export const readTask = id => ({
  type: 'readTask',
  id,
});

export const updateTask = (id, obj) => ({
  type: 'updateTask',
  id,
  obj,
});

export const deleteTask = id => ({
  type: 'deleteTask',
  id,
});

export const Tasks = id => ({
  type: 'Tasks',
  id,
});

//----------activity-------------------------

export const createActivity = obj => ({
  type: 'createActivity',
  id: randomId(),
  obj,
});

export const readActivity = id => ({
  type: 'readActivity',
  id,
});

export const updateActivity = (id, obj) => ({
  type: 'updateActivity',
  id,
  obj,
});

export const deleteActivity = id => ({
  type: 'deleteActivity',
  id,
});

//----------user-------------------------

export const createUser = obj => ({
  type: 'createUser',
  id: randomId(),
  obj,
});

export const readUser = id => ({
  type: 'readUser',
  id,
});

export const updateUser = (id, obj) => ({
  type: 'updateUser',
  id,
  obj,
});

export const deleteUser = id => ({
  type: 'deleteUser',
  id,
});

//----------label-------------------------

export const createLabel = obj => ({
  type: 'createLabel',
  id: randomId(),
  obj,
});

export const readLabel = id => ({
  type: 'readLabel',
  id,
});

export const updateLabel = (id, obj) => ({
  type: 'updateLabel',
  id,
  obj,
});

export const deleteLabel = id => ({
  type: 'deleteLabel',
  id,
});

//----------current-------------------------

export const currentUser = id => ({
  type: 'currentUser',
  id,
});

export const currentTeam = id => ({
  type: 'currentTeam',
  id,
});

export const currentTask = id => ({
  type: 'currentTask',
  id,
});

export const currentViewType = typeStr => ({
  type: 'currentViewType',
  typeStr,
});

//----------labelTask-------------------------

export const createLabelTaskAssignee = obj => ({
  type: 'createLabelTaskAssignee',
  id: randomId(),
  obj,
});

export const deleteLabelTaskAssignee = id => ({
  type: 'deleteLabelTaskAssignee',
  id,
});

//----------taskUser-------------------------

export const createTaskUserAssignee = obj => ({
  type: 'createTaskUserAssignee',
  id: randomId(),
  obj,
});

export const deleteTaskUserAssignee = id => ({
  type: 'deleteTaskUserAssignee',
  id,
});

//----------teamUser-------------------------

export const createTeamUserAssignee = obj => ({
  type: 'createTeamUserAssignee',
  id: randomId(),
  obj,
});

export const deleteTeamUserAssignee = id => ({
  type: 'deleteTeamUserAssignee',
  id,
});
