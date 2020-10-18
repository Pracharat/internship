const { response, responseError, genResponseObj } = require('../errors');
const CONFIG = require('../config');
const Joi = require('@hapi/joi');

const employeeSchema = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      pin: Joi.number().error((err) => {
        throw `pin is required`;
      }),
      firstname: Joi.string().required().error((err) => {
        throw `firstname is required`;
      }),
      lastname: Joi.string().required().error((err) => {
        throw `lastname is required`;
      })
    });
    const result = schema.validate(req.body);
    if (result) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    responseError(res, genResponseObj(req.get('x-language'), '40000', e, undefined, CONFIG.NODE));
  }
};

module.exports = {
  employeeSchema
};
