const moment = require('moment');
const winston = require('winston');
const { LOG_TYPE, LOG_SERVICE_TYPE } = require('./log.config');
const DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss.SSS'; // only use for timestamp
const Prometheus = require('prom-client');

const counterHttpSuccess = new Prometheus.Gauge({
  name: 'counter_request_success',
  help: 'Staus success of HTTP request',
});

const counterHttpError = new Prometheus.Gauge({
  name: 'counter_request_error',
  help: 'Staus error of HTTP request',
});

const logger = {
  info: (req, message) => {
    winston.loggers.get(LOG_TYPE.ROOT).info(concatModelLog(modelRootLog(req, message)));
  },
  debug: (req, message) => {
    winston.loggers.get(LOG_TYPE.ROOT).debug(concatModelLog(modelRootLog(req, message)));
  },
  error: (req, message) => {
    winston.loggers.get(LOG_TYPE.ROOT).error(concatModelLog(modelRootLog(req, message)));
  },
};

/*
 New LOG Service
 FORMAT
 TIMESTAMP | IP | TRANSACTION | PIN | USER_STAMP | URL | METHOD/FUNCTION | HEADER | REQUEST_BODY | RESPONSE_STATUS | RESPONSE_BODY | RESPONSE_TIME
 */

const loggerService = (serviceName, req, url, method, header, reqBody, resStatus, resBody, startTime) => {
  const data = modelLogService(req, url, method, header, reqBody, resStatus, resBody, startTime);
  switch (serviceName) {
    case LOG_SERVICE_TYPE.ADMD:
      winston.loggers.get(LOG_SERVICE_TYPE.ADMD).info(concatModelLog(data));
      break;
    case LOG_SERVICE_TYPE.EMAIL:
      winston.loggers.get(LOG_SERVICE_TYPE.EMAIL).info(concatModelLog(data));
      break;
    default:
      break;
  }
};

const concatModelLog = (model) => {
  try {
    if (!model) {
      return '';
    }
    let tempModel = '';
    Object.keys(model).forEach((key) => {
      if (tempModel !== '') {
        tempModel = tempModel.concat(`|`);
      }
      let objectValue = model[key];

      if (!objectValue) {
        objectValue = '';
      } else if (objectValue && typeof objectValue === 'object') {
        if (Object.keys(objectValue).length > 0) {
          objectValue = JSON.stringify(objectValue);
        } else if (objectValue.stack) {
          objectValue = objectValue.stack;
        } else {
          objectValue = '';
        }
      }
      tempModel = tempModel.concat(`${objectValue}`);
    });
    return tempModel;
  } catch (e) {
    return '';
  }
};

const modelLogService = (req, url, method, header, reqBody, resStatus, resBody, startTime) => {
  return {
    TIMESTAMP: getTimestamp(),
    IP: req.connection ? req.connection.remoteAddress.split(':').pop() : req.ip.split(':').pop(),
    TRANSACTION: req.headers['transaction'] || '',
    PIN: req.userInfo ? req.userInfo.pin : '',
    USER_STAMP: req.userInfo ? req.userInfo.userStamp : '',
    URL: url !== undefined ? url : '',
    METHOD: method || '',
    HEADER: header || '',
    REQUEST_BODY: reqBody || '',
    RESPONSE_STATUS: resStatus || '',
    RESPONSE_BODY: resBody || '',
    RESPONSE_TIME: getResponseTime(startTime),
  };
};

const modelRootLog = (req, message) => {
  if (!req.headers) {
    message = req;
    req = undefined;
  }
  return {
    TIMESTAMP: getTimestamp(),
    TRANSACTION: req && req.headers['transaction'] ? req.headers['transaction'] : '',
    MESSAGE: message
  };
};

const getResponseTime = (startTime) => {
  return (Date.now() - startTime);
};

const getTimestamp = () => {
  return moment().format(DATE_FORMAT);
};

/**
 * ************
 * Module.exports *
 * ************
 */

module.exports = {
  logger,
  loggerService,
  counterHttpSuccess,
  counterHttpError
};
