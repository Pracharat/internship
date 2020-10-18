const { logger } = require('../utils/logger');
const model = require('../models/toeic_detail.model');
const { genResponseObj } = require('../errors');
const CONFIG = require('../config');

const insertOne = async (req, data) => {
  logger.info('toeic_detail.db insertOne');
  try {
    const toeic_detail = new model(data);
    await toeic_detail.validate();
    return await toeic_detail.collection.insertOne(data, { runValidators: true }).then(result => {
      return result;
    });
  } catch (error) {
    throw genResponseObj(req.get('x-language'), '50001', error, undefined, CONFIG.NODE);
  }
};

const updateOne = async (req, criteria, newData) => {
  logger.info('toeic_detail.db updateRole');
  const toeic_detail = new model();
  return await toeic_detail.collection.updateOne(criteria, { $set: newData }).then(result => {
    return result;
  }).catch(error => {
    console.log(error);
    throw genResponseObj(req.get('x-language'), '50001', error, undefined, CONFIG.NODE);
  });
};

const deleteOne = async (req, criteria) => {
  logger.info('toeic_detail.db deleteOne');
  const toeic_detail = new model();
  return await toeic_detail.collection.deleteOne(criteria).then(result => {
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
