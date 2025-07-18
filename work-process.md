17.12.2024
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
- I had to lower the prisma version

- db error: ERROR: foreign key constraint "User_coachId_fkey" cannot be implemented
DETAIL: Key columns "coachId" and "id" are of incompatible types: text and uuid.
- delete the old migration from the table, 
- rm prisma/migration_lock.toml
- psql -U user \c dbname DROP TABLE IF EXISTS public."_prisma_migrations";


-  id        String   @id @default(uuid()) @db.Uuid 
-  coachId   String?  @db.Uuid  
-  
-  npx prisma migrate reset
-  npx prisma generate
- npx prisma migrate dev --name fix-coach-relationship
- that fixed the err
  

  ## Working on the UI (suggestions): 

  ensure that your search functionality doesn't bypass protected routes
https://chatgpt.com/c/677067e1-b96c-800b-96b8-9097d11be5ef


Home
Engaging Introduction: A large, eye-catching image or video banner that introduces your site with a brief tagline or mission statement.

Call to Action (CTA): Include prominent CTAs such as "Get Started," "Learn More," or "Explore Our Products" to guide users towards taking the next steps.

Promotions: If you have any special offers, events, or news, this is a good place to highlight them.

About Us Section
Your Story: Briefly introduce your brand, your values, and your mission. This could be a short paragraph or a couple of sentences that highlight what sets you apart.

Testimonials/Reviews
    Social Proof: Display positive feedback from users or clients. This could include customer testimonials, reviews, or case studies that showcase how your products or services have benefited others.

Call to Action for Registration/Subscription
    Sign-Up Prompt: Encourage users to sign up for newsletters, notifications about new products, or special offers. Offer incentives like discounts for first-time subscribers.

     Search Functionality
    Search Bar: Make it easy for users to search for products, services, or other content directly from the homepage. This enhances user experience by providing quick access to what they're looking for.

    Social Media Integration
    Instagram or Social Feed: Display a dynamic feed from your social media profiles (like Instagram or Twitter) to keep your content fresh and engage users.
    Follow Buttons: Include social media follow buttons for users to easily follow you on different platforms.

    Featured Blog Posts or Articles
    Educational Content: If you have a blog or knowledge base, highlight a few recent or popular posts. For example, articles on coaching tips, product guides, or user stories.
    Interactive Content: Include polls, quizzes, or other engaging content that encourages user interaction.

Upcoming Events or Announcements
    Calendar or Events Section: If your business hosts events or webinars, showcase upcoming events or activities that users can participate in.

    Footer Section with Key Links
    Important Links: Make sure to include links to your privacy policy, terms of service, contact information, and FAQs in the footer for easy access.
    Quick Navigation: Help users navigate the website by including links to major sections such as products, testimonials, blogs, and customer support.

    Customer Support and Live Chat
    Contact Options: Make it easy for users to reach out for support with a live chat option, contact form, or email support link.
    Help Center: Offer self-service options like FAQs or guides to answer common questions.

     Interactive Features
    Personalized Recommendations: If your platform offers personalized services, products, or experiences, consider adding a feature that shows users customized content based on their browsing history or preferences.
    Real-Time Notifications: Show real-time alerts or notifications, like product availability, upcoming sales, or a countdown to a limited-time event.

Design Considerations:

    Visual Design: Use a clean, modern design that aligns with your brand’s aesthetic. Ensure it's easy to navigate and responsive on all devices.
    Accessibility: Ensure your homepage is accessible to all users, including those with disabilities (e.g., high contrast,aria labels, text alternatives for images).
    Loading Speed: Optimize images and content to ensure fast loading times.

    In short, your homepage should be a combination of engagement (through visuals, CTAs, and content) and usability (easy navigation, search, and relevant links). Prioritize what's most important for your users to know and interact with right away.

## profile page suggestions:
https://chatgpt.com/c/67707c5b-c518-800b-915f-b0419c04f0f3

