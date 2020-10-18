const { logger } = require("../utils/logger");
const model = require("../models/menuList.model"); // import model
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");

exports.getMenuList = async (req) => {
  logger.info("menuList.services getMenuList");
  const result = await model.find().select({ _id: 0})
  if (result === null) {
    throw genResponseObj(req.get("x-language"), "40400", "getMenuList fail", undefined, CONFIG.NODE);
  }
  return result;
};
