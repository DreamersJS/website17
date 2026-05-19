# TODO

## Zod validation
You can even validate outgoing responses:

const parsed = productSchema.array().parse(products);
res.json(parsed);

**Useful for catching backend bugs.**
---
Your frontend services:

client/src/service/

should also validate API responses.

Example:

const parsed = productsSchema.parse(data);

**This catches backend/frontend mismatches instantly.**

## Critical integration tests
## JWT refresh/session invalidation
## BE service modularity everywhere(not just user & product CQRS) & unify response
successResponse(res, data)
errorResponse(res, error)
## Finish docs?
## Small UX/security cleanup
## git tag -a 1.0.0.0 & GHCR
## *After MVP*:
## Axios interceptors
## DB backup/recovery
## CI/CD
## Rate limiting
## Logging/monitoring
## Docker compose improvements
## improve testing
E2E (few)
Integration (main)
Unit (logic only)
Factory-based testing
## Middleware pipeline design
Right now:

authenticateUser → verifyAdmin → controller

Next step is composable policy middleware:

```js
authorize({
  role: 'admin',
  ownership: true
})
```
Instead of 3 middlewares chained everywhere.
## repository pattern
Repository layer

Right now Prisma is used inside services.

Better:

service → repository → prisma

Why?
- swap DB later
- mock DB easily
- isolate ORM dependency

AFTER (clean architecture)
userRepository.getAllUsers()

and Prisma is hidden inside:

class PrismaUserRepository {
  getAllUsers() {
    return prisma.user.findMany()
  }
}

## command bus
Next evolution:

Add command handlers + query handlers:
commands/
  createProduct.handler.js
  deleteProduct.handler.js

queries/
  getProductById.handler.js

Then routes never call services directly:

await commandBus.execute(new CreateProductCommand(data))

This is how large systems stay maintainable.


other:
chatbot
AI agents

can refactor routes: users/me
error system upgrade throw new AppError("Invalid input", 400);
Token storage strategy db or redis: Redis blacklist OR DB session table not cookie


add github issue: 
Proper refresh token rotation
integration tests