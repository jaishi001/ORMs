DAY 1 : SETUP NODE WITH SEQUELIZE 
DAY 2 : MODEL VALIDATION AND CONSTRAINTS USING SEQUELIZE 
[

    DIFFERENCE BETWEEN VALIDATION AND CONTRAINTS
    VALIDATION :GENERALLY, VALIDATION IS PROCESS OF CHECKING PROVIDED DATA, ONE CAN HAVE CUSTOM AS WELL AS SYSTEM PROVIDED VALIDATIONS.
    CONSTRAINTS: SIMPLY, CONSTRAINTS ARE SOME RULES IMPLEMENTED IN SOME FIELD IN DATABASE.

    EXAMPLE OF CONSTRAINT:
    allowNull:false, unique:true



] 


// hashing password using set method in model
password: {
        type: DataTypes.STRING(64), // Password is type string and of length 64
        allowNull: false,
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







 *******Used in User Model*******
//hashing password while creating user profile
(Model.prototype.generateHash = function (password) {
  let saltRounds = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltRounds);
}),
  // Comparing passsword while login
  (Model.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  });
