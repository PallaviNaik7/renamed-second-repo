"use strict"

const {
    userController: { UserController },
  } = require("../../src/controllers/userController");


  function UserRoutes(app) {
    app.post("/user", UserController.createUser);
    app.delete("/user/:userId", UserController.deleteUser);
    app.get("/user/:userId", UserController.getUser);   
  }
  
  module.exports.UserRoutes = UserRoutes;
  