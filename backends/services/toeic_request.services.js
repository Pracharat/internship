const { logger } = require("../utils/logger");
const model = require("../models/toeic_request.model");
const dbCRUD = require("../db/toeic_request.db");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");
const mongoose = require("mongoose");

exports.getDataToeicRequest = async (req) => {
  logger.info("toeic_request.services getDataToeicRequest");
  const result = await model.find()
  if (result === null) {
    throw genResponseObj(req.get("x-language"), "40400", "get fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.insertDataToeicRequest = async (req) => {
  logger.info("toeic_request.services insertDataToeicRequest");
  const { _id } = req.query;
  let id = mongoose.Types.ObjectId(_id);
  let criteria = {};
  if (_id) {
    criteria._id = _id;
  }
  const insertData = await dbCRUD.insertOne(req, req.body);
  const result = await model.find(criteria);
  if (insertData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "insert fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.updateDataToeicRequest = async (req) => {
  logger.info("toeic_request.services updateDataToeicRequest");
  const { _id } = req.query;
  let id = mongoose.Types.ObjectId(_id);
  let criteria = {};
  if (_id) {
    criteria._id = _id;
  }
  const updateData = await dbCRUD.updateOne(req, { _id: id }, req.body);
  const result = await model.find(criteria);
  if (updateData === null) {
    throw genResponseObj(req.get("x-language"),"40400","update fail",undefined, CONFIG.NODE);
  }
  return result;
};

exports.deleteDataToeicRequest = async (req) => {
  logger.info("toeic_request.services deleteDataToeicRequest");
  const { _id } = req.query;
  let id = mongoose.Types.ObjectId(_id);
  const deleteData = await dbCRUD.deleteOne(req, { _id: id });
  if (deleteData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "delete fail", undefined, CONFIG.NODE);
  }
  return true;
};
