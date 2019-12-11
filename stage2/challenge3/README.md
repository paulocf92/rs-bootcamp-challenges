# Challenge 3

## Description

Create an app from scratch using ExpressJS.

In this app the following tools must be used:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (use either PostgreSQL or MySQL);

This challenge marks the beginning of a new project within the bootcamp. It will be slowly developed until the bootcamp journey's end; by that point we're expected to have a full app with back-end, front-end and mobile.

## Application

This app aggregates events for developers and will be called Meetapp. In this first challenge we're tasked to create a few basic features learned throughout this module.

## Features

This app will feature the following:

### Authentication

Allow for an user to authenticate self using an e-mail and password.

- The authentication must be done with JWT.
- Entry user data must be validated to avoid incorrect operations.

### User registration and update

Allow for new users to be registered in the app using name, e-mail and password.

In order to update password, the user must also send a confirmation field with the same password.

- Encrypt user password for safety;
- Entry user data must be validated to avoid incorrect operations.

## How to test the app

1. Install the dependencies: `yarn install`
2. Start the app: `yarn dev`
3. Send requests to `localhost:3333` routes via a REST client :rocket:.