Not sure which metrics to track in Diary & Profile, how to structure the view
 - purchases can be removed
 - coaching sessions is nice to have as a reminder for an arranged meeting with the coach, but maybe i should place it in Diary?
 - the table: Shall I keep, it will ppl like to write in it?
 - progress tracking for kg, size, fats, toxins, muscle mass? ppl with less result may get discouraged, ppl with great result will wanna show of?
 - Messages from Coach !!! most dangerous - one woman was feeling good but gave up after Beny pushed her for results
 - Секция popup msg "приемаш ли предизвикателството"? (маратон, състезание...  със асайд елемент и да виждаш кой е на 123 място?)
 - Still a lot of thinking to do for Diary
  
## To Do:
- Login , Register, Recoil, atom, persist login, jwt, bcrypt, auth cookie, roles: user, coach, admin. 
- Home - what to put in it?
- Profile edit
- Diary - what to put in it? 


# Registration system best practices
https://chatgpt.com/c/6778e843-afb4-800b-83fb-1ce5c4b38a96
When implementing a user registration system, there are several best practices to ensure security, usability, and maintainability. Below are guidelines and recommendations for both the frontend and backend of your registration system:

 1. ##  Frontend Best Practices
1.1. Validation on the Client Side

    Perform basic form validation to improve user experience (e.g., checking if fields are filled, password length, valid email format).
    Use regex for email validation:

const emailRegex = /^\S+@\S+\.\S+$/;

Ensure that passwords meet complexity requirements (e.g., length, special characters, numbers, uppercase).
1.2. Secure Transmission

    Always use HTTPS to encrypt communication between the client and server.
    Avoid exposing sensitive fields like passwords in logs or network inspector.

1.3. Progressive Feedback

    Show loading indicators during form submission.
    Provide clear error messages for issues like:
        Invalid email format.
        Password too weak.
        Username already taken.

1.4. Use Accessibility Standards

    Add labels to form inputs (<label> tags).
    Provide meaningful aria-* attributes for assistive technologies.

2. ## Backend Best Practices
2.1. Validate Input on the Server

    Never trust client-side validation alone; validate all inputs on the backend.
    Use libraries like Joi, zod, or class-validator for schema validation.

2.2. Hash Passwords Securely

    Hash passwords with a strong algorithm like bcrypt:

    const hashedPassword = await bcrypt.hash(password, 12);

    Use a salt to make hashes unique.

2.3. Avoid Storing Plaintext Passwords

    Never store passwords in plaintext in the database.
    Store only the hashed and salted version of the password.

2.4. Prevent Duplicate Accounts

    Ensure unique constraints on fields like email and username in your database schema.
    Check if the email or username already exists before creating a new user.

2.5. Protect Sensitive Data

    Use environment variables (e.g., process.env.JWT_SECRET) for secrets.
    Store JWT tokens in HTTP-only cookies to prevent XSS attacks.
2.6. Implement Rate Limiting

    Prevent abuse of registration endpoints by implementing rate limiting (e.g., only allow 5 requests per minute per IP).
    Use tools like express-rate-limit.

