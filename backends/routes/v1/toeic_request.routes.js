const { Router } = require('express');
const router = Router(); // Load router
const { logger, counterHttpError, counterHttpSuccess } = require('../../utils/logger');
const controller = require('../../controllers/toeic_request.controller');
const { response, responseError } = require('../../errors');
logger.info('toeic_request.routes loaded');

router.get('', async (req,res) => {
  try {
    logger.info('toeic_request.routes get ');
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

router.post('', async (req,res) => {
  try {
    logger.info('toeic_request.routes /post ');
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
    logger.info('toeic_request.routes /update ');
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
    logger.info('toeic_request.routes /delete ');
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
