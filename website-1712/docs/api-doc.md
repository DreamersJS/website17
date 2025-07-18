# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
  - [GET /api/product/all](#get-apiproductall)
  - [GET api/product/:id](#get-apiproductid)
  - [POST api/product](#post-apiproduct)
  - [PUT /api/product/:id](#put-apiproductid)
  - [DELETE /api/product/:id](#delete-apiproductid)
  - [POST api/email/checkDomain](#post-apiemailcheckdomain)
  - [POST api/email/sendConfirmationEmail](#post-apiemailsendconfirmationemail)
  - [GET api/email/confirmEmail](#get-apiemailconfirmemail)
  - [GET api/email/isConfirmed](#get-apiemailisconfirmed)
  - [POST api/email/sendMsg](#post-apiemailsendmsg)

---


## GET /api/product/all

**Description:**  
Fetch all products, including category and tags.

**Access:** Public

**Response:**

```json
{
  "results": [
    {
      "id": "32",
      "name": "Protein Bar",
      "description": "...",
      "category": { "id": "2", "name": "Supplements" },
      "categoryId": 2,
      "createdAt":"",
      "inStock":true,
      "photo": "...",
      "price": 58,
      "quantity": 0,
      "tags": [
        { 
            "productId": 32, 
            "tagId": 3,
            "tag": {
                "id": 3,
​​                "name": "Protein"
            }
         },
          {
          "productId": 32,
          "tagId": 30,
          "tag": {
            "id": 30,
            "name": "Low Sugar"
          }
        },
      ],
      "updatedAt":""
    }, 

  ]
}
```

curl 
```bash
http://localhost:3000/api/product/all
```

## GET api/product/:id

**Description:**  
Fetch a single product by its ID.

**Access:** Public

**Response:**

```json
{
      "id": "32",
      "name": "Protein Bar",
      "description": "...",
      "category": { "id": "2", "name": "Supplements" },
      "categoryId": 2,
      "createdAt":"",
      "inStock":true,
      "photo": "...",
      "price": 58,
      "quantity": 0,
      "tags": [
        { 
            "productId": 32, 
            "tagId": 3,
            "tag": {
                "id": 3,
​​                "name": "Protein"
            }
         }
      ],
      "updatedAt":""
    }
```

curl 
```bash
curl http://localhost:3000/api/product/1
```

## POST api/product

**Description:**  
Create a new product with category and tags.

**Access:** Admin

**Request Body:**
```json
{
  "name": "Shake",
  "description": "Supports muscle recovery",//optional
  "photo": "...",//optional
  "price": 95,
  "quantity": 0,
  "inStock": true,
  "categoryName": "Supplements",//optional
  "tagNames": ["Recovery", "Muscle"]//optional
}
```

**Response:**

 ```json
{
  "results": [
    {
      "id": "32",
      "name": "Protein Bar",
      "description": "...",
      "category": { "id": "2", "name": "Supplements" },
      "categoryId": 2,
      "createdAt":"",
      "inStock":true,
      "photo": "...",
      "price": 58,
      "quantity": 0,
      "tags": [
        { 
            "productId": 32, 
            "tagId": 3,
            "tag": {
                "id": 3,
​​                "name": "Protein"
            }
         }
      ],
      "updatedAt":""
    }, 

  ]
}
```

curl 
```bash
curl -X POST http://localhost:3000/api/product \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Shake",
    "description": "Supports muscle recovery",
    "photo": "https://img.png",
    "price": 95,
    "quantity": 4,
    "inStock": true,
    "categoryName": "Supplements",
    "tagNames": ["Recovery", "Muscle"]
  }'
```

## PUT /api/product/:id

**Description:**  
Update an existing product and its tag list.

**Access:** Admin

**Request Body:**
```json
{
  "name": "Shake",
  "description": "Supports muscle recovery",
  "photo": "...",
  "price": 95,
  "quantity": 0,
  "inStock": true,
  "categoryName": "Supplements",
  "tagNames": ["Recovery", "Muscle"]
}
```

**Response:**

 ```json
{
  "results": [
    {
      "id": "32",
      "name": "Protein Bar",
      "description": "...",
      "category": { "id": "2", "name": "Supplements" },
      "categoryId": 2,
      "createdAt":"",
      "inStock":true,
      "photo": "...",
      "price": 58,
      "quantity": 0,
      "tags": [
        { 
            "productId": 32, 
            "tagId": 3,
            "tag": {
                "id": 3,
​​                "name": "Protein"
            }
         }
      ],
      "updatedAt":""
    }, 

  ]
}
```

curl 
```bash
curl -X PUT http://localhost:3000/api/product/7 \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Shake",
    "description": "Supports muscle recovery",
    "photo": "https://img.png",
    "price": 95,
    "quantity": 4,
    "inStock": true,
    "categoryName": "Supplements",
    "tagNames": ["Recovery", "Muscle"]
  }'

```

## DELETE /api/product/:id

**Description:**  
Delete a product and unlink tags.

**Access:** Admin

**Response:**
```
{
  "results": {
    id: 44,
   name: 'wwwwwww',
   description: 'w',
   photo: '',
   price: 3,
   inStock: true,
   quantity: 1,
   categoryId: 3,
   createdAt: 2025-07-13T19:42:24.320Z,
   updatedAt: 2025-07-13T19:42:24.321Z
  }
}

```

curl
```bash
curl -X DELETE http://localhost:3000/api/product/7 \
  -H "Authorization: Bearer <your_token>"
```

---

## POST api/email/checkDomain

**Description:**  
Checks if the provided email domain is valid and known (based on MX DNS records).

**Access:** Public

**Request Body:**
```json
{
  "email": "user@gmail.com"
}
```

**Response:**
```json
{
  "valid": true
}
```
or
```json
{
  "valid": false,
  "reason": "Unknown or uncommon domain"
}
```

curl
```bash
curl -X POST http://localhost:3000/api/email/checkDomain \
  -H "Content-Type: application/json" \
  -d '{
  "email": "user@gmail.com"
}'
```


## POST api/email/sendConfirmationEmail

**Description:**  
Sends a confirmation email to the user's email with a link containing token.

**Access:** Public

**Request Body:**
```json
{
  "email": "user@gmail.com"
}
```

**Response:**
```json
{
  "message": "Confirmation email sent!"
}
```

curl
```bash
curl -X POST http://localhost:3000/api/email/sendConfirmationEmail \
  -H "Content-Type: application/json" \
  -d '{
  "email": "user@gmail.com"
}'
```

## GET api/email/confirmEmail

**Description:**  
Upon user click in confirmation email:
User is redirected to FE - ConfirmEmail.jsx
Then user is redirected to `/api/email/confirmEmail?token=${token}&email=${email}`
Where the controller:
Confirms the user’s email by req.query(Sending small bits of data in the URL) 
Check if token is tied to this email
Confirm email with redisClient.set(`confirmed:${email}`, 'true', { EX: 86400 });

**Access:** Public

**Query Parameters:**
- token: string
- email: string

**Response:**
```json
{
  "message": "Email confirmed successfully. You may now send your message.",
  "confirmed": true,
  "email": "user@example.com"
}
```

**curl:**
```bash
curl -X GET "http://localhost:3000/api/email/confirmEmail?token=abc123def456&email=user@example.com"
```

## GET api/email/isConfirmed

**Description:**  
Confirm if email(extracted by req.query) is verified in Redis and sends boolean

**Access:** Public

**Query Parameters:**
- email: string

**Response:**
```json
{
"confirmed": "true"
}
```

**curl:**
```bash
curl -X GET "http://localhost:3000/api/email/isConfirmed?email=user@example.com"
```

## POST api/email/sendMsg

**Description:** 
Send message from the contact form if email is verified

**Access:** Public

**Request Body:**
```json
{
  "name": "Name",
  "email": "user@gmail.com",
  "phone": "+1234567890",
  "message": "I would like to get in touch."
}
```

**Response:**
```json
{
 "message": "Message sent successfully!"
}
```

**curl**
```bash
curl -X POST http://localhost:3000/api/email/sendMsg \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Name",
  "email": "user@gmail.com",
  "phone": "+1234567890",
  "message": "Hey!",
}'
```

---

