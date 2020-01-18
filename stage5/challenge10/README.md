# Challenge 10

## About the challenge

For this challenge we'll build the front-end of our app - Gympoint - for the back-end built throughout modules 03 and 04 of Node.js.

Gympoint Webapp represents the Gym side, this is, all the features available for administrators. The features available for students will be built in the mobile app.

### New features

Before digging into the webapp **add the following features to the back-end**:

1. Add a boolean field `true/false` in registrations listing indicating whether a registration is active or not, this is, if the ending date is later than current date and starting date is before it (use a `VIRTUAL` field).

For example, in the Registration model, add a new field:

```js
active: {
  type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
    'start_date',
    'end_date',
  ]),
  get() {
    return (
      isBefore(this.get('start_date'), new Date()) &&
      isAfter(this.get('end_date'), new Date())
    );
  },
},
```

And for the query:

```js
const registrations = await Registration.findAll({
  attributes: ["id", "start_date", "end_date", "price", "active"]
});
```

2. Allow students listing (`/students`) to be filtered by name through a Query Parameter `?q=Diego` and looking up such student (use operator `like`). If the parameter hasn't been passed, return all users.

### Important information

1. Before deleting any register from database create an additional confirmation using JavaScript's `confirm` function;
2. To format dates always use `date-fns`;
3. Don't perform value formatting within React's `return ()` statements, prefer formatting data as soon as they're obtained from the API;
4. In payment plans and registrations registering/updating the greyed out inputs will be calculated automatically based on selected values;
5. In registrations registering/updating it must be possible to look for the student by their name, use [React Select](https://react-select.com/home#async)'s `async` method. Plans must be looked up from the API as soon as the page loads and must not have filters.

### Optionals

1. Add pagination for front-end and back-end in all lists;
2. Use the same masks for numerical inputs (weight and height).

## Layout

The challenge layout is attacjed as a `.sketch` file.

It can be viewed in OS X / Windows with a software called [Zeplin](https://zeplin.io).

If you're on Linux or you're not going to use Zeplin there's a folder called `Gympoint WEB` with this challenge repo, download it and access the file `index.html` to view all app pages.
