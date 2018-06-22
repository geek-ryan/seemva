# JSON server - db.config.json

```json
{
  "users": [
    {
      "id": 1,
      "username": "fds"
    }
  ],
  "teams": [
    {
      "id": 1,
      "teamname": "team1"
    }
  ],
  "team_assignees": [
    {
      "id": 1,
      "userId": 1,
      "teamId": 1
    }
  ],
  "projects": [
    {
      "id": 5,
      "userId": 1,
      "teamId": 1,
      "title": "프로젝트 1",
      "subtitle": "프로젝트 서브타이틀"
    }
  ],
  "tasks": [
    {
      "id": 1,
      "projectId": 1,
      "title": "1. Firefox Flexbox not working",
      "body": "I just tested my site in Firefox",
      "startDate": "2018.01.01",
      "dueDate": "2018.01.01",
      "complete": false
    }
  ],
  "task-user_assignees": [
    {
      "id": 1,
      "userId": 1,
      "taskId": 1
    }
  ],
  "task-label_assignees": [
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
