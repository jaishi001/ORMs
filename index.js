const express = require("express");
const bodyParser = require("body-parser");
require("./model/index");
const controllers = require("./controller/index");
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse form data : application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.get("/", function (req, res) {
  res.send("HI ! SEQUELIZE");
});

app.post("/add-user", controllers.doAddUser);
app.get("/get-user", controllers.doFetchUser);
app.get("/get-user/:id", controllers.doFetchSingleUser);
app.get("/get-user-id", controllers.doFetchSingleUserById);
app.delete("/delete-user/:uid", controllers.doUserDeleteById);
app.patch("/update-user/:uid", controllers.doUserUpdateByPatch);
app.put("/update-user-put/:uid", controllers.doUserUpdateByPut);
app.post("/user-login", controllers.doUserLogin);
app.get("/get-users", controllers.doFetchUsersByQuery);

app.listen(3000, function () {
  console.log("SERVER RUNNING ON PORT 3000");
});
