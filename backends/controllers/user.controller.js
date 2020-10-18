const service = require("../services/user.services");
const { logger } = require("../utils/logger");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");

exports.userController = async req => {
  logger.info("user.controller userController");
      const resultData = await service.loginUser(req);
  if (resultData === null) {
      throw genResponseObj(req.get("x-language"), "40400", "add fail", undefined, CONFIG.NODE);
  }
  return resultData;
};
