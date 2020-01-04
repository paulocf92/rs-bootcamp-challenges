# Challenge 4

## Description

For this challenge we're going to improve our Gympoint which we started in the previous challenge, adding features learned throughout this module.

## Features

### Administrator features

The features available to administrators are described below:

#### Plans Management

Allow the user to register plans for student registration, plans must have the following fields:

- title (plan name);
- duration (duration measured in months);
- price (the plan's monthly price);
- created_at;
- updated_at;

Create some plans like the following:

- `Start`: 1-month plan for R\$129;
- `Gold`: 3-month plan for R\$109/month;
- `Diamond`: 6-month plan for R\$89/month;

Create routes for plan listing/registering/update/removal;

PS.: This feature is only available for administrators authenticated in the app.

#### Student Registration Management

Despite being registered in the platform, it doesn't mean the student will have an active registration and may access the gym.

For this feature we'll create a student registration register, it will have the following fields:

- student_id (student reference);
- plan_id (plan reference);
- start_date (registration starting date);
- end_date (registration ending date);
- price (total price calculated at registration date);
- created_at;
- updated_at;

Registration's **starting date** must be chosen by the user.

Registration's **ending date** and **price** must be calculated based on chosen plan, for example:

Starting date: `23/05/2019`
Selected plan: `Gold (3 months)`
Ending date: `23/08/2019 (3 months past starting date)`
Calculated price: `R$327`

Whenever a student **performs a registration** they'll receive an e-mail with his gym subscription details such as plan, ending date, price and a welcome message.

Create routes for registration listing/registering/updating/removal;

PS.: This feature is only available for administrators authenticated in the app.

### Student features

The features available to students are described below:

#### Check-ins

Whenever a student arrives at the gym they'll perform a check-in by passing their register ID (ID from database);

This check-in is used to monitor how many times the user has attended gym this week.

The table `checkins` will have the following fields:

- student_id (student reference);
- created_at;
- updated_at;

The user may only perform **5 check-ins** during a period of 7 days in a row.

Request example: `POST https://gympoint.com/students/3/checkins`

Create a route to list all check-ins performed by an user based on their register ID;

Request example: `GET https://gympoint.com/students/3/checkins`

#### Help Orders

Students may create requests for aid to the gym regarding some exercise, eating or any other instruction;

The table `help_orders` must contain the following fields:

- student_id (student reference);
- question (student order);
- answer (gym answer);
- answer_at (gym answer date);
- created_at;
- updated_at;

Create a route for the gym to list all help orders without an answer;

Create a route for the students to register help orders entering only their register ID (ID from database);

Request example: `POST https://gympoint.com/students/3/help-orders`

Create a route to list all help orders requested by an user based on their register ID;

Request example: `GET https://gympoint.com/students/3/help-orders`

Create a route for the gym to answer a help order:

Request example: `POST https://gympoint.com/help-orders/1/answer`

Whenever a help order is answered, the student must receive an e-mail in the platform with their request and the gym answer;

## How to test the app

1. Install the dependencies: `yarn install`
2. Start the app: `yarn dev`
3. Send requests to `localhost:3333` routes via a REST client :rocket:.
