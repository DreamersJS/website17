# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
- [POST /api/users/register](#post-apiusersregister)
- [POST /api/users/login](#post-apiuserslogin)
- [POST /api/users/logout](#post-apiuserslogout)
- [GET /api/users/all](#get-apiusersall)
- [GET /api/users/email/:email](#get-apiusersemailemail)
- [GET /api/users/:id](#get-apiusersid)
- [PUT /api/users/:id](#put-apiusersid)
- [DELETE /api/users/:id](#delete-apiusersid)
- [POST /api/users/refresh](#post-apiusersrefresh)

# POST /api/users/register

**Description:** 
Create new user.

**Access:** Public

**Response:**
```json
{
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "username": "Andy",
    "email": "andy@gmail.com",
    "role": "USER",
    "coachId": null,
    "createdAt": "2025-07-01T14:24:04.329Z",
    "isBlocked": false
  },
  "meta": {
    "accessToken": "jwt_token"
  }
}
```

curl

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Andy",
    "email": "andy@gmail.com",
    "password": "somePassword",
  }
```

# POST /api/users/login

**Description**
Login a user.

**Access:** Public

**Response:**
```json
{
      "message": "Login successful",
      "data": {
        "id": "uuid",
        "username": "Marty",
        "email": "marty@gmail.com",
        "role": "USER",
        "isBlocked": false,
		    "createdAt": "2025-07-01T14:24:04.329Z",
		    "coachId": null
    },
    "meta": {
        "accessToken": "jwt_token"
  }
    }
```

curl

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "marty@gmail.com",
    "password": "somePassword",
  }'
```

# POST /api/users/logout

**Description**
Logout a user.

**Access:** Public

**Response:**
```json
{ "message": "Logged out successfully" }
```

curl
```bash
curl -X POST http://localhost:3000/api/users/logout\
```

# GET /api/users/all

**Description**
Get all users. 

**Access:** Admin *apiFetch service function sends header with access token.*

**Response:**
```json
{ 
 "message": "Users fetched successfully",
 "data": [  {
[1]     id: 'ffaa4909-033e-4351-a92d-9f2027d4c567',
[1]     username: 'skyrim5a@gmail.com',
[1]     email: 'skyrim5a@gmail.com',
[1]     role: 'USER',
[1]     isBlocked: true,
[1]     createdAt: 2026-05-03T21:40:30.451Z,
[1]     coachId: null
[1]   },
[1]   {
[1]     id: '4716a667-6acc-4bdd-bd5c-1b94509af5d0',
[1]     username: 'skyrim5b@gmail.com',
[1]     email: 'skyrim5b@gmail.com',
[1]     role: 'USER',
[1]     isBlocked: true,
[1]     createdAt: 2026-05-03T21:47:04.873Z,
[1]     coachId: null
[1]   }
[1] ] 
}
```

curl
```bash
curl -X GET http://localhost:3000/api/users/all\
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
```

# GET /api/users/email/:email

**Description**
Get a user by email. 

**Access:** Private or Admin *apiFetch service function sends header with access token.*

**Response:**
```json
{"message":"User fetched successfully","data":{"id":"aaccbf38-2eff-42a2-93ab-63840a8b7f29",
"username":"skyrim5@gmail.com",
"email":"skyrim5@gmail.com",
"role":"ADMIN",
"isBlocked":false,
"createdAt":"2025-07-01T14:24:04.329Z",
"coachId":null}}
```

curl
```bash
curl -X GET "http://localhost:3000/api/users/email/skyrim5a@gmail.com" \
-H "Authorization: Bearer <your_token>"
```

# GET /api/users/:id

**Description**
Get a user by id. 

**Access:** Private or Admin *apiFetch service function sends header with access token.*

**Response:**
```json
{"message":"User fetched successfully","data":{"id":"aaccbf38-2eff-42a2-93ab-63840a8b7f29","username":"skyrim5@gmail.com","email":"skyrim5@gmail.com","role":"ADMIN","isBlocked":false,"createdAt":"2025-07-01T14:24:04.329Z","coachId":null}}
```

curl
```bash
curl -X GET "http://localhost:3000/api/users/aaccbf38-2eff-42a2-93ab-63840a8b7f29" \-H "Authorization: Bearer eyJhbGciOiJI44ttNiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmFhYmYzOC0yZWZmLTQyYTItOTNhYi02Mzg0MGE4YjdmMjkiLCJlbWFpbCI6InNreXJpbTVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaXNCbG9ja2VkIjpmYWxzZSwiaWF0IjoxNzc4NTEzMDM1LCJleHAiOjE3Nzg1MTM5MzV9.wydyfwZoefl8pYT31Ktw07eXS7A1Fqy9piR8fm1StdA"
```

# PUT /api/users/:id

**Description**
Update a user by id. 

**Access:** Private or Admin *apiFetch service function sends header with access token.*

**Response:**
```json
{"message":"User updated successfully","data":{"id":"aaccbf38-2eff-42a2-93ab-63840a8b7f29","username":"skyrim","email":"skyrim5@gmail.com","role":"ADMIN","isBlocked":false,"createdAt":"2025-07-01T14:24:04.329Z","coachId":null}}
```

curl
```bash
curl -X PUT "http://localhost:3000/api/users/aaccbf38-2eff-42a2-93ab-63840a8b7f29" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "username": "skyrim",
  }'
```

# DELETE /api/users/:id

**Description**
Delete a user by id. 

**Access:** Private or Admin *apiFetch service function sends header with access token.*

**Response:**
```json
{"message":"User deleted successfully"}
```

curl
```bash
curl -X DELETE "http://localhost:3000/api/users/143d2091-d966-4792-a185-92b1ba152939" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" 
```
# POST /api/users/refresh

**Description**
refresh a user by headers token. 

**Access:** Public *apiFetch service function sends header with access token.*

**Response:**
```json
{
      "message": "User re-fetched successfully",
      "data": {
        "id":"aaccbf38-2eff-42a2-93ab-63840a8b7f29",
        "username":"skyrim",
        "email":"skyrim5@gmail.com",
        "role":"ADMIN",
        "isBlocked":false,
        "createdAt":"2025-07-01T14:24:04.329Z",
        "coachId":null
        },
      "meta": {
        "accessToken"
      },
    }
```

curl
```bash
curl -X POST "http://localhost:3000/api/users/refresh" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" 
```