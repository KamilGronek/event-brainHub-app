const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "event_brainhub",
    multipleStatements: true,
    timezone: 'utc'
});

module.exports.existsEventByEmail = async (email) => {
    const [rows] = await db.promise().query("SELECT * FROM event WHERE email = ?", [email]);

    const event = rows[0];
    return event != null;
}

module.exports.saveEvent = async (event) => {
    const [rows] = await db.promise().query(
        "INSERT INTO event (first_name, last_name, email, date) VALUES (?,?,?,?)",
        [event.firstName, event.lastName, event.email, event.date]);

    return rows.insertId
}

module.exports.getEvents = async () => {
    const [rows] = await db.promise().query("SELECT * FROM event");[]
    return rows.map(row => mapRow(row));
}

mapRow = (row) => {
    let mappedRow = {};

    mappedRow.id = row.id;
    mappedRow.firstName = row.first_name;
    mappedRow.lastName = row.last_name;
    mappedRow.email = row.email;
    mappedRow.date = row.date;

    return mappedRow;
}