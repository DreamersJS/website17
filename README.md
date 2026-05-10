# E-commerce Admin System (Fullstack)

## Overview

**E-commerce Admin System** is a fullstack role-based platform designed for small businesses to manage products, users, and authentication workflows with secure email verification and scalable backend architecture.

The project focuses on modular backend design, role-based access control, Redis-powered verification flows, and scalable frontend/backend separation.

---
[Features](#features)</br>
[Tech Stack](#tech-stack)</br>
[Installation](#installation)</br>
[Documentation](#documentation)</br>
[Known Issues](#known-issues)

---

## Features

### User & Navigation System

* Responsive header navigation

  * Desktop: full navigation with dropdown menus
  * Mobile: drawer-based navigation
* Role-based UI rendering:

  * Guest: Login / Register
  * Authenticated users: Profile, results, logout
  * Admin: access to admin dashboard
* Global search bar (in progress)

  * Toggles search input and redirects to search page

---

### Admin Panel

Admins can:

* View, search, and filter users by role (admin, coach, user)
* Sort users by name or registration date
* Change user roles
* Block and unblock user accounts

---

### Product Management (Admin)

Admins can:

* View and search products by name and tag
* Filter by category (supplements, cosmetics)
* Sort products by name, price, or newest
* Create, update, and delete products

---

### Products Page (User)

Users can:

* View and search products by name and tag
* Filter by category (supplements, cosmetics)
* Sort products by name, price, or newest
* Load more products
* Use scroll-to-top functionality
* Add to cart button

Additional UX improvements:

* Skeleton loading for better perceived performance
* Dedicated single product view page

---

### Email Confirmation Contact Form

A secure contact system featuring:

* Email domain validation (DNS MX check)
* Email confirmation via token (Nodemailer with Ethereal)
* Redis TTL-based verification system
* Automatic form resume after confirmation

> Ethereal is used for testing purposes only and does not send real emails. Emails can be viewed via the provided console link in terminal.

---

### Cart
* Add, delete and modify quantities of products to cart

---

## Tech Stack

### Frontend

* React
* Recoil
* Context API
* Tailwind CSS
* Material UI

### Backend

* Express.js
* PostgreSQL
* Prisma ORM
* Redis
* JWT authentication
* bcrypt

### Testing & DevOps

* Jest
* Supertest
* Vitest
* Docker

### Email Service

* Nodemailer
* Ethereal (testing environment)

### General

* JavaScript (ES6+)
* Git

---

## Installation

### 1. Install dependencies

Run in root, client, and server folders:

```bash
npm install
```

### 2. Setup environment variables

Create a `.env` file inside both `client` and `server` directory.

See:

* [Configuration Guide](./docs/CONFIGURATION_GUIDE.md)

### 3. Start the application

From the root folder:

```bash
npm run dev
```

Alternatively, run client and server separately.

---

## Documentation

* [API Documentation](./docs/api-doc.md)

  * Includes cURL examples for testing endpoints

* [Configuration Guide](./docs/CONFIGURATION_GUIDE.md)
* [Architecture Overview](./docs/ARCHITECTURE.md)

---

## Known Issues

* Global search navigation is still in progress

---

## Screenshots

### Homepage

<img src="./client/public/readme/home.png" />

---

## Creator

* Zvezda Neycheva — [@DreamersJS](https://github.com/DreamersJS)

---
