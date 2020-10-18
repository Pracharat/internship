const constants = require('../config/constants');

const response = (res, responseObj) => {
  return res.status(changeFormatCode(responseObj.resultCode)).send(responseObj);
};

const responseError = (res, responseObj) => {
  return res.status(changeFormatCode(responseObj.resultCode)).send(responseObj);
};

const genResponseObj = (_language, _resultCode, _moreInfo, _resultData, _node) => {
  if (_language === undefined || _language === null) {
    _language = 'en';
  }
  const messageObj = constants.resCode[_resultCode] !== undefined ? constants.resCode[_resultCode] : constants.resCode[50000];
  const userMessage = messageObj[_language];
  const developerMessage = _resultCode === '20000' ? _moreInfo : `[${_node}] ${userMessage}`;
  const moreInfo = _resultCode === '20000' ? '' : _moreInfo;
  return {
    resultCode: _resultCode,
    developerMessage: developerMessage,
    userMessage: userMessage,
    moreInfo: moreInfo,
    resultData: _resultData,
  };
};

const changeFormatCode = (code) => {
  return parseInt(code.toString().substring(0, 3));
};

module.exports = {
  response,
  responseError,
  genResponseObj
};
