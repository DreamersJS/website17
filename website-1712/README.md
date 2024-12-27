- create an optional root-level package.json that simplifies running both the frontend (React) and backend (Express) together.
- use a tool like concurrently to run both the frontend and backend development servers simultaneously with a single command.
- npm install
```
npm install concurrently --save-dev
```
- in root-level package.json

 ```
 "scripts": {
    "dev": "concurrently \"npm run dev --prefix client\" \"npm run start --prefix server\"",
    "build": "npm run build --prefix client",
    "start": "npm run start --prefix server"
  },
```
- add nodemon, which watches for file changes and automatically restarts the server. 
-  add a dev script that uses nodemon to start your Express server in development mode (with auto-reloading).
  ```
   "dev": "nodemon src/server.js"  
  ```

- change root-level package.json

 ```
 "scripts": {
    "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\"",
    "build": "npm run build --prefix client",
    "start": "npm run start --prefix server"
  },
```
- vite proxy
- # cors config ( i noticed in my chat app i don't import & use cors) !!!
- since I know from my last project that at some point I will need foreign key and cascade delete: I checked that with Prisma ORM is easy to implement it in the schema and migrating is easy(easier than Knex, less code than SQL lang, and for now I won't need difficult queries). 
- why i choose PostgreSQL over MySQL(which I used in one of my previous apps):
- I just love learning new stuff and this time I intend to deploy the app based on my research I can FREE & easy deploy PostgreSQL with Heroku.
- db error: ERROR: foreign key constraint "User_coachId_fkey" cannot be implemented
DETAIL: Key columns "coachId" and "id" are of incompatible types: text and uuid.