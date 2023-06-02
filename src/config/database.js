const { DATABASE } = require("./config");

const initOptions = {};

const { hostname, username, password, name, port } = DATABASE;
const pgp = require("pg-promise")(initOptions);

const connection = `postgres://${username}:${password}@${hostname}:${port}/${name}`;
const database = pgp(connection);

module.exports = database;
