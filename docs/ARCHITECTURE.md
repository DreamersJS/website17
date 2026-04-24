# Architecture Overview

Fullstack web application for product and user management.

- Frontend: React (Client)
- Backend: Express.js (Server)
- Database: PostgreSQL (via Prisma ORM)
- Cache / TTL: Redis

## Backend Architecture

The backend uses a hybrid approach:

Products module → CQRS-inspired (commands & queries separation)
- Dependency Injection (DI)
- Command Query Responsibility Separation (CQRS-inspired)
- Centralized Error Handling

Users module → traditional service-based architecture

Other controllers → direct controller-level logic (minimal abstraction)
Example:
- Email controller


## Folder Structure(Simplified)
```
server
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── app.js
│   ├── config
│   ├── controllers 
|   │   ├── service
|   │   ├── command
|   │   └── query
│   ├── middleware
│   ├── routes
│   ├── scripts
│   ├── server.js
│   └── utils
└── __tests__
    ├── integration
    └── unit
```

*The project does not enforce a single strict architectural pattern.*

Instead, it uses:

- The right level of abstraction per feature
- Avoids overengineering