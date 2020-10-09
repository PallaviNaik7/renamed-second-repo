"use strict";

const models = require("../../models");
const {
  BadRequestError,
  NotAuthorizedError,
  ResourceNotFoundError,
  InternalError,
  NotAuthenticatedError
} = require("../errors");
const jwt = require("jsonwebtoken");

class BaseController {
  constructor(req, res) {
    this.expressRequest = req;
    this.reqBody = req.body;
    this.params = req.params;
    this.query = req.query;
    this.headers = req.headers;
    this.response = res;
    this.models = models;
  }
  respond(payload, status = 200, headers = null) {
    this.response.status(status).send(payload);
  }

  respondWithError(err) {
    if (err instanceof ResourceNotFoundError) {
      this.respond({ type: "error", message: err.message }, 404);
    } else if (err instanceof BadRequestError) {
      this.respond({ type: "error", message: err.message }, 400);
    } else if (err instanceof NotAuthorizedError) {
      this.respond({ type: "error", message: err.message }, 403);
    } else if (err instanceof InternalError) {
      this.respond({ type: "error", message: err.message }, 500);
    } else if (err instanceof NotAuthenticatedError) {
      this.respond({ type: "error", message: err.message }, 401);
    } else {
      this.respond({ type: "error", message: err.message }, 500);
    }
  }

  respondWithSuccess(payload, headers = null) {
    if (headers)
      this.respond({ type: "success", message: payload }, 200, headers);
    this.respond({ type: "success", message: payload }, 200);
  }

  async _findPartner(headers) {
    if (!headers["sp-api-key"])
      throw new ResourceNotFoundError("Key not preseent");

      var key = "SAAMS_V2_KEY"

    if (headers["sp-api-key"]!= key) throw new ResourceNotFoundError("partner");
  }

  async _findOrganisation() {
    this.targetOrganisation = await models.organisations.findOne({
      where: {
        id: this.params.organisationId
      }
    });
    if (!this.targetOrganisation)
      throw new ResourceNotFoundError("organisation");
  }

  async _findCurrentUser(){

    var token = this.expressRequest.header('Authorization').replace('Bearer ', '');
    var decodedToken = jwt.decode(token)

    var [targetUser, e] = await models.sequelize.query(`select name, phone_number, email, "universalId" from users where "phone_number" = '${decodedToken.phone_number}' LIMIT 1`)

    this.targetUser = targetUser[0]

    if(!this.targetUser) throw new NotAuthorizedError("Unauthorised access")
  }
}

module.exports = {
  BaseController: BaseController
};
