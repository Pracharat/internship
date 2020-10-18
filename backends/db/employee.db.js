const { logger } = require('../utils/logger');
const model = require('../models/employee.model');
const { genResponseObj } = require('../errors');
const CONFIG = require('../config');

const insertOne = async (req, data) => {
  logger.info('employee.db insertOne');
  try {
    const employee = new model(data);
    await employee.validate();
    return await employee.collection.insertOne(data, { runValidators: true });
  } catch (error) {
    throw genResponseObj(req.get('x-language'), '50001', error, undefined, CONFIG.NODE);
  }
};

const updateOne = async (req, criteria, newData) => {
  logger.info('employee.db updateRole');
  const employee = new model();
  return await employee.collection.updateOne(criteria, { $set: newData }).then(result => {
    return result;
  }).catch(error => {
    // console.log(error);
    throw genResponseObj(req.get('x-language'), '50001', error, undefined, CONFIG.NODE);
  });
};

const deleteOne = async (req, criteria) => {
  logger.info('employee.db deleteOne');
  const employee = new model();
  return await employee.collection.deleteOne(criteria).then(result => {
    return result;
  }).catch(error => {
    throw genResponseObj(req.get('x-language'), '50001', error, undefined, CONFIG.NODE);
  });
};
module.exports = {
  insertOne,
  updateOne,
  deleteOne
};
