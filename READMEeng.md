# Introduction:

I created a simple form implemented in React and connected to the API
written in Node.js (Express.js), using the MySQL database.

## Technologies:

-React: 17.0.2,
-Node: 12.16.1,
-Express: 4.17.1

## Database:

Should use the MySQL database client, phpMyAdmin server,
enter the site: http://localhost/phpmyadmin/index.php,
then in the queries field - SQL, paste the code saved in the folder server/database.sql

## Activation the application for the back-end:

After downloading the application, to start the server, in the main path of the project, enter:

```bash
cd server
```

then install node.modules dependencies:

```bash
npm install
```

then to start the server:

```bash
node server.js
```

## Activation the application for the front-end:

After start the back-end application, to start the frontend application, in the new terminal you should enter:

```bash
cd client
```

then install node.modules dependencies:

```bash
npm install
```

then run the applications:

```bash
npm start
```

## Tests for back-end/ server:

Path where the tests are located: server / test / app.test.js

We do several tests for the GET / POST method, including:

for the POST method:

- tests for creating a user - status 201,
- tests for the json object containing the event id
- tests for the format to be returned from the server
- validation tests: (e.g. for empty fields and for
  non-existent fields)

for the GET method:

- returning all objects

To run the test, first enter in the main path of the project:

```bash
cd server
```

and then the command for tests:

```bash
npx jest
```

## Tests for front-end/ client:

Path where the test is located: client / test / Utils.test.js

We are testing a method that renders an error message to us.
Due to the simple form for creating an event, I created only one test.

To run the test, first enter in the main path of the project:

```bash
cd client
```

and then the command for the test:

```bash
npm test
```
