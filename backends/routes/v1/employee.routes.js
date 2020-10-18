const { Router } = require('express');
const router = Router(); // Load router
const { logger, counterHttpError, counterHttpSuccess } = require('../../utils/logger');
const controller = require('../../controllers/employee.controller');
const { response, responseError } = require('../../errors');
logger.info('employee.routes loaded');

router.get('', async (req,res) => {
  try {
    logger.info('employee.routes get ');
    const resultResponse = await controller.getController(req);
    logger.info(resultResponse);
    counterHttpSuccess.inc();
    return response(res, resultResponse);
  } catch (e) {
    logger.error(e);
    counterHttpError.inc();
    return responseError(res, e);
  }
});

router.post('',  async (req,res) => {
  try {
    logger.info('employee.routes /post ');
    const resultResponse = await controller.postController(req);
    logger.info(resultResponse);
    counterHttpSuccess.inc();
    return response(res, resultResponse);
  } catch (e) {
    logger.error(e);
    counterHttpError.inc();
    return responseError(res, e);
  }
});

router.put('', async (req,res) => {
  try {
    logger.info('employee.routes /update ');
    const resultResponse = await controller.updateController(req);
    logger.info(resultResponse);
    counterHttpSuccess.inc();
    return response(res, resultResponse);
  } catch (e) {
    logger.error(e);
    counterHttpError.inc();
    return responseError(res, e);
  }
});

router.delete('', async (req,res) => {
  try {
    logger.info('employee.routes /delete ');
    const resultResponse = await controller.deleteController(req);
    logger.info(resultResponse);
    counterHttpSuccess.inc();
    return response(res, resultResponse);
  } catch (e) {
    logger.error(e);
    counterHttpError.inc();
    return responseError(res, e);
  }
});

module.exports = router;
