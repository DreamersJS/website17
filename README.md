# Wellness website

## Description

This project involves building a full-stack wellness website. 

## Features

### Header Navigation
Responsive layout:
- Desktop: Full nav with dropdowns
- Mobile: Drawer-based navigation

User-based rendering:
  - Guest: Login / Register
  - Authenticated: Profile, Diary, Results, Logout
  - Admin: Additional admin dashboard access
  
Global Search Bar:
  - Toggles search input with redirect to search page(still working on it)

### Admin Panel

Admins can:
- View and search users
- Filter by role (admin, coach, user)
- Sort users by name or registration date
- Change user roles
- Block/unblock user accounts

### Manage Products

Admins can:
- View and search products by name and tag
- Filter by category (supplements, cosmetics)
- Sort products by name, price, newest
- Create new product
- Update product
- Delete product

### Products Page

Users can:
- View and search products by name and tag
- Filter by category (supplements, cosmetics)
- Sort products by name, price, newest
- Load more products
- Scroll-to-top

The page has Skeleton loading that improves UX.<br/>
And single product view.

### Email Confirmation Contact Form
A secure contact form featuring:

  - Email domain validation (DNS MX check)
  - Confirmation via email token (*Ethereal**/Nodemailer)
  - Redis TTL-based email verification
  - Auto-resume form after confirmation

*Ethereal is meant for testing purposes only - it doesn't send email to your real inbox, you can check the email via terminal console's link. 

## Code Architecture

**Frontend (Client)**

Built in React with:
  - State management - Recoil, ContextAPI
  - Custom hooks
  - Modular component structure
  - Shared UI (e.g. SearchToolbar)
  - UI Libraries: Material UI, Tailwind CSS
  
**Backend (Server)**

Express.js

PostgreSQL with Prisma ORM

Folder structure includes:
  - controllers, middleware, routes
  - prisma/ for schema & migrations
  - config/ for Prisma client, CORS

**Docs**
- [API Documentation](./docs/api-doc.md)
- Includes cURL examples for testing endpoints
- [Configuration Guide](./docs/CONFIGURATION_GUIDE.md)

## Creators

- Zvezda Neycheva - [@DreamersJS](https://github.com/DreamersJS)

## Technologies

- JavaScript (ES6+)
- React & Recoil
- Tailwind CSS & MUI
- Express.js
- bcrypt 
- JWT
- PostgreSQL & Prisma ORM
- Vitest
- git
- Redis
- Nodemailer + Ethereal

## Installation

To get the project running on your local machine, follow these steps:

1. Install dependencies: In the terminal, run the following command in the root, client, and server folders:
```
npm install
```

## Run the application

2. Run the Application: From the root folder, run the following command to start the app:

```
npm run dev
```
***Alternatively, you can start the client and server separately by running the same command in the client folder first, then in the server folder.***


## Known Issues


## Homepage
<img src="./client/public/readme/home.png"/>

