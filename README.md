# Wprowadzenie:

I have created a simple form implemented in React.
I connected to an API written in Node.js (Express.js) using a MySQL database.

## Technology:

-React: 17.0.2,
-Node: 12.16.1,
-Express: 4.17.1

## Database creation:

You should use the MySQL database client phpMyAdmin server,
go to the website: http://localhost/phpmyadmin/index.php,
then in the field for queries (queries) - SQL, paste the code saved in the server/database.sql folder

## Running the application for the back-end:

After downloading the application, to start the server, in the main project path, enter:

```bash
cd server
```

then install ```node.modules``` dependencies:

```bash
npm install
```

then to start the server:

```bash
node server.js
```

## Launching the application for the front-end:

After launching the backend application, to launch the frontend application, in the new terminal you need to type:

```bash
cd client
```

then install ```node.modules``` dependencies:

```bash
npm install
```

then to start the server:

```bash
npm start
```

## Tests for back-end/server:

Path where tests are located: server/test/app.test.js

We are doing a few tests for the GET/POST method, including:
for the POST method:

- tests for creating a user - status 201,
- tests for json object containing event id
- tests for the format to be returned from the server
- tests for validation: (e.g. for empty fields and for
   nonexistent fields)

for the GET method:

- returning all objects

To run the test, in the main project path, first enter:

```bash
cd server
```

and then the test command:

```bash
npx jest
```

## Test for front-end/client:

Path where test is located: client/test/Utils.test.js

We are testing a method that renders an error message to us.
Due to the simple form for creating an event, I created only one test.

To run the test, in the main project path, first enter:

```bash
cd client
```

and then the test command:

```bash
npm test
```
