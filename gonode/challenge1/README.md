# Challenge 1

## Description

Create an app from scratch using ExpressJS.

This app will be used to store projects and their respective tasks.

### Routes

- `POST /projects`: This route must accept an `id` and a `title` in the request body in order to register a new project. This project will be stored in an array bearing the following structure: `{ id: "1", title: 'New project', tasks: [] }`;

- `GET /projects`: This route will list all projects and their respective tasks;

- `PUT /projects/:id`: This route will modify only the title for a project having the `id` specified as a route parameter;

- `DELETE /projects/:id`: This route will delete a project having the `id` specified as a route parameter;

- `POST /projects/:id/tasks`: This route must accept a `title` and store a new task with such title for a project's array of tasks, given a project `id` specified as a route parameter;

### Middlewares

- Create a middleware that will be used in all routes which accept a project ID in the URL parameters. It must verify if the project with such ID exists. If not it must return an error, otherwise it must allow the request to proceed as normal.

- Create a global middleware that will be called in all requests and print out a count of how many requests have been made until now;

## How to test the app

1. Install the dependencies: `yarn install`
2. Start the app: `yarn start`
3. Visit `localhost:3000` :rocket:.
