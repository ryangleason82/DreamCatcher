# DreamCatcher
## Connect with the dreamer community
Understand why you are the way you are by connecting with others. 
 - Post your dreams
 - Read other peoples dreams 
 - Understand the psychology of what your dreams mean
 - Connect with your dreamer community, talk with experts 
 - Integrate with Fitbit. Put a name to a face by matching the amount of REM sleep you accumulated with how wild your dream was

 This is a purely educational project. Below are some of the things I learned and things I don't want to forget

### To run: npm run dev (uses concurrently library to simultaneously run two commands. See package.json)
    - Runs backend server at localhost:5000
    - Runs frontend server at localhost:3000  

### Tools used:
    - Mongo Atlas: DB
    - Mongoose: object data modeling library for mongodb and nodeJS
    - Express: server framework for NodeJS
    - Postman: API development environment simulate client 
    - bcrypt: encrypt passwords 
        - npm i bcrypt
    - JSON Web Token (JWT): access protected routes with tokens
    - JWT Decode: Allows you to extract user from token
        - npm i jwt-decode
    - Passport: works with authorization. Allows users to "travel" to different API routes based on permission
        - npm i passport
    - React: front end framework
    - Nodejs: backend server
    - Concurrently: gives you ability to run two commands at once on terminal. Run client server and backend server. Not necessary to open two terminals
        - npm i concurrently
    - Axios: HTTP client to communicate with backend. Counterpart is 'fetch'
        - npm i axios
    - classnames: allows us to use conditional classnames, eg for error checking
        - npm i classnames
    - Redux: state manager, when you need to share data between components
        - npm i redux react-redux redux-thunk
    - Moment: a date formatter
        - npm i moment
        - npm i react-moment

### How Authentication Works:
    - Create encrypted password by combining salt and password to create hash
    - Hash is stored in db
    - Compare using bcrypt the given password and db password

### How Authorization Works:
    - If authenticated, create payload comprised of whatever you want to pass as a part of the token, eg. id, name, avatar. Used as header
    - Token is then created with jwt.sign
    - Use Passport to put the token in header which will send it to server, validate so we can use it in express server when authorized (public vs private)
    - Worth noting: you can use Oauth with passport, not limited to JWT. Just uses a different strategy

### Tips and Tricks in React
    - rfc tab: creates a skeleton of functional component
    - rcc tab: skeleton of class component
    - When you want to install a tool with react, need to cd into client directory
    - npm i react-router-dom for the React router
    - Link instead of ahref
    - BrowserRouter allows back button to work in browser