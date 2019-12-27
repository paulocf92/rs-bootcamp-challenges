# Challenge 3

The app we'll start developing from now on is a gym management app called **Gympoint**.

In this initial challenge we'll create basic features learned throughout the module so far. This project will be slowly developed the bootcamp journey's end; by that point we're expected to have a full app with back-end, front-end and mobile, which will be used for the **bootcamp's certification**.

## About the tools

You are tasked to creating an app from scratch using ExpressJS, besides the following tools must be used:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (use either PostgreSQL or MySQL).

## Features

This app will feature the following:

#### Authentication

Allow the user to authenticate themselves in your app using their e-mail and password.

Create an administrator user using [sequelize seeds](https://sequelize.org/master/manual/migrations.html#creating-first-seed), this feature's purpose is to create records in the database in an automated fashion.

To create a seed use the following:

```js
yarn sequelize seed:generate --name admin-user
```

In the file generated in `src/database/seeds` add the code regarding the creation of an administrator user:

```js
const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
```

Now run:

```js
yarn sequelize db:seed:all
```

By this point you will have an user in the database, use this user to perform all log-ins from now on.

- The authentication must be done using JWT.
- Perform an entry data validation.

#### Students Register

Allow the students to be kept (registered/updated) in the app using their name, email, age, weight and height.

Use a new database table called `students`.

The students register may only be done by administrators authenticated in the app.

Students cannot authenticate in the system.

## How to test the app

1. Install the dependencies: `yarn install`
2. Start the app: `yarn dev`
3. Send requests to `localhost:3333` routes via a REST client :rocket:.
