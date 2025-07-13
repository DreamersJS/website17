# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
  - [GET /api/product/all](#get-apiproductall)
  - [GET api/product/:id](#get-apiproductid)
  - [POST api/product](#post-apiproduct)
  - [PUT /api/product/:id](#put-apiproductid)
  - [DELETE /api/product/:id](#delete-apiproductid)

---


## GET /api/product/all

**Description:**  
Fetch all products, including category and tags.

**Access:** Public



**Response:**

- ```json
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
            productId: 32, 
            tagId: 3,
            tag: {
                id: 3,
​​                name: "Protein"
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

- ```json
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
            productId: 32, 
            tagId: 3,
            tag: {
                id: 3,
​​                name: "Protein"
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

- ```json
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
            productId: 32, 
            tagId: 3,
            tag: {
                id: 3,
​​                name: "Protein"
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

- ```json
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
            productId: 32, 
            tagId: 3,
            tag: {
                id: 3,
​​                name: "Protein"
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

