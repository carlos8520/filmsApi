const Sequelize = require("sequelize");

const filmModel = require("./models/film");
const userModel = require("./models/user");

const sequelize = new Sequelize("prueba2", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

const Film = filmModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("synced tables");
});

module.exports = {
  Film,
  User,
};
