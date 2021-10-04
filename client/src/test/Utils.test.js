const utils = require("../Utils");

test("check expected error statement", () => {
    let errors = [{
        code: "field.valid",
        field: "email",
        message: "Input cannot be empty",
      }];

    expect(JSON.stringify(utils.handleError(errors, "email"))).toBe(JSON.stringify([<strong style={{color:"red"}}>Input cannot be empty</strong>]));
});

