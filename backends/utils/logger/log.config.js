const moment = require('moment');
const winston = require('winston');
const { LOG } = require('../../config');
const { format } = winston;
const { combine } = format;

require('winston-daily-rotate-file');

const LOG_TYPE = {
  ROOT: 'root',
  DATABASE: 'database',
  SERVICE: 'service',
};

const LOG_SERVICE_TYPE = {
  ADMD: 'admd',
  EMAIL: 'email',
};

const ROOT_LOG_PATH = `${LOG.ROOT_PATH}/${LOG_TYPE.ROOT}`;
const DATABASE_LOG_PATH = `${LOG.ROOT_PATH}/${LOG_TYPE.DATABASE}`;
const SERVICE_ADMD_PATH = `${LOG.ROOT_PATH}/${LOG_TYPE.SERVICE}/${LOG_SERVICE_TYPE.ADMD}`;
const SERVICE_EMAIL_PATH = `${LOG.ROOT_PATH}/${LOG_TYPE.SERVICE}/${LOG_SERVICE_TYPE.EMAIL}`;

const ignorePrivate = format((info) => {
  if (info.private) {
    return false;
  }
  return info;
});

const getDailyRotateConfig = (
  filename,
  level = LOG.FILE_LEVEL,
  datePattern = 'YYYYMMDDHHmm',
) => {
  return {
    timestamp: () => {
      return moment();
    },
    filename,
    datePattern,
    level,
    handleExceptions: true,
    frequency: '15m',
    maxSize: '10m',
  };
};

const addLogger = (path, fileName) => {
  const lowerCaseFileName = fileName.toString().toLowerCase();
  winston.loggers.add(fileName, {
    format: combine(
      ignorePrivate(),
      // winston.format.align(),
      winston.format.printf((info) => `${info.message}`),
    ),
    transports: [
      new winston.transports.DailyRotateFile(
        getDailyRotateConfig(
          `${path}/${LOG.NAME}_${lowerCaseFileName}_%DATE%.log`,
        ),
      ),
      new winston.transports.Console({
        level: LOG.CONSOLE_LEVEL,
        handleExceptions: true,
        json: false,
        colorize: true,
      }),
    ],
  });
};

addLogger(ROOT_LOG_PATH, LOG_TYPE.ROOT);
addLogger(DATABASE_LOG_PATH, LOG_TYPE.DATABASE);

addLogger(SERVICE_ADMD_PATH, LOG_SERVICE_TYPE.ADMD);
addLogger(SERVICE_EMAIL_PATH, LOG_SERVICE_TYPE.EMAIL);

module.exports = {
  LOG_TYPE,
  LOG_SERVICE_TYPE
};
