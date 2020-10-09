"use strict";

const { createUser } = require("./createUser");
const { deleteUser } = require("./deleteUser");
const { getUser } = require("./getUser");

module.exports.userActions = {
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser,
  };