const request = require('supertest');
const makeApp = require('../app.js');

const existsEventByEmail = jest.fn();
const saveEvent = jest.fn();
const getEvents = jest.fn();
const eventUrl = "/api/event";

const app = makeApp.construct({
    existsEventByEmail,
    saveEvent,
    getEvents
});

describe("POST /api/event", () => {

    describe("given a request body with all required data", () => {
        test("should respond with a 201 status code", async () => {
            existsEventByEmail.mockResolvedValue(false);
            saveEvent.mockResolvedValue(1);

            const response = await request(app).post(eventUrl).send({
                firstName : "first",
                lastName : "last",
                email : "example@vp.com",
                date :  "2017-06-15 09:34:21"
            });

            expect(response.statusCode).toBe(201);
        })

        test("should respond with a json object containg the event id", async () => {
            for (let i = 1; i < 10; i++) {
                saveEvent.mockReset();
                existsEventByEmail.mockResolvedValue(false);
                saveEvent.mockResolvedValue(i);
                const response = await request(app).post(eventUrl).send({
                    firstName : "first",
                    lastName : "last",
                    email : "example@vp.com",
                    date :  "2017-06-15 09:34:21"
                });

                expect(response.body.eventId).toBe(i);
            }
        })

        test("should specify json in the content type header", async () => {
            existsEventByEmail.mockResolvedValue(false);
            saveEvent.mockResolvedValue(1);

            const response = await request(app).post(eventUrl).send({
                    firstName : "first",
                    lastName : "last",
                    email : "example@vp.com",
                    date :  "2017-06-15 09:34:21"
                });

            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
          })
    })

    describe("when server respond with a status code of 400", () => {
        test("should respond with a status code of 400 and expected message", async () => {
          const bodyData = [
            {
                firstName : "",
                lastName : "last",
                email : "example@vp.com",
                date :  "2017-06-15 09:34:21"
            },
            {
                firstName : "first",
                lastName : "",
                email : "example@vp.com",
                date :  "2017-06-15 09:34:21"
            },
            {
                firstName : "first",
                lastName : "last",
                email : "",
                date :  "2017-06-15 09:34:21"
            },
            {
                firstName : "first",
                lastName : "last",
                email : "example@vp.com",
                date :  ""
            }
          ]
          for (const body of bodyData) {
            const response = await request(app).post(eventUrl).send(body)
            expect(response.statusCode).toBe(400)
            expect(response.body.validationResult.errors[0].message).toBe("Input cannot be empty");
          }
        })

        test("should respond with a status code of 400 and gives message about unique email", async () => {
            existsEventByEmail.mockResolvedValue(true);
            const response = await request(app).post(eventUrl).send({
                firstName : "ewfew",
                lastName : "last",
                email : "example@vp.com",
                date :  "2017-06-15 09:34:21"
            })
              expect(response.statusCode).toBe(400);
              expect(response.body.validationResult.errors[0].message).toBe("Email exists");
        })

        test("should respond with a status code of 400 and expected message", async () => {
            const bodyData = [
                {
                    lastName : "last",
                    email : "example@vp.com",
                    date :  "2017-06-15 09:34:21"
                },
                {
                    firstName : "first",
                    email : "example@vp.com",
                    date :  "2017-06-15 09:34:21"
                },
                {
                    firstName : "first",
                    lastName : "last",
                    date :  "2017-06-15 09:34:21"
                },
                {
                    firstName : "first",
                    lastName : "last",
                    email : "example@vp.com",
                }
            ]
            for (const body of bodyData) {
              const response = await request(app).post(eventUrl).send(body)
              expect(response.statusCode).toBe(400)
              expect(response.body.validationResult.errors[0].message).toBe("Missing requied field");
            }
        })
    })
})

describe("GET /api/event", () => {

    test("should return all events", async () => {
        let data = [
            {
                firstName : "a",
                lastName : "last",
                email : "example@vp.com1",
                date :  "2017-06-15 09:34:21"
            },
            {
                firstName : "b",
                lastName : "last",
                email : "example@vp.com2",
                date :  "2017-06-15 09:34:21"
            }
        ];

        getEvents.mockResolvedValue(data);
        const response = await request(app).get(eventUrl).send();

        expect(JSON.stringify(response.body)).toBe(JSON.stringify(data));
    })
})