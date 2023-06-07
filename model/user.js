const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false, // User must values in firstName field , CONSTRAINT
        validate: {
          notNull: {
            //Validation
            msg: "Please Enter First Name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true, // User can pass no value in last name field, CONSTRAINT
        defaultValue: "jaishi",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // User must pass unique email , CONSTRAINT
        validate: {
          isEmail: true,
          notContains: ["/", "_", "%"], // illigal charactrs for email, fails if any of these are present
        },
      },
      password: {
        type: DataTypes.STRING(64), // Password is type string and of length 64
        allowNull: false,
        // hashing password using set method in model
        // set: function (val) {
        //   this.setDataValue(
        //     "password",
        //     bcrypt.hashSync(val, bcrypt.genSaltSync(10))
        //   );
        // },
        validate: {
          //validation
          // min: 8,
          // max: 64,
          len: [8, 64],
        },
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      paranoid: true,
      deletedAt: "destroyAt",
    }
  );
};

// No need to used generateHash if set method is used to hash password

//hashing password while creating user profile
(Model.prototype.generateHash = function (password) {
  let saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltRounds);
}),
  // Comparing passsword while login
  (Model.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  });
