const { logger } = require("../utils/logger");
const model = require("../models/employee.model"); // import model
const dbCRUD = require("../db/employee.db"); // import insertOne,updateOne,deleteOne ...
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");
const mongoose = require("mongoose");

exports.getDataEmployee = async (req) => {
  logger.info("employee.services getDataEmployee");
  let criteria = {};
  const { _id } = req.query;
  if (_id) {
    criteria._id = _id;
  }
  const result = await model.find(criteria)
  if (result === null) {
    throw genResponseObj(req.get("x-language"), "40400", "get fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.insertDataEmployee = async (req) => {
  logger.info("employee.services insertDataEmployee");
  const { _id } = req.query;
  let id = mongoose.Types.ObjectId(_id);
  let criteria = {};
  if (_id) {
    criteria._id = _id;
  }
  const data = {
    pin: req.body.pin,
    firstname: req.body.firstname,
    lastname : req.body.lastname
  }
  const insertData = await dbCRUD.insertOne(req, data);
  const result = await model.find(criteria);
  if (insertData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "insert fail", undefined, CONFIG.NODE);
  }
  return result;
};

exports.updateDataEmployee = async (req) => {
  logger.info("employee.services updateDataEmployee");
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

exports.deleteDataEmployee = async (req) => {
  logger.info("employee.services deleteDataEmployee");
  const { _id } = req.query;
  let id = mongoose.Types.ObjectId(_id);
  const deleteData = await dbCRUD.deleteOne(req, { _id: id });
  if (deleteData === null) {
    throw genResponseObj(req.get("x-language"), "40400", "delete fail", undefined, CONFIG.NODE);
  }
  return true;
};
