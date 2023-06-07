const { Sequelize, DataTypes } = require("sequelize");

const sequelizeInstance = new Sequelize("node-sequelize", "sa", "Techboy@123", {
  host: "localhost",
  dialect: "mssql",
  logging: false,
});

try {
  sequelizeInstance.authenticate();
  console.log("CONNECTED TO DATABASE");
} catch (error) {
  console.log(`ERR_CODE:${error.code}\nERR_MSG:${error.message}`);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;
db.contact = require("./contact")(sequelizeInstance, DataTypes);
db.user = require("./user")(sequelizeInstance, DataTypes);

//set force:true only in development mode
db.sequelizeInstance.sync({ force: false });

module.exports = db;
