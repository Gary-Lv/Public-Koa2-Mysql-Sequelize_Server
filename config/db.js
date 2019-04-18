const Sequelize = require("sequelize");
const db = require("./server.config.js");

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  operatorsAliases: false,
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: db.pool,
  timezone: db.timezone
});

module.exports = {
  sequelize
}
