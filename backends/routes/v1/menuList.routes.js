const { Router } = require('express');
const router = Router(); // Load router
const { logger, counterHttpError, counterHttpSuccess } = require('../../utils/logger');
const controller = require('../../controllers/menuList.controller');
const { response, responseError } = require('../../errors');
logger.info('menuList.routes loaded');

router.get('', async (req,res) => {
  try {
    logger.info('menuList.routes get ');
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

module.exports = router;
