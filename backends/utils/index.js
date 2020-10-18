const _ = require('lodash');

const getNumberOrderNodeName = (name) => {
  const regex = /^-?\d+(\.(-?\d+))*/g;
  const found = name.match(regex)[0];
  const orderNumber = +found[found.length - 1];
  return orderNumber;
};

const snakeToCamelCaseListObj = (dataList) => {
  return dataList.map((dataObj) => {
    return snakeToCamelCaseObj(dataObj);
  });
};

const snakeToCamelCaseObj = (dataObj) => {
  const temp = {};
  Object.entries(dataObj).forEach(([key, value]) => {
    temp[_.camelCase(key)] = value;
  });
  return temp;
};

module.exports = {
  getNumberOrderNodeName,
  snakeToCamelCaseListObj,
  snakeToCamelCaseObj,
};