2.7. Secure API Design

    Use POST requests for registration.
    Validate the Content-Type header (ensure it's application/json).
    Avoid verbose error messages that could aid attackers (e.g., don’t reveal whether an email is already registered).

3. ## Security Enhancements
3.1. CAPTCHA

    Protect against automated bots by integrating CAPTCHA systems (e.g., Google reCAPTCHA).

3.2. Email Verification

    Require users to verify their email before activating their accounts.
    Send a one-time link with a token (e.g., via JWT or a UUID) to validate the email.

3.3. Secure Token Storage

    Use short-lived JWT tokens (e.g., 15 minutes) and refresh tokens for extended sessions.
    Store tokens in HTTP-only, Secure, SameSite cookies.

3.4. Prevent Timing Attacks

    Use a constant-time string comparison function for sensitive operations (e.g., comparing tokens).

4. ## UX Best Practices
4.1. Provide Clear Password Policies

    Inform users about password requirements (length, characters) upfront.
    Example:
        At least 8 characters.
        At least one uppercase letter, one number, and one special character.
4.2. Avoid Overloading Users

    Keep the registration form simple; only ask for necessary information upfront (e.g., username, email, password).
    Additional details like coachId can be requested later.

4.3. Handle Errors Gracefully

    Display human-readable error messages for issues like:
        "Email is already registered."
        "Password is too weak."
        "Internal server error. Please try again later."


6. ## Testing
6.1. Unit Tests

    Test input validation (e.g., empty fields, invalid email).
    Test hashing functionality.

6.2. Integration Tests

    Mock database and ensure user registration works end-to-end.
    Test behavior for duplicate emails or usernames.

6.3. Security Tests

    Test for SQL injection, XSS, and CSRF vulnerabilities.
    Use tools like OWASP ZAP or Burp Suite.

# Adding user roles 
    such as user and admin is a common requirement for managing different levels of access in an application. Here are best practices for implementing and managing user roles effectively:

1. Design the User Roles System
1.1. Define Roles Clearly

    Determine the roles needed for your application:
        Basic roles: user, admin.
        Advanced roles: moderator, editor, guest, etc.
    Clearly define the permissions associated with each role.

1.2. Use Role-Based Access Control (RBAC)

    Implement RBAC to manage permissions for different roles.
    Map roles to specific permissions:
        Example:
            user: Can view and edit their own data.
            admin: Can manage all users and system settings.

2. Backend Best Practices for Roles
2.1. Add a role Field in the User Model

    Add a role field to the user table in your database.
        Default role: user.

2.2. Set Default Role During Registration

    Assign the user role by default during registration.
    Modify your registration logic to include the role field:

2.3. Role-Based Authorization Middleware

    Create middleware to check user roles before accessing certain endpoints.

2.4. Flexible Permission Handling

For more complex systems, use a permissions table or JSON field to define granular access controls.

etc
# notes
of course I won't be implementing most of those techniques like CAPTCHA..., but is good to have an idea about best practices and implement them step by step like how I started 
with jwt, bcrypt in my first Express-SQL app, then add cookies and middleware in Whiteboard, email Confirmation in 3d Portfolio...

...here will be user roles
# Express, route handlers tip
/*
In Express, route handlers like router.post('/login', loginUser) automatically receive the following arguments:

    req (Request): Represents the HTTP request, including parameters, body, headers, etc.
    res (Response): Represents the HTTP response that will be sent back to the client.
    next (Optional): A function used to pass control to the next middleware or error handler.
*/

https://chatgpt.com/c/677a7e41-be68-800b-ab5f-4c5666d0d2a8

# checking the opponents's sites
похледнах сайтовете на конкуренцията и не ми харесаха

искам моя дайт да бъде за историите на хората като 'experience' на Худабердиева и Базин

Stories (User Journeys, Expert Advice)

на главната страница да има и Search & Filters: Allow users to search and sort by interests (e.g., "vegan diets" or "beginner workouts").

3. Engaging Visuals and Content

    Hero Banner: Include a rotating banner with:
        Action shots (sports in action).
        Close-ups of healthy foods.
        Inspiring quotes.
    Interactive Features:
        Quizzes: “Find your ideal workout” or “Best foods for your lifestyle.”
        Calculators: Calorie tracker or hydration calculator.
    Story Highlights: Feature personal stories or testimonials with clickable links to read more.

    4. Seamless UX/UI

    Mobile Optimization: Ensure the site looks and works perfectly on all devices.
    Fast Loading Times: Optimize images and implement lazy loading.
    Clear CTAs: Use calls-to-action (e.g., “Try a New Recipe” or “Explore Stories”).

    5. Personalization

    User Accounts:
        Allow users to save favorites (e.g., articles, recipes, or workouts).
        Personalized recommendations based on preferences.
    Dynamic Content:
        Show content based on seasons (e.g., “Winter Wellness Tips”).
        Tailor recommendations using analytics (e.g., “You might like this story”).

6. Focus on Wellness Products

#  Showcase Products with a Story:
        Tell how each product supports wellness or fitness goals.
        Use reviews and success stories.
    Affiliate Options: Integrate affiliate products (e.g., from Amazon or specialized brands).
    Bundling Ideas: Offer bundles like “Starter Fitness Kit” or “Mindful Eating Essentials.”

    7. Build a Community

    Forum/Blog Comments: Enable discussions under stories or posts.
    Social Media Integration:
        Shareable content with hashtags like #FuelWell or #SportStories.
        User-generated content (photos, reviews).
    Email Newsletters: Weekly updates with top posts, tips, and exclusive discounts.

    маратон - потребителя да бъде вмъкнат в занимание от самото начало

    анкета- как предпочиташ да се виждаме/включиш в програмата- онлайн/ на живо

    9. SEO & Marketing

    SEO-Optimized Content:
        Target keywords like “best post-workout meals” or “mindfulness tips for athletes.”
        Create cornerstone content like “The Ultimate Guide to Wellness in Sports.”
    Collaborations:
        Partner with influencers or bloggers in the sports and wellness niches.

        мобилна версия, която да си инсталираш на телефона (всеки има вайбър, фб)

"Success Stories" If possible, include a few video testimonials. Videos add a personal and authentic touch, and people tend to trust videos more than text-based testimonials.

events page?

Identify the metrics that you want to track. These could include:
Fitness Metrics: Weight, BMI, body fat percentage, strength levels, step count, calories burned.
Wellness Metrics: Sleep quality, stress levels, mental wellness scores.
Workout Performance: Number of reps, sets, duration, or distance.
Goals Progress: Milestones achieved, percentage of goals completed.

 ## set a goal?

 Provide personalized insights, such as trends in progress or areas to focus on.
Recommend workouts, products, water or routines based on user results.

A coach should have a dashboard to view and manage their assigned users.

# What is a Transaction in Databases?

A transaction is a sequence of one or more database operations (like INSERT, UPDATE, or DELETE) that are treated as a single, atomic unit. Transactions ensure that these operations are either fully completed or fully rolled back in case of errors, maintaining the integrity and consistency of the database.

Why Use Transactions?

Transactions are essential in scenarios where multiple operations need to succeed or fail as a group. For example:

    Transferring money between bank accounts (debit one account and credit another).
    Updating multiple related tables to maintain consistency.
    Preventing partial updates that could leave the database in an inconsistent state.

BEGIN;

-- Update the user role to 'ADMIN'
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'existing_user_email@example.com';

-- Verify the update (optional but good for critical changes)
SELECT * FROM "User" WHERE email = 'existing_user_email@example.com';

-- If everything looks good, commit the changes
COMMIT;

-- If something went wrong, you can rollback instead
-- ROLLBACK;

Real-World Use Cases for Transactions

    E-commerce:
        Deduct inventory after payment confirmation.
        Ensure that stock is not reduced if payment fails.

    Banking:
        Debit one account and credit another for a transfer.

    Batch Processing:
        Insert multiple rows, ensuring that either all rows are added or none are.

Transaction Best Practices

    Use Transactions for Critical Changes: Any operation that modifies critical data should be wrapped in a transaction.
    Keep Transactions Short: Long-running transactions can block other operations and reduce system performance.
    Test Before Commit: Validate data integrity within the transaction before committing.
# Error creating UUID, invalid length - That was caused by route /:id before /all so the controller func was searching for a id:"all"
Error fetching user: PrismaClientKnownRequestError: 
[1] Invalid `prisma.user.findUnique()` invocation:
[1] 
[1] 
[1]   Inconsistent column data: Error creating UUID, invalid length: expected one of [36, 32], found 3
[1]     at Object.request (/home/zdragon/Desktop/vite/website1/website-1712/server/node_modules/@prisma/client/runtime/index.js:45405:15)
[1]     at async PrismaClient._request (/home/zdragon/Desktop/vite/website1/website-1712/server/node_modules/@prisma/client/runtime/index.js:46301:18)
[1]     at async fetchUser (file:///home/zdragon/Desktop/vite/website1/website-1712/server/src/controllers/userController.js:127:18) {
[1]   code: 'P2023',
[1]   clientVersion: '3.14.0',
[1]   meta: {
[1]     message: 'Error creating UUID, invalid length: expected one of [36, 32], found 3'
[1]   }
[1] }
Database Integrity:

    The database is correctly handling the coachId column as nullable. There is no issue with the schema or the data in the User table at this level.

Prisma Client Issue:

    The error in your Prisma client indicates that an invalid value (e.g., an empty string "" or an unexpected input) is being interpreted as a UUID when it's not.
    The issue could arise due to one of the following:
        Prisma is receiving a value for coachId that's not NULL but invalid (e.g., "" or malformed data).
        A mismatch between your database schema and the Prisma schema.

        Using debugger Statement
        https://chatgpt.com/c/6795655f-652c-800b-8a27-d0f1d9009534

        docker for teams
        https://chatgpt.com/c/67953f25-91ac-800b-8b23-075e1ac2957e
        How to Handle Code Changes?
    You commit & push changes only to GitHub.
    A CI/CD pipeline (e.g., GitHub Actions) will automatically build and push the updated Docker image to Docker Hub whenever you update your GitHub repository.

##   unlock free video - subscribe-we value ur privacy unsubscribe at any time


# other problems
problem with adding products to db with js, evaded by doing it manualy

vite5 removed support for node 16 so i had to downgrade to vite 4

havent written any code for month and half- sick both, change of work

# TO DO:
edit profile to be finished,(change pswd)
search,
filter,
sort,
results & diary
some buttons don't have links
AdminIndex isnt used anywhere- taken care of
new diary vision- to connect it to BEnd
admin isn't mobile responsive!

# notes
29.6.2025- 6 monts break
reviewing the code: glad i have work-process.md and comments
search in homepage isnt working(I havent implemented anything for it yet)
Show loading indicators during Register,login
Provide error messages for Register,login
# useLocation hook
The useLocation hook from react-router-dom gives you access to the current location object, which includes the URL path, query string, hash, etc.

Example:

import { useLocation } from 'react-router-dom';

const location = useLocation();
console.log(location);

If the URL is:

http://localhost:3000/search?q=fitness

Then useLocation() returns:

{
  pathname: "/search",
  search: "?q=fitness",
  hash: "",
  state: null,
  key: "abc123"
}

✅ Why You Don't Need ?q=... in the Route Definition

In App.js, you defined:

<!-- <Route path="/search" element={<Layout main={<SearchPage />} />} /> -->

That handles any URL that starts with /search, including:

    /search

    /search?q=fitness

    /search?q=nutrition&sort=price

You don’t need to define query params in the route because React Router will automatically pass the full URL (including query string) to useLocation() inside the SearchPage component.
What useSearchQuery Is Doing

const useSearchQuery = () => {
  const { search } = useLocation();              // e.g., "?q=fitness"
  return new URLSearchParams(search).get('q');   // Extracts "fitness"
};

    useLocation() → returns { search: "?q=fitness", ... }

    new URLSearchParams(search) → turns it into a query parser

    .get('q') → gets the value for q 

Tip: Want to get multiple query params?

if you're adding filters like category, price, or tag, you’ll need to update both the frontend and the backend to support them.
# notes
Често се получава onhover да дава цвят на бутон и текста да не се чете!
пример Read more
 да рзаделя бутоните на 
 -action buttons -цветни с подходящ текст цвят
 -info buttons -безцветни

 join now button in home: if user is logged in - remove or exchange?

add ErrorBoundary handles FE while middleware-BE
 https://chatgpt.com/c/68615f9d-2b50-800b-8247-0e812982f2eb

showFeedback is now not local(like in chat app) but contextapi - no prop drilling

search products- local usestate, dokato search e global(bez protected routes)

products -CRUD - mysql syntax, not prisma
# tags & category
tags protein vegan organic bio nutrition Fitness Wellness Supplements Vitamins Immunity Detox Gluten-Free  Weight Loss Muscle Building Post-Workout Omega-3 Hydration Collagen Fiber Probiotics Energy Boost Sleep Support Exercise Healthy Meal Replacement 

category Nutrition Cosmetics Other

https://chatgpt.com/c/686190b4-5810-800b-b170-6b727b965987

curl -X POST http://localhost:3000/api/product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNzRlODUwZi01MzFkLTQyOGEtOTMwZS04MWY0MDQzYTQxNWQiLCJlbWFpbCI6InNreXJpbTVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUxMzY5Nzk1LCJleHAiOjE3NTEzNzMzOTV9.C0sCJX_iPo-YSjMYE4oMfhTV3O1GNG_NWCd2gMPiJLg" \
  -d '{
    "name": "Test Product",
    "description": "A sample product",
    "photo": "https://example.com/photo.jpg",
    "price": 25.99,
    "inStock": true,
    "quantity": 10,
    "categoryId": "some-valid-category-id",
    "tags": ["test", "sample"]
  }'


