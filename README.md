# MERN test assignment for SKIPLI

## Used tech stacks

- React
- TypeScript
- Node
- Express.js
- MongoDB

Please read the README.MD first to run the frontend and backend project. You should start with the [Backend](./backend/README.md) first.

## Frontend

### Features

The frontend has the following features:

- Create new user using phone number
- Authenticate user
- Search Github users
- Like Github users
- Display the user's profile with phone number and user's favorite Github users

### Installation

Run the command `npm install` in this directory to install all the dependencies of this project.

If you don't have NodeJS installed on your computer, [install NodeJS](https://nodejs.org/en/) version 18.13.0 or above. The Node version used to build this project is specified in the [.nvmrc file](./.nvmrc).

### Run Project

Run the command `npm start` in this directory to start the frontend of Skipli Test Project.

The website will be run at [localhost:3001](http://localhost:3001).

In order for the frontend to work correctly, the [backend](../backend/README.md) should be started first.

**Notice:** There are 3 routes in this project:

1. "/": the search page
2. "/login": the login page
3. "/profile": the profile page

The search page and the profile page are protected. Only the authenticated users can access those pages.

If you are redirected to the login page, you might not be authenticated.

### Technologies

The frontend of the Skipli Test Project uses:

- [ReactJS](https://reactjs.org/)
- [Axios](https://github.com/axios/axios) to send requests to the backend
- [Bootstrap](https://getbootstrap.com/) for styling

### Things That Can Be Improved

- Add loading screen to let the user know what is happening
- Use a library like [React Query](https://www.npmjs.com/package/react-query) to make requests for better data processing and caching
- Create page layouts to make the website have consistent looking
- Handle errors

### Problems with Github REST API

Since the backend project using Github REST API, the latest change to the `public_repos` and `followers` properties causes a exceed rate-limit problem. You can read more about it in the [backend directory](../backend/README.md)

If the Github users are not loaded to the screen, it might be caused by this issue.

## Backend

### Features

The backend has the following features:

- Create new user using phone number
- Verify user's phone number
- Search Github users
- Like Github users
- Provide the user's profile with phone number and user's favorite Github users

### Installation

Run the command `npm install` in this directory to install all the dependencies of this project.

If you don't have NodeJS installed on your computer, [install NodeJS](https://nodejs.org/en/) version 18.13.0 or above. The Node version used to build this project is specified in the [.nvmrc file](./.nvmrc).

### Run Project

Run the command `npm start` in this directory to start the backend of Skipli Test Project.

### Test Project

If you want to run the integration test of this project, you have to do the following steps:

1. Run the command `npm run db:up` to start the Firestore emulator. Firestore emulator is the local Firestore. All the data in this local Firestore will be deleted after testing.
2. Run the command `npm run test:integration` to start testing.

**Notice:** The integration tests in this project only test the success condition, a.k.a. the happy path. This is due to the limited time and I only need to ensure some core features work as expected.

In other words, the validation might not work properly and the errors might not be handled.

### Technologies

The backend of the Skipli Test Project uses:

- [ExpressJS](https://expressjs.com/)
- [Twilio](https://www.twilio.com/) to send SMS
- Firestore of [Firebase](https://firebase.google.com/) to store data

### Things That Can Be Improved

- Handle errors
- Create separate environments: development, production
- Use the environment variables instead of hard-coding
- Use Inversion of Control library like [awilix](https://www.npmjs.com/package/awilix) to handle dependency injection

### Problems with Github REST API

Since this project using Github REST API, the latest change to the `public_repos` and `followers` properties causes a exceed rate-limit problem.

There are no support for the `public_repos` and `followers` properties in the search API, according to [the Github official document](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users). This is due to the [summary presentation](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#summary-representations) does not have the attributes that are computationally expensive.

In order to display the `public_repos` and `followers` number, we have to make another request to the `users` endpoint for each found users. Because the amount of users found could be big, the amount of requests the backend have to make is big. It will easily exceed the rate-limit of Github REST API.
