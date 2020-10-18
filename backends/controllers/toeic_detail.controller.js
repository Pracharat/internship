const service = require("../services/toeic_detail.services");
const { logger } = require("../utils/logger");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");

exports.getController = async req => {
  logger.info("toeic_detail.controller getController");
      const getData = await service.getDataToeicDetail(req);
      const resultData = {
      items: getData,
      total: getData.length
      }
  if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "get fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "success.", resultData, CONFIG.NODE );
};

exports.postController = async req => {
  logger.info("toeic_detail.controller postController");
      const resultData = await service.insertDataToeicDetail(req);
  if (resultData === null) {
      throw genResponseObj(req.get("x-language"), "40400", "add fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "add success.", resultData, CONFIG.NODE );
};

exports.updateController = async req => {
  logger.info("toeic_detail.controller updateController");
      const resultData = await service.updateDataToeicDetail(req);
      if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "update fail", undefined, CONFIG.NODE);
    }
  return genResponseObj(req.get("x-language"), "20000", "Update success.", resultData, CONFIG.NODE );
};

exports.deleteController = async req => {
  logger.info("toeic_detail.controller deleteController");
      await service.deleteDataToeicDetail(req);
  return genResponseObj(req.get("x-language"), "20000", "Delete success.", undefined, CONFIG.NODE );
};
