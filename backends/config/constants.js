const { resMessage } = require('./message.properties');

module.exports = {

  resCode: {
    20000: resMessage.common.success,
    40000: resMessage.authentication.invalidData,
    40100: resMessage.authentication.unAuthorized,
    40300: resMessage.authentication.forbidden,
    40400: resMessage.authentication.notFound,
    40401: resMessage.common.notFound,
    50000: resMessage.common.error,
    50001: resMessage.db.databaseError,
    50002: resMessage.db.connectionFail,
  },

};