https://chatgpt.com/c/6863b8ae-1744-800b-a9b4-275772847dba

https://chatgpt.com/c/6863a4fb-a790-800b-a624-631355f3549d

lsof -i :3000

done dealing with Prisma's strict foreign key constraint on categoryId, and rather just make the category relation optional. 
https://chatgpt.com/c/6863de23-4908-800b-8ea8-6b50e065a966


curl -i -X POST http://localhost:5173/api/product/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmFhYmYzOC0yZWZmLTQyYTItOTNhYi02Mzg0MGE4YjdmMjkiLCJlbWFpbCI6InNreXJpbTVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUxMzgxMTQwLCJleHAiOjE3NTEzODQ3NDB9.a4F0-3Usf1ON07cbDDVGVdCuM6sjZVa9Jk7jVzQ_GGM" \
  -d '{
    "name": "Test Product",
    "description": "Test Desc",
    "price": 10.5,
    "quantity": 5,
    "inStock": true,
    "photo": "",
    "categoryName": "Supplements",
    "tagNames": ["TestTag"]
  }'

SELECT * FROM "Category";
    name     | id 
-------------+----
 Supplements |  2
 Cosmetics   |  3
 other       |  4
(3 rows)


lets remake createProduct and start wit does cateroryId or cateroryName exists

