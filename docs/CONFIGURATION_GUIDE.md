# Configuration Guide for Wellness App

## Introduction

This guide provides detailed instructions for configuring the Wellness App with PostgreSQL & Prisma ORM. Follow these steps to set up your environment and configure necessary variables.

## Environment Variables

### Overview

The following environment variables need to be set up to configure the application correctly. These variables control various aspects of the app, such as server ports, database connections, and security settings.

### Variables


- **PORT**:
  - **Description**: The port on which the backend server will run.
  - **Default**: `3000`

- **NODE_ENV**:
  - **Description**: Environment type (development, production, test).
  - **Default**: `development`

- **JWT_SECRET_KEY**:
  - **Description**: Secret key for JWT token signing and verification.

- **DOMAIN**:
  - **Description**: Domain name of the backend server (e.g., https://api.yourdomain.com).

- **DATABASE_URL**:
  - **Description**: 
  PostgreSQL connection string. Created by prisma init.

- **FRONTEND_URL**:
  - **Description**:URL of the frontend app for email confirmations

- **REDIS_URL**:
  - **Description**: URL for connecting to your Redis instance.

- **ETHEREAL_USER**:
  - **Description**: Ethereal email username (for dev email testing).
  -  check: server/scripts/createEtherealAccount.js

- **ETHEREAL_PASS**:
  - **Description**:Ethereal email password.

- **ETHEREAL_PORT**:
  - **Description**: SMTP port used by Ethereal email.

- **ETHEREAL_HOST**:
  - **Description**: SMTP host for Ethereal email.


## Configuration Files

### `.env` File

 - Add the .env file to .gitignore to avoid committing sensitive information.
 - Create the .env file inside your server directory with the following content:

```js
# Server Configuration
PORT=3000
NODE_ENV=development
DOMAIN=(Set according to deployment)

# JSON Web Token secret key
JWT_SECRET_KEY=c82367c4c01fcv4cv2e02d7736

# Database Configuration
DATABASE_URL=postgresql://user:pass@host/db

FRONTEND_URL="http://localhost:5173"

# REDIS CONNECTION
REDIS_URL=redis://localhost:6379

# Ethereal Email 
ETHEREAL_USER=rbrrttrt@ethereal.email
ETHEREAL_PASS=hFahptyyyv
ETHEREAL_PORT=587
ETHEREAL_HOST=smtp.ethereal.email

```

## Setting Up PostgreSQL & Prisma

To install PostgreSQL and Prisma, first, you need to install PostgreSQL and create a database and user. Then, you'll install the Prisma client and generate it based on your schema, and finally, you can connect to your PostgreSQL database using Prisma

1. **Install PostgreSQL**:
   - Download installer: [EnterpriseDB website](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
   - Install PostgreSQL, pgAdmin, and CLI tools.
   - Verify installation:
```bash
psql --version
```

2. **Create a Database and User**:
  
```
-- Log in to PostgreSQL
psql -U postgres

-- Create user
CREATE USER your_user WITH PASSWORD 'your_password';

-- Create database
CREATE DATABASE your_database_name;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_user;
```
   
3.  **Install Prisma and Connect**
   
  [Install Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-node-postgresql
)
- Inside server directory
```bash
npm install prisma --save-dev
npx prisma init
```
- This creates a prisma/schema.prisma and .env file.
- Set the DATABASE_URL in .env.
- Run:
```
  npx prisma generate
```


 ## Common Issues and Troubleshooting

- **Issue: Database Connection Errors**:
  - **Solution**: Verify that your database credentials are correct and that the database server is accessible.

- **Issue: Missing Dependencies**:
  - **Solution**: Run `npm install` in root, client and server directories to ensure all dependencies are installed.