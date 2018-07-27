const users = [
  {
    username: 'cat',
    hashedPassword:
      '$2a$10$vjc0WgWnJnGZH.yxTUWpBO0IgfoOOXcmdHCXeGaxtJlKKiQfA4.ia',
    email: 'catseekey@mm.com',
    profile:
      'https://ucarecdn.com/de08ee59-0561-44c7-b33c-33344cc88f9a/-/resize/300x300/',
    id: 1,
  },
  {
    username: 'kkonnim',
    hashedPassword:
      '$2a$10$hsawd/eGQniysgYLQ5ebSOjZ.8zE/ie/tbVu9gXMQyzSwRGb.XTpO',
    email: 'kkonnim@seemva.com',
    profile: 'https://ucarecdn.com/50263fc2-a214-4ab4-babe-e702ae9193d5/',
    id: 2,
  },
];

const projects = [
  {
    id: 1,
    userId: 1,
    teamId: 1,
    title: 'seemva project',
    logDate: '2018.01.01',
  },
  {
    title: 'cat_1_pro_1',
    teamId: 1,
    userId: 2,
    id: 2,
    logDate: '2018.01.02',
  },
  {
    title: 'cat_1_pro_2',
    teamId: 1,
    userId: 1,
    id: 3,
    logDate: '2018.01.03',
  },
];

const tasks = [
  {
    id: 1,
    teamId: 1,
    projectId: 1,
    title: 'seemva todo',
    body: '오늘 할 일 - 프로젝트 관리 서비스 만들기',
    startDate: '2018.01.01',
    dueDate: '2018.01.01',
    logDate: '2018.01.04',
    complete: false,
  },
  {
    title: '닐리리야',
    teamId: 1,
    projectId: 2,
    complete: true,
    id: 2,
    body: '관동별곡',
    startDate: '2018.07.04',
    dueDate: '2018.08.02',
    logDate: '2018.01.05',
  },
  {
    title: '니나노',
    teamId: 1,
    projectId: 2,
    complete: false,
    id: 3,
    body: '더블 클릭',
    dueDate: '2018.08.01',
    startDate: '2018.07.04',
    logDate: '2018.01.06',
  },
  {
    title: '양꼬치엔 칭따오',
    teamId: 1,
    projectId: 3,
    complete: false,
    id: 4,
    body: '꿔바로우에도 칭따오',
    startDate: '2018.06.29',
    dueDate: '2018.07.02',
    logDate: '2018.01.07',
  },
  {
    title: '사진찍기',
    teamId: 1,
    projectId: 3,
    complete: false,
    id: 5,
    body: '고양이 찍기',
    startDate: '2018.07.03',
    dueDate: '2018.08.06',
    logDate: '2018.01.08',
  },
  {
    title: '노래 부르기',
    teamId: 1,
    projectId: 1,
    complete: true,
    id: 6,
    body: '그대 기억이',
    startDate: '2018.07.03',
    dueDate: '2018.07.06',
    logDate: '2018.01.09',
  },
];

const activities = [
  {
    id: 1,
    taskId: 1,
    userId: 1,
    teamId: 1,
    body: '완료된 작업 별 정렬 구현중',
    logDate: '2018.06.01 2:41:48',
  },
  {
    body: '앞발',
    taskId: 2,
    teamId: 1,
    logDate: '2018.07.06 4:36:13',
    userId: 2,
    id: 2,
  },
  {
    body: '뒷발',
    taskId: 3,
    teamId: 1,
    logDate: '2018.07.06 4:36:16',
    userId: 2,
    id: 3,
  },
  {
    body: '삼겹살',
    taskId: 4,
    teamId: 1,
    logDate: '2018.07.06 4:36:43',
    userId: 2,
    id: 4,
  },
  {
    body: '안창살',
    taskId: 5,
    teamId: 1,
    logDate: '2018.07.06 4:36:47',
    userId: 2,
    id: 5,
  },
];

const teams = [
  {
    id: 1,
    teamname: 'seemva',
    logDate: '2018.03.01',
  },
  {
    teamname: 'cat_1',
    id: 2,
    logDate: '2018.03.02',
  },
];

const labels = [
  {
    id: 1,
    teamId: 1,
    color: 'red',
    body: '긴급',
    logDate: '2018.02.01',
  },
  {
    teamId: 1,
    body: 'red',
    color: 'red',
    id: 2,
    logDate: '2018.02.02',
  },
  {
    teamId: 2,
    body: 'green',
    color: 'green',
    id: 3,
    logDate: '2018.02.03',
  },
  {
    teamId: 2,
    body: 'blue',
    color: 'blue',
    id: 4,
    logDate: '2018.02.04',
  },
  {
    teamId: 2,
    body: 'blue',
    color: 'blue',
    id: 5,
    logDate: '2018.02.05',
  },
];

const teamUserAssignee = [
  {
    id: 1,
    userId: 1,
    teamId: 1,
    admin: true,
  },
  {
    userId: 2,
    admin: true,
    teamId: 2,
    id: 2,
  },
  {
    userId: 1,
    admin: true,
    teamId: 2,
    id: 3,
  },
];

const taskUserAssignee = [
  {
    id: 1,
    userId: 1,
    taskId: 1,
  },
  {
    userId: 2,
    taskId: 2,
    id: 2,
  },
  {
    userId: 2,
    taskId: 3,
    id: 3,
  },
  {
    userId: 2,
    taskId: 4,
    id: 4,
  },
];

const labelTaskAssignee = [
  {
    labelId: 2,
    taskId: 2,
    id: 2,
  },
  {
    labelId: 3,
    taskId: 2,
    id: 3,
  },
  {
    labelId: 4,
    taskId: 2,
    id: 4,
  },
  {
    labelId: 2,
    taskId: 3,
    id: 5,
  },
  {
    labelId: 3,
    taskId: 4,
    id: 6,
  },
  {
    labelId: 5,
    taskId: 6,
    id: 7,
  },
];

const current = {
  teamId: 0,
  userId: 0,
  taskId: 0,
  viewType: 'card',
};

const dummy = {
  users,
  projects,
  activities,
  tasks,
  teams,
  labels,
  teamUserAssignee,
  taskUserAssignee,
  labelTaskAssignee,
  current,
};

export default dummy;