export const createProduct = async (req, res) => {
  console.log('createProduct!!!');
  const {
    name,
    description,
    photo,
    price,
    quantity,
    inStock,
    categoryId,
    categoryName,
    tagNames = []
  } = req.body;
  console.log("categoryName being passed:", categoryName);

  try {
    // 1. Find category
    const existingCategory = await prisma.category.findUnique({ where: { name: categoryName } });

console.log('Find category' );
    if (!existingCategory) {
      console.log(Category '${categoryName}' not found in DB.);
      // throw new Error(Category '${categoryName}' does not exist.);
      // return res.status(409).json({ error: 'categoryName does not exist.' });
       await prisma.category.create({
        data: {
          name: categoryName,
        },
      });
    }

    // 2. Create product
    console.log('Creating product with data:', {data});
    const product = await prisma.product.create({
      data: {
        name,
        description,
        photo,
        price,
        quantity,
        inStock,
        categoryId: existingCategory.id || null,
      },
    });

    // 3. Handle tags
    for (const tagName of tagNames) {
      // Create tag if it doesn't exist
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      // Link tag to product
      await prisma.productTag.create({
        data: {
          productId: product.id,
          tagId: tag.id,
        },
      });
    }

    return product;

  } catch (error) {
    console.erros need ed to create product rightr(" Error creating product with tags:", error.message);
    throw error;
  }
}; 
    **nowhere i'm returnin the categoory id**
