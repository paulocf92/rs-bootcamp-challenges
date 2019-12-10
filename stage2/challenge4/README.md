# Challenge 3

## Description

For this challenge we're going to improve our Meetapp which we started in the previous challenge, adding features learned throughout this module.

## Features

We're tasked to adding the following features to our app:

### File Management

Create a route for file uploading that stores file path and name in a table, and returns all data related to this stored file.

### Meetup Management

The user may register meetups with title, description, location, date/hour and image (banner). Every field is required. It's mandatory to add a user_id field that will store the organizer's id.

It must not be possible to register meetups with past dates.

The user may edit all information for meetups which haven't happened yet and belong to them.

Create a route to list all meetups organized by the logged user.

The user may cancel meetups organized by them which haven't happened yet. The cacellation process must delete that meetup from the database.

### Meetup Subscription

Users may subscribe to a meetup, attempting to the following facts:

- Users may subscribe to meetups not organized by them;
- Users may not subscribe to meetups which have already happened;
- Users may not subscribe to the same meetup twice;
- Users may not subscribe to more than one meetup that happens at the same time.

Whenever an user subscribe to a meetup, send an e-mail to the meetup organized with all data related to the subscribed user. We're free to choose an e-mail template. :)

### Meetup Listing

Create a route to list all meetups filtered by date (not to be confused with time). The results must be paginated by 10 items per page. Below is an example of such route call:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

In this example we're listing the second page of meetups which will happen on July, 1st.

This list must also return the organizer info.

### Subscription List

Create a route to list all meetups that the user is subscribed to.

List only meetups which haven't happened yet, and order them from closest to oldest.

## How to test the app

1. Install the dependencies: `yarn install`
2. Start the app: `yarn dev`
3. Send requests to `localhost:3333` routes via a REST client :rocket:.
