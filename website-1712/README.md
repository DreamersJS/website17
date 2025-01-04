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

of course I won't be implementing most of those techniques like CAPTCHA..., but is good to have an idea about best practices and implement them step by step like how I started 
with jwt, bcrypt in my first Express-SQL app, then add cookies and middleware in Whiteboard, email Confirmation in 3d Portfolio...

...here will be user roles

/*
In Express, route handlers like router.post('/login', loginUser) automatically receive the following arguments:

    req (Request): Represents the HTTP request, including parameters, body, headers, etc.
    res (Response): Represents the HTTP response that will be sent back to the client.
    next (Optional): A function used to pass control to the next middleware or error handler.
*/