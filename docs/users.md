# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
- [POST /api/users/register](#post-apiusersregister)
- [POST /api/users/login](#post-apiuserslogin)
- [POST /api/users/logout](#post-apiuserslogout)
- [GET /api/users/all](#get-apiusersall)

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
        "coachId": null,
        "isBlocked": false
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

**Request:**
Security Header with access token centralized with apiFetch().
```json
 method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`; 
      },
      credentials: "include"
```

**Response:**
```json
{ "message": "Logged out successfully" }
```

curl
```bash
curl -X POST http://localhost:3000/api/users/logout\
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
```

# GET /api/users/all
router.get('/all', authenticateUser, verifyAdmin, fetchAllUsers);

**Description**
Get all users.

**Access:** Admin

**Request:**
Security Header with access token centralized with apiFetch().
```json
 method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`; 
      },
      credentials: "include"
```

**Response:**
```json
{ 
 "message": "Users fetched successfully",
 "data": users 
}
```

curl
```bash
curl -X GET http://localhost:3000/api/users/all\
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
```
router.get('/:id', fetchUser);
router.put('/:id/update', authenticateUser, authorizeRole('USER'), updateUser);
router.delete('/:id', authenticateUser, authorizeRole('USER'), deleteUser);
router.get('/email/:email', getUserByEmail);
router.post('/refresh', refreshAccessToken)
