const {logger} = require("../utils/logger");
const model = require("../models/toeic_detail.model");
const dbCRUD = require("../db/toeic_detail.db");
const {genResponseObj} = require("../errors");
const CONFIG = require("../config");
const mongoose = require("mongoose");

exports.getDataToeicDetail = async (req) => {
  logger.info("toeic_detail.services getDataToeicDetail");
  let criteria = {};
  const {_id, page, limit} = req.query;
  if (_id) {
    criteria._id = _id;
  }
  const offset = page && parseInt(page) - 1 >= 1 ? parseInt(page) - 1 : 0;
  const result = await model
    .find(criteria)
    .skip(parseInt(limit) * offset)
    .limit(parseInt(limit));
  if (result === null) {
    throw genResponseObj(req.get("x-language"), "40400", "get fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.insertDataToeicDetail = async (req) => {
  logger.info("toeic_detail.services insertDataToeicDetail");
  const {_id} = req.query;
  let criteria = {};
  if (_id) {
    criteria._id = _id;
  }
  const data = {
    employee: {
      _id: mongoose.Types.ObjectId(req.body.employee._id),
      pin: req.body.employee.pin,
      firstname: req.body.employee.firstname,
      lastname: req.body.employee.lastname
    },
    requestId: mongoose.Types.ObjectId(req.body.employee._id),
    receiptNo: req.body.receiptNo,
    receiptDate: req.body.receiptDate,
    receiptFile: {
      _id: mongoose.Types.ObjectId(req.body.receiptFile._id),
      filename: req.body.receiptFile.filename,
      receiptFile: req.body.receiptFile.receiptFile,
    },
    receiptAmount: req.body.receiptAmount,
    amountWithdrawn: req.body.amountWithdrawn,
    remark: req.body.remark
  }
  const insertData = await dbCRUD.insertOne(req, data);
  const result = await model.find(criteria);
  if (insertData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "insert fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.updateDataToeicDetail = async (req) => {
  logger.info("toeic_detail.services updateDataToeicDetail");
  const {_id} = req.query;
  let id = mongoose.Types.ObjectId(_id);
  let criteria = {};
  if (_id) {
    criteria._id = _id;
  }
  const updateData = await dbCRUD.updateOne(req, {_id: id}, req.body);
  const result = await model.find(criteria);
  if (updateData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "update fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.deleteDataToeicDetail = async (req) => {
  logger.info("toeic_detail.services deleteDataToeicDetail");
  const {_id} = req.query;
  let id = mongoose.Types.ObjectId(_id);
  const deleteData = await dbCRUD.deleteOne(req, {_id: id});
  if (deleteData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "delete fail", undefined, CONFIG.NODE);
  }
  return true;
};
