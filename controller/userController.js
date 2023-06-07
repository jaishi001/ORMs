const { QueryTypes } = require("sequelize");
const db = require("../model/index");
const User = db.user;
const bcrypt = require("bcryptjs");

async function doAddUser(req, res) {
  //   const arjun = User.build({ firstName: "Arjun" });
  try {
    const formData = req.body;
    const user = await User.create(formData);
    // used this to hash password using set method from model
    // user.password = formData.password;
    user.password = user.generateHash(formData.password); // hashing password using instance method
    user.save();

    res.status(200).json({ user: user });
  } catch (ex) {
    res.send({ msg: ex.message, ex });
    // console.log(ex.message);
  }
}

async function doUserLogin(req, res) {
  const password = req.body.password;
  const email = req.body.email;

  try {
    await User.findOne({
      where: {
        email: email,
      },
    }).then((u) => {
      if (u) {
        if (u.validPassword(password.trim())) {
          delete u.dataValues.password; // deleteing pw from respone
          res.status(200).json({ msg: "Logged In !", user: u.dataValues });
        } else {
          res.send({ msg: "Invalid Credentials - !" });
        }
      } else {
        res.send({ msg: "Invalid Credentials !" });
      }
    });
  } catch (ex) {
    console.log(ex.message);
  }
}

async function doFetchUser(req, res) {
  const user = await User.findAll();
  res.status(200).json({ user: user });
}

//using params
async function doFetchSingleUser(req, res) {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  res.status(200).json({ user: user });
}

//using query
async function doFetchSingleUserById(req, res) {
  const uid = req.query.uid;
  const lastName = req.query.lastName;

  console.log(uid, lastName);
  const user = await User.findOne({
    where: { id: uid, lastName: lastName },
  });
  res.status(200).json({ user: user });
}

//delete user

async function doUserDeleteById(req, res) {
  const uid = req.params.uid;
  const user = User.destroy({
    where: { id: uid },
  });
  res.status(200).json({ msg: "User Deleted Successfully !" });
}

async function doUserUpdateByPatch(req, res) {
  const uid = req.params.uid;
  const formData = req.body;
  const user = User.update(formData, {
    where: { id: uid },
  });
  if (user) {
    res.status(200).json({ msg: "User Updated!" });
  }
}

async function doUserUpdateByPut(req, res) {
  const uid = req.params.uid;
  const formData = req.body;
  const user = User.update(formData, {
    where: { id: uid },
  });
  if (user) {
    res.status(200).json({ msg: "User Updated!" });
  }
}

//Raw Query-Select
async function doFetchUsersByQuery(req, res) {
  let query = "";
  //   query = "Select concat(firstName,' ',lastName) as fullName,email From users ";
  // query = "Select * from users where id = ?"; // replecement are stored in array [1]
  query = "Select * from users where id=:id"; // replacement are stored on object, with key value

  const users = await db.sequelizeInstance.query(query, {
    type: QueryTypes.SELECT,
    model: User,
    mapToModel: true,
    // replacements: [3],
    replacements: { id: 1 },
    // plain:true
  });

  if (!users) {
    res.send({ msg: "No Users!" });
  }
  res.status(200).json({ user: users });
}

module.exports = {
  doAddUser,
  doFetchUser,
  doFetchSingleUser,
  doFetchSingleUserById,
  doUserDeleteById,
  doUserUpdateByPatch,
  doUserUpdateByPut,
  doUserLogin,
  doFetchUsersByQuery,
};
