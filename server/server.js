const database = require('./database.js');
const makeApp = require('./app.js');

const app = makeApp.construct(database)

app.listen(8000, function () {
  console.log("Listening!");
});