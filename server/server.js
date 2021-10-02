const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "event_brainhub",
  multipleStatements: true,
  timezone: 'utc'
});

db.connect((err) => {
  if (!err) {
    console.log("Success");
  } else {
    console.log("Failed");
  }
});

app.listen(8000, function () {
  console.log("Listening!");
});

  const validationResult = {
    errors: [],
  };
  
  const regexEmail = /\S+@\S+\.\S+/;
  
  const errorUniqueEmail = {
    code: "email.unique",
    field: "email",
    message: "Email exists",
  };

  const uniqValidEmail = {
    code: "email.valid",
    field: "email",
    message: "Email is invalid",
  };

  const errorNotBlank = {
    code: "field.valid",
    field: "",
    message: "Input cannot be empty",
  };

  returnResponseCreated = (res) => {
    res.status(201);
    res.json();
  };

  returnResponseError = (res) => {
    res.status(400);
    res.json({
      validationResult: validationResult,
    });
  };

  checkUserByEmailAndSave = (email, callBackSave) => {
    db.query("SELECT * FROM event WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.log(err);
        return null;
      }
  
      callBackSave(result);
    });
  };

  saveEvent = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const date = req.body.date;
  
    checkUserByEmailAndSave(req.body.email, (result) => {
      if (result.length !== 0) {
        validationResult.errors.push(errorUniqueEmail);
        returnResponseError(res);
      } else {
        db.query(
          "INSERT INTO event (first_name, last_name, email, date) VALUES (?,?,?,?)",
          [firstName, lastName, email, date],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
  
            returnResponseCreated(res);
          }
        );
      }
    });
  };

  returnResponseEventCreate = (res, callBackCreateEvent) => {
    if (validationResult.errors.length === 0) {
      callBackCreateEvent();
    } else {
      res.status(400);
      res.json({
        validationResult: validationResult,
      });
    }
  };


  validationEvent = (req) => {
    validationResult.errors = [];
    if (req.body.firstName.length === 0 || !req.body.firstName.trim()) {
        let errorNotBlankClone = clone(errorNotBlank);
        errorNotBlankClone.field = "firstName";
        validationResult.errors.push(errorNotBlankClone);
    }

    if (req.body.lastName.length === 0 || !req.body.lastName.trim()) {
        let errorNotBlankClone = clone(errorNotBlank);
        errorNotBlankClone.field = "lastName";
        validationResult.errors.push(errorNotBlankClone);
    }

    if (req.body.email.length === 0 || !req.body.email.trim()) {
        let errorNotBlankClone = clone(errorNotBlank);
        errorNotBlankClone.field = "email";
        validationResult.errors.push(errorNotBlankClone);
    } else if (!regexEmail.test(req.body.email)) {
        validationResult.errors.push(uniqValidEmail);
    }

    if (req.body.date.length === 0 || !req.body.date.trim()) {
        let errorNotBlankClone = clone(errorNotBlank);
        errorNotBlankClone.field = "date";
        validationResult.errors.push(errorNotBlankClone);
    }
  };

  clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }

  app.post("/api/event", (req, res, next) => {
    validationEvent(req);

    returnResponseEventCreate(res, () => {
        saveEvent(req, res)
    });
  });

  app.get("/api/event", (req, res, next) => {
    returnEvents(res);
  });

  returnEvents = (res) => {
    db.query("SELECT * FROM event", (err, results) => {
      if (err) {
        console.log(err);
        return null;
      }
  
      res.status(200);
      res.json(results.map(result => mapResult(result)));
    });
  };

  mapResult = (result) => {
      let mappedResult = {};

      mappedResult.id = result.id;
      mappedResult.firstName = result.first_name;
      mappedResult.lastName = result.last_name;
      mappedResult.email = result.email;
      mappedResult.date = result.date;

      return mappedResult;
  }

//http://localhost/phpmyadmin/


