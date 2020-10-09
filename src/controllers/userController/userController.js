"use strict";
const { BaseController } = require("../baseController");
const { userActions } = require("../../actions/users");
const models = require("../../../models");

//const { verifyJws } = require("../../../verifyJws")

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
  }
  
  async createUser() {
    try {
      let payload = await userActions.createUser(
        this.reqBody,
        this.models
      );

      this.respondWithSuccess(payload);
    } catch (err) {
      this.respondWithError(err);
    }
  }

  async deleteUser() {
    try {
      let payload = await userActions.deleteUser(
        this.params.userId,
        this.models
      );

      this.respondWithSuccess(payload);
    } catch (err) {
      console.log(err);
      this.respondWithError(err);
    }
  }

  async getUser() {
    try {
      let payload = await userActions.getUser(
        this.params.userId,
        this.models
      );

      this.respondWithSuccess(payload);
    } catch (err) {
      console.log(err);
      this.respondWithError(err);
    }
  }

} 
module.exports.UserController = {
  createUser: async (req, res) => {
    return new UserController(req, res).createUser();
  },
  deleteUser: async (req, res) => {
    return new UserController(req, res).deleteUser();
  },
  getUser: async (req, res) => {
    return new UserController(req, res).getUser();
  },
};
