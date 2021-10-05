const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

module.exports.construct = (database) => {
    const app = express()
  
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.json());

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

    const missingField = {
        code: "field.valid",
        field: "",
        message: "Missing requied field"
    }



    app.post("/api/event", (req, res, next) => {
        validationEvent(req);

        if (validationResult.errors.length === 0) {
            saveEvent(req, res)
        } else {
            res.status(400);
            res.json({
                validationResult: validationResult,
            });
        }
    });

    app.get("/api/event", (req, res, next) => {
        returnEvents(res);
    });

    saveEvent = async (req, res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const date = req.body.date;
    
        const existsEventByEmail = await database.existsEventByEmail(email);

        if (existsEventByEmail) {
            validationResult.errors.push(errorUniqueEmail);
            returnResponseError400(res);
        } else {
            const insertId = await database.saveEvent({
                firstName,
                lastName,
                email,
                date
            });

            if (insertId != null) {
                returnResponseCreated(insertId, res);
            } else {
                returnResponseError500(res);
            }
        }
    };

    returnResponseError400 = (res) => {
        res.status(400);
        res.json({
            validationResult: validationResult,
        });
    };

    returnResponseError500 = (res) => {
        res.status(500);
        res.json("Unexpected error occurred with save event to database");
    };

    returnResponseCreated = (eventId, res) => {
        res.status(201);
        res.json({eventId});
    };

    validationEvent = (req) => {
        validationResult.errors = [];
        if(req.body.firstName == undefined){
            let errorUndefined = clone(missingField);
            errorUndefined.field = "firstName";
            validationResult.errors.push(errorUndefined);
        } else if (req.body.firstName.length === 0 || !req.body.firstName.trim()) {
            let errorNotBlankClone = clone(errorNotBlank);
            errorNotBlankClone.field = "firstName";
            validationResult.errors.push(errorNotBlankClone);
        }

        if (req.body.lastName == undefined){
            let errorUndefined = clone(missingField);
            errorUndefined.field = "lastName";
            validationResult.errors.push(errorUndefined);
        } else if (req.body.lastName.length === 0 || !req.body.lastName.trim()){
            let errorNotBlankClone = clone(errorNotBlank);
            errorNotBlankClone.field = "lastName";
            validationResult.errors.push(errorNotBlankClone);
        }

        if (req.body.email == undefined){
            let errorUndefined = clone(missingField);
            errorUndefined.field = "email";
            validationResult.errors.push(errorUndefined);
        } else if (req.body.email.length === 0 || !req.body.email.trim()){
            let errorNotBlankClone = clone(errorNotBlank);
            errorNotBlankClone.field = "email";
            validationResult.errors.push(errorNotBlankClone);
        } else if (!regexEmail.test(req.body.email)) {
            validationResult.errors.push(uniqValidEmail);
        }

        if (req.body.date == undefined){
            let errorUndefined = clone(missingField);
            errorUndefined.field = "date";
            validationResult.errors.push(errorUndefined);
        } else if (req.body.date.length === 0 || !req.body.date.trim()) {
            let errorNotBlankClone = clone(errorNotBlank);
            errorNotBlankClone.field = "date";
            validationResult.errors.push(errorNotBlankClone);
        }
    };

    clone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    returnEvents = async (res) => {
        let events = await database.getEvents();

        res.json(events);
        res.status(200);
    };

    return app
}
