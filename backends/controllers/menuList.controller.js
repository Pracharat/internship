const service = require("../services/menuList.services");
const { logger } = require("../utils/logger");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");

exports.getController = async req => {
    logger.info("menuList.controller getController");
      const resultData = await service.getMenuList(req);
  if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "getController fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "success.", resultData, CONFIG.NODE );
};
