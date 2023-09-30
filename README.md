# Tutorial #2 - Middleware + JWTs
This exercise builds on the APIs that we wrote in the previous Tutorial. All of the APIs here are the same, the only difference is that I've organized the code slightly, by moving the `/user` endpoints that we wrote last time into their own folder.

In this tutorial, you will delve deeper into the Express framework by leveraging middleware and JWTs to add authentication and authorization to the previously created API.

## Exercise #1 - Setting up the Login API
### Introduction:
In this exercise we are going to create a Login endpoint that a user can make a post request against to get back a JWT

### Setup:
Install the necessary npm packages: `jsonwebtoken`

### Instructions:
- Create a /login endpoint that accepts a username and password.
- Match the username and password to a user in the USER array (check out the constants file).
- If the credentials are correct, generate a JWT token with the user object and send it in the response.


## Exercise #2 - Setting up Middleware
### Introduction:
In this exercise we are going to leverage the JWT that we created in the last exercise to add some security and protection to our APIs

### Instructions
- Set up a middleware to protect your existing /user endpoints.
- This middleware should verify the JWT token in the request Authorization header
- If there is no token present in the request we should return a 401 status code
- Additionally if the token is invalid we should return a 401 status code
- Setup this middleware so that we have protection on all of our APIs except for the login API
- In this middleware attach the user object that we get from our decoded JWT to the request object
- Modify the patch `/user/:userId` in the `user.js` file so that a user can only modify their own information


## Exercise #3 - Secure your Users passwords!
### Introduction 
In this exercise we will go over a couple issues with the code that we have already written up to this point from a security standpoint and address those issues.

### Setup:
Install the necessary npm packages: `argon2`

### Instructions:
- Go to the website https://jwt.io/ and drop the encoded token. Decode it
- What issues do you see with what we have encoded?
- Let's remove the existing post `/user` in the `users.js` and instead let's create a `/register` API in the auth.js file
- This API will be a post request and we want it to take the following arguments: `name`, `age`, `username`, `password`
- The password that we store in our `users` object in constants should be encrypted using argon2.
- Update the login API to check against the hashed password

## Exercise #4 - Implement Logout Logic (If time permits)
### Introduction
Now that we have the logic to register, and login as a user the only missing piece for our user system is giving the user the ability to logout. In this exercise we'll look at how we can implement the concept of a "session" into our current JWT system.

### Setup:
Install the necessary npm packages: `uuid`

### Instructions:
- Modify the existing users in our "Users table" AKA the users array in our consts folder, and give each one the key session_uuid, and give the key a random uuid value using the `v4` function.
- When the user properly authenticates via the login API use the uuid libraries `v4` function to generate a random string and assign that to the users `session_uuid` before the user object is returned to the user in the JWT
- Update the middleware we built earlier to verify that the `session_uuid` in the JWT payload is the same as the one in the cooresponding users entry in the constants file
- Implement a `/logout` POST API. This API should grab the `user_id` from the JWT, and change the `session_uuid` to a new random UUID


