const service = require("../services/employee.services");
const { logger } = require("../utils/logger");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");

exports.getController = async req => {
    logger.info("getController.controller");
      const resultData = await service.getDataEmployee(req);
  if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "get fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "success.", resultData, CONFIG.NODE );
};

exports.postController = async req => {
  logger.info("employee.controller postController");
      const resultData = await service.insertDataEmployee(req);
  if (resultData === null) {
      throw genResponseObj(req.get("x-language"), "40400", "add fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "add success.", resultData, CONFIG.NODE );
};

exports.updateController = async req => {
  logger.info("employee.controller updateController");
      const resultData = await service.updateDataEmployee(req);
      if (resultData === null) {
        throw genResponseObj(req.get("x-language"), "40400", "update fail", undefined, CONFIG.NODE);
    }
  return genResponseObj(req.get("x-language"), "20000", "Update success.", resultData, CONFIG.NODE );
};

exports.deleteController = async req => {
  logger.info("employee.controller deleteController");
  const resultData = await service.deleteDataEmployee(req);
  if (resultData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "update fail", undefined, CONFIG.NODE);
  }
  return genResponseObj(req.get("x-language"), "20000", "Delete success.", undefined, CONFIG.NODE );
};
