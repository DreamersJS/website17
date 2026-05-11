# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
  - [POST api/email/checkDomain](#post-apiemailcheckdomain)
  - [POST api/email/sendConfirmationEmail](#post-apiemailsendconfirmationemail)
  - [GET api/email/confirmEmail](#get-apiemailconfirmemail)
  - [GET api/email/isConfirmed](#get-apiemailisconfirmed)
  - [POST api/email/sendMsg](#post-apiemailsendmsg)

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
