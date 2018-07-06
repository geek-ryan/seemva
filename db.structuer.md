# JSON server - db.config.json

```json
{
  "users": [
    {
      "id": 1,
      "username": "fds",
      "email": "fds@mail.com",
      "profile":
        "https://ucarecdn.com/80280868-a954-4114-8dbc-cfcf5c9d23f5/IMG_3128.jpg"
    }
  ],
  "teams": [
    {
      "id": 1,
      "teamname": "team1"
    }
  ],
  "team-assignees": [
    {
      "id": 1,
      "userId": 1,
      "teamId": 1,
      "admin": true
    }
  ],
  "projects": [
    {
      "id": 1,
      "userId": 1,
      "teamId": 1,
      "title": "프로젝트 1"
    }
  ],
  "tasks": [
    {
      "id": 1,
      "projectId": 1,
      "title": "오늘 할 일",
      "body": "오늘 할 일 - 프로젝트 관리 서비스 만들기",
      "startDate": "2018.01.01",
      "dueDate": "2018.01.01",
      "complete": false
    }
  ],
  "task-user-assignees": [
    {
      "id": 1,
      "userId": 1,
      "taskId": 1
    }
  ],
  "task-label-assignees": [
    {
      "id": 1,
      "taskId": 1,
      "labelId": 1
    }
  ],
  "activities": [
    {
      "id": 1,
      "taskId": 1,
      "userId": 1,
      "body": "완료된 작업 별 정렬 구현중",
      "logDate": "2018.06.01 2:41:48"
    }
  ],
  "labels": [
    {
      "id": 1,
      "teamId": 1,
      "color": "red",
      "body": "label"
    }
  ]
}
```
