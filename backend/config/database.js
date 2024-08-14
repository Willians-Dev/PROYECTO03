const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library", "postgres", "Trabajo123.", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
