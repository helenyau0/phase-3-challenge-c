# Part 2: Command Line Hotel Management System

## To set up database:

    - running the command "npm run db:create" will create the database
    - running the command "npm run db:schema" will create the schema
    - running the command "npm run db:seed" will seed the database
    - running the command "npm run db:reset" will drop, create, schema, and seed the database


## To test commands for Hotel Management System:
  - to find all guests booked in hotel run the command:

    `"$ node hotel.js guests"`

  - to list all rooms along with their availability run the command:

    `"$ node hotel.js rooms"`

  - to list only available rooms run the command:

    `"$ node hotel.js rooms --available"`
  - to list all current and future bookings run the command:

    `"$ node hotel.js bookings"`

  - to list room bookings for one room (only show current and future bookings) run the command:

    `"$ node hotel.js bookings 3B"`

## To test database query functions:

  - cd into part-2 folder then run the command `"npm test"`