https://chatgpt.com/c/6863de23-4908-800b-8ea8-6b50e065a966
 fixed by 
  // 1. Find or create category
    let category = await prisma.category.findUnique({ where: { name: categoryName } });
    if (!category) {
      console.log(`Category '${categoryName}' not found in DB. Creating it...`);
      category = await prisma.category.create({
        data: { name: categoryName },
      });
    }
    // 2. Create product
    console.log('Creating product with categoryId:', category.id);
    const product = await prisma.product.create({
      data: {
        name,
        description,
        photo,
        price,
        quantity,
        inStock,
        categoryId: category.id,}})


export const getAllProductsService = async () => {
  const res = await fetch(`/api/product/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  //ok removed console.log(res) and it worked
  if (!res.ok) throw new Error('get all products request failed');
  const data = await res.json();
  return data.results;
};

Removing console.log(res) fixed the ReadableStream locking issue — classic fetch gotcha. 
https://chatgpt.com/c/68641674-057c-800b-baea-ffac75e09035


# to do:
productsPage
pagination 
limit results per page
search local to include tags & category
filter
sort
single page view for product - **better info , *disclaimer**
**images**
**add to cart??? will i even make carts and payment?**
localSearch type multiple words : weight loss protein or vegan protein - no results found 

profile
edit 
change psw & reset psw

diary????
currently only ui
and no use

results??
no ui
no idea

admin
block user has no real meaning- not using it anywhere
add search,filter, sort products

coaches
no real data
submit choose a coach?

testimonials??
no real data
and no idea how to manage it- add by user or admin or approve by admin

home
join now button is useless after user is registered change it conditionaly
more engaging 

quick links
no about us
no contact us - like 3D portfolio? with phone number like in s. Bistriza site
no privacy policy
no terms of use
zoom telegram links
...
linkovete za produkti i [] v quick links

Header
**global search - da ima linkove koito vodqt kym dadeni produkti, statii ...**

eventualno - search, category & sort w component kato header-a za admin(product,user,...) producti postove eventi... s layout

Suggestions You Might Not Have Considered
    Add a notifications system (new product, message from coach, etc.)
    Use slug URLs for SEO (e.g., /products/protein-powder)
    Track user activity for analytics later

# Recoil hooks 
These three hooks from Recoil (useRecoilState, useRecoilValue, useSetRecoilState) give you different levels of access to Recoil state atoms/selectors in React components.

Here's a breakdown of what each one does and when you'd use them:
🔁 useRecoilState(atom)

    ✅ Read and write a Recoil atom (just like React's useState)

    Returns [value, setter]

    Use when your component needs to both display and update the state.

const [user, setUser] = useRecoilState(userState);

📖 useRecoilValue(atom)

    ✅ Read-only access to the current value of a Recoil atom or selector.

    Doesn't allow you to modify the value directly.

    Use when your component only needs to display the state (not change it).

const user = useRecoilValue(userState);

✍️ useSetRecoilState(atom)

    ✅ Write-only access to a Recoil atom or selector.

    Does not return the current value.

    Use when your component needs to update state but doesn't need to read it.

const setUser = useSetRecoilState(userState);


# notes
Your backend returns the product like this:

return res.status(200).json(product); // ✅ returns a product object
But in your frontend service:

const data = await res.json();
return data.results; // ❌ This is incorrect — there's no `results` key

https://chatgpt.com/c/686e6585-9cb0-800b-8fd8-932ea22b4787


# **Deep linking** is when a user opens a specific page or route inside your web app directly — not just the homepage. 

Instead of just going to:

https://myapp.com/

They go directly to:

https://myapp.com/products/123
 Why Is Deep Linking Important?

    ✅ Sharing: Users can send links to exact pages inside your app.

    ✅ Bookmarking: Someone can save a specific view (e.g. a product page) and return to it later.

    ✅ SEO: Search engines index those internal URLs if your app is crawlable.

    ✅ PWA Support: Even if installed as a PWA, deep links let users open the app to a specific screen.
 **Deep Linking in SPAs (Single Page Apps)**

If you use React Router, Vue Router, etc., your routes are handled in the frontend. That means you need to configure your server (Express) to support deep links:
🚨 Problem:

If someone visits:

https://myapp.com/products/123

The browser asks the server for that exact URL.

But in a Vite + React app, that route is handled in the frontend, not on the server. So unless your server is set up correctly, the user might get a 404 Not Found.

**Solution: History Fallback**

In your Express backend, add a middleware like:

import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';

const app = express();

// Fallback all unknown routes to index.html (for React/Vue Router)
app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000);
This tells Express:

    “If you don’t recognize this URL, just serve index.html and let the frontend handle it.”

https://chatgpt.com/c/68716e23-0060-800b-9314-0feb099ba13b

### Node.js Path Handling in ES Modules (Cheat Sheet)
### What Are Static Files?
Static files are files that:

    Don’t change dynamically per request (i.e. no backend logic needed)

    Are sent “as-is” to the browser

Examples:

  HTML (index.html)
  CSS
  JavaScript bundles (main.js)
  Fonts
  Images (.png, .svg)
  Favicons
  Manifest files (manifest.json)
  Service Workers (service-worker.js)


// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
}); 
you'll definitely need to change that path when deploying your app after building it with Vite. to dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

### express.static()
Without express.static(), your server wouldn’t automatically serve static files like JavaScript, CSS, images, or fonts. That means:

    You’d have to write a separate route for every file, like:

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'main.js'));
});

 No Separate Frontend Server in Production
During development, Vite’s dev server serves your frontend and handles hot reloads.
In production, you usually:

    Build your React app into static assets (vite build → dist/)

    Serve that dist/ folder via your Express server or another static file server
erving static files efficiently means:

    Fast loading (you can add caching headers, compression, CDNs)

    Proper PWA support (manifest, service worker)

    Search engines can crawl and index your site assets

What is a CDN?
CDN = Content Delivery Network
A CDN is a global network of servers that:
  Store copies of your static files (HTML, JS, CSS, images, etc.)
  Deliver them from the server closest to your users
  Greatly reduce latency and load time
  Offload bandwidth from your main server

Without a CDN:
All requests hit your origin server
Users far from your server get delays
Higher load on your server

 Security Bonus: Many CDNs (like Vercel's, Cloudflare, etc.) also provide:

  DDoS protection
  SSL (HTTPS) by default
  Origin shielding

# Service Workers part2
https://chatgpt.com/c/6871827e-3118-800b-b86c-33d95b054aef

What is const API_CACHE = 'api-cache-v1';?

This is just a string used as a key or label for a specific cache "bucket" managed by the browser — it's not a file and doesn't use the file system (like fs in Node.js).

The browser provides a Cache API that stores data in a special browser-managed storage area, which works offline, but you don’t interact with the file system directly.
So... how does the browser cache without using fs?

    The Cache Storage (used via the caches object in service workers) is part of the Service Worker API.

    It's stored in the browser's storage layer, not the OS filesystem.

    It’s sandboxed per origin (domain + protocol + port).

    This data is managed by the browser, similar to how localStorage or IndexedDB is stored.

# CORS 
https://chatgpt.com/c/68721e86-fa00-800b-b115-c6cecf2c10e1

# lsof -i :3000
# kill -9 PID

# asyncHandler
If You Switch to asyncHandler
Then you remove the try/catch from controllers,
And wrap it in your router
https://chatgpt.com/c/6872ab59-ec70-800b-be81-fbbd1b999769

# app roadmap & API Documentation
https://chatgpt.com/c/6872ab59-ec70-800b-be81-fbbd1b999769

# a roadmap to go from Junior to Mid in 6 months
https://chatgpt.com/c/6873cc04-e968-800b-9b47-83333ec0230e

Marty's
https://chatgpt.com/c/6873df55-8eb4-800b-a2c9-192279dd1eb9

# confirm email:
https://chatgpt.com/c/68750f49-85b8-800b-8dcd-165358bc31f7

# useAsync (custom hook pattern)
https://chatgpt.com/c/68750f49-85b8-800b-8dcd-165358bc31f7
This is a general-purpose hook that manages loading, error, and result state for any async function.
function useAsync(asyncFn, deps = []) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    asyncFn()
      .then((result) => isMounted && setData(result))
      .catch((e) => isMounted && setError(e))
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, deps);

  return { loading, data, error };
}
const { loading, data, error } = useAsync(() => fetchUser(id), [id]);

# React Query
A powerful async state management library for React. Handles caching, background updates, retries, stale data, etc.
npm install @tanstack/react-query

import { useQuery } from '@tanstack/react-query';

function fetchUser(id) {
  return fetch(`/api/users/${id}`).then(res => res.json());
}

const User = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user.</p>;

  return <div>{data.name}</div>;
};

# SWR
 is a lightweight React data-fetching library by Vercel (the creators of Next.js). The acronym stands for:

    SWR = Stale While Revalidate

It’s a strategy that lets you serve cached (stale) data immediately, then revalidate in the background to fetch fresh data. This results in blazing-fast UI with up-to-date content.

# Form State Handling

You're using a single product object and many onChange handlers that mutate it directly. This is fine for a small form, but consider:
 Use useReducer for product form state

It centralizes update logic:
function productReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ALL":
      return { ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
const [product, dispatch] = useReducer(productReducer, initialState);
dispatch({ type: 'SET_FIELD', field: 'name', value: 'Whey Protein' })

##	req.body 	req.query

