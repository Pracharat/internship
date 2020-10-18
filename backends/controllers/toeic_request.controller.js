const service = require("../services/toeic_request.services");
const { logger } = require("../utils/logger");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");

exports.getController = async req => {
  logger.info("toeic_request.controller getController");
      const resultData = await service.getDataToeicRequest(req);
  if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "get fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "success.", resultData, CONFIG.NODE );
};

exports.postController = async req => {
  logger.info("toeic_request.controller postController");
      const resultData = await service.insertDataToeicRequest(req);
  if (resultData === null) {
      throw genResponseObj(req.get("x-language"), "40400", "add fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "add success.", resultData, CONFIG.NODE );
};

exports.updateController = async req => {
  logger.info("toeic_request.controller updateController");
      const resultData = await service.updateDataToeicRequest(req);
      if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "update fail", undefined, CONFIG.NODE);
    }
  return genResponseObj(req.get("x-language"), "20000", "Update success.", resultData, CONFIG.NODE );
};

exports.deleteController = async req => {
  logger.info("toeic_request.controller deleteController");
      await service.deleteDataToeicRequest(req);
  return genResponseObj(req.get("x-language"), "20000", "Delete success.", undefined, CONFIG.NODE );
};
