const { Router } = require('express');
const router = Router(); // Load router
const { logger } = require('../../utils/logger');
const CONFIG = require('../../config');
const { response, responseError, genResponseObj } = require('../../errors');

logger.info('Loading server api routes');
//  Load routes for out controllers
logger.info('Server api routes loaded');

router.use(async (req, res, next) => {
  const byPass = (
       (req.url.startsWith('/employee') && req.method === 'GET')
    || (req.url.startsWith('/employee') && req.method === 'POST')
    || (req.url.startsWith('/employee') && req.method === 'PUT')
    || (req.url.startsWith('/employee') && req.method === 'DELETE')

    || (req.url.startsWith('/toeic_detail') && req.method === 'GET')
    || (req.url.startsWith('/toeic_detail') && req.method === 'POST')
    || (req.url.startsWith('/toeic_detail') && req.method === 'PATCH')
    || (req.url.startsWith('/toeic_detail') && req.method === 'DELETE')

    || (req.url.startsWith('/toeic_request') && req.method === 'GET')
    || (req.url.startsWith('/toeic_request') && req.method === 'POST')
    || (req.url.startsWith('/toeic_request') && req.method === 'PUT')
    || (req.url.startsWith('/toeic_request') && req.method === 'DELETE')

    || (req.url.startsWith('/login') && req.method === 'POST')

    || (req.url.startsWith('/signup') && req.method === 'POST')

    || (req.url.startsWith('/menuList') && req.method === 'GET')

    || (req.url.startsWith('/upload') && req.method === 'POST')
  );

  if (byPass) {
    next();
  } else if (!req.get('x-app-name')) {
    responseError(res, genResponseObj(req.get('x-language'), '40100', 'x-app-name is empty', undefined, CONFIG.NODE));
  } else if (!req.get('x-channel')) {
    responseError(res, genResponseObj(req.get('x-language'), '40100', 'x-channel is empty', undefined, CONFIG.NODE));
  } else if (!req.get('x-user-request')) {
    responseError(res, genResponseObj(req.get('x-language'), '40100', 'x-user-request is empty', undefined, CONFIG.NODE));
  } else if (!req.get('x-transaction-id')) {
    responseError(res, genResponseObj(req.get('x-language'), '40100', 'x-transaction-id is empty', undefined, CONFIG.NODE));
  } else if (!req.get('x-auth-role')) {
    responseError(res, genResponseObj(req.get('x-language'), '40100', 'x-auth-role is empty', undefined, CONFIG.NODE));
  } else if (req.get('x-auth-role') !== CONFIG.ROLE.GUEST && req.get('x-auth-role') !== CONFIG.ROLE.DEV &&
    req.get('x-auth-role') !== CONFIG.ROLE.SI && req.get('x-auth-role') !== CONFIG.ROLE.SUPPLIER) {
    responseError(res, genResponseObj(req.get('x-language'), '40100', 'x-auth-role is not correct value', undefined, CONFIG.NODE));
  } else {
    logger.info('validate header success');
    next();
  }
});

router.use('/login', require('./user.routes'));
router.use('/signup', require('./signup.routes'));
router.use('/employee', require('./employee.routes'));
router.use('/menuList', require('./menuList.routes'));
router.use('/toeic_detail', require('./toeic_detail.routes'));
router.use('/toeic_request', require('./toeic_request.routes'));
router.use('/upload', require('./upload.routes'));
module.exports = router;
