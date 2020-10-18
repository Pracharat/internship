const escapere = require('escape-regexp');
// const mongoose = require('mongoose'); // Require mongoose
const _ = require('lodash');
const logger = require('../utils/logService');
const applicationUtils = require('../utils/applicationUtils');
const config = require('../config/env/dev'); // Load config (environment)
const productMongoose = require('../mongooses/product.mongoose');

const { node } = config.response;

exports.products = async (req) => {
  try {
    logger.info('product.service get Products');
    if (req.query.category === undefined || req.query.limit === undefined || req.query.page === undefined
      || req.query.sort === undefined || req.query.order === undefined) {
      return applicationUtils.genResponseObj(req.get('x-language'), '40002', 'Parameter category, page, limit, sort or order is mandatory', node);
    }
    if (req.query.category && req.query.limit && req.query.page && req.query.sort && req.query.order) {
      const {
        category, sort, order, page, limit, subcategory, brand,
      } = req.query;
      let { keyword } = req.query;
      const limitCount = ((parseInt(page, 0) - 1) * parseInt(limit, 0));
      const response = {
        products: [],
        productTotal: '',
      };
      const sortObj = {};
      if (order) {
        if (order.toLowerCase() === 'asc') {
          sortObj[sort] = 1;
          sortObj._id = 1;
        } else {
          sortObj[sort] = -1;
          sortObj._id = -1;
        }
      } else {
        sortObj[sort] = 1;
        sortObj._id = 1;
      }
      if (keyword) {
        keyword = keyword.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }
      const criteria = {};
      if (category !== 'All') {
        criteria['productCategory.categoryName'] = category;
      }
      if (subcategory !== undefined) {
        criteria['productSubCategory.subCategoryName'] = {
          $in: subcategory.split(','),
        };
      }
      if (brand !== undefined) {
        criteria.productBrand = {
          $in: brand.split(','),
        };
      }

      if (keyword !== undefined) {
        criteria.productName = {
          $regex: keyword || '',
          $options: 'i',
        };
      }
      try {
        const countTotalProduct = await productMongoose.countTotalProductByCriteria(req, criteria);
        response.productTotal = countTotalProduct.length > 0 ? countTotalProduct[0].total : 1;
        if (page > 1) {
          const countIdProduct = await productMongoose.countIdProductByCriteria(req, criteria, limitCount, sortObj);
          const lastData = countIdProduct.length > 1 ? countIdProduct[countIdProduct.length - 1] : false;
          if (lastData) {
            if (sort !== '_id') {
              const tempCriteria = {};
              tempCriteria[sort] = order.toLowerCase() === 'asc' ? { $gt: lastData[sort] } : { $lt: lastData[sort] };
              const tempCriteria1 = {};
              tempCriteria1._id = order.toLowerCase() === 'asc' ? { $gt: lastData._id } : { $lt: lastData._id };
              tempCriteria1[sort] = lastData[sort];
              criteria.$or = [tempCriteria, tempCriteria1];
            } else {
              criteria._id = order.toLowerCase() === 'asc' ? { $gt: lastData._id } : { $lt: lastData._id };
            }
          }
        }
        const product = await productMongoose.getProductByCriteria(req, criteria, parseInt(limit, 0), sortObj);
        if (!product) {
          return applicationUtils.genResponseObj(req.get('x-language'), '20400', 'Data not found', node);
        }
        response.products = product;
      } catch (err) {
        return applicationUtils.genResponseObj(req.get('x-language'), '50001', err, `${node}-DB`);
      }
      return applicationUtils.genResponseObj(req.get('x-language'), '20000', 'Query product success', node, response);
    }
    return applicationUtils.genResponseObj(req.get('x-language'), '40002', 'Parameter type, page, limit, sort or order is mandatory', node);
  } catch (err) {
    logger.error(req, 'product.service get Products Unhandled Exception: ', err);
    return applicationUtils.genResponseObj(req.get('x-language'), '50000', err, node);
  }
};

exports.getProductDetail = async (req) => {
  try {
    logger.info('product.service getProductDetail');
    if (req.param('productRefId') === undefined) {
      return applicationUtils.genResponseObj(req.get('x-language'), '40002', 'Parameter type, page, limit, sort or order is mandatory', node);
    }
    if (req.param('productRefId')) {
      let product = {};
      try {
        const productRefId = { _id: req.param('productRefId') };
        product = await productMongoose.getProductDetailById(req, productRefId);
        if (!product) {
          return applicationUtils.genResponseObj(req.get('x-language'), '20400', 'Data not found', node);
        }
      } catch (err) {
        return applicationUtils.genResponseObj(req.get('x-language'), '50001', err, `${node}-DB`);
      }
      return applicationUtils.genResponseObj(req.get('x-language'), '20000', 'Query product detail success', node, product[0]);
    }
    return applicationUtils.genResponseObj(req.get('x-language'), '40002', 'Parameter type, page, limit, sort or order is mandatory', node);
  } catch (err) {
    logger.error(req, 'product.service getProductDetail Unhandled Exception: ', err);
    return applicationUtils.genResponseObj(req.get('x-language'), '50000', err, node);
  }
};

exports.productCategory = async (req) => {
  try {
    logger.info('product.service productCategory');
    const product = await productMongoose.getProductCategory(req);
    if (!product) {
      return applicationUtils.genResponseObj(req.get('x-language'), '20400', 'Data not found', node);
    }
    const response = [];
    product.forEach((data) => {
      const temp = {
        productCategory: data._id.categoryName,
        productSubCategory: _.sortBy(data.productSubCategory, 'subCategoryOrder').map(data => (data.subCategoryName)),
        productTotal: data.productTotal,
      };
      if (data._id !== null) {
        response.push(temp);
      }
    });
    return applicationUtils.genResponseObj(req.get('x-language'), '20000', 'Query product success', node, response);
  } catch (err) {
    logger.error(req, 'product.service productCategory Unhandled Exception: ', err);
    return applicationUtils.genResponseObj(req.get('x-language'), '50000', err, node);
  }
};

exports.addProduct = async (req) => {
  try {
    logger.info('product.service addProduct');
    try {
      const criteria = {};
      const data = req.body;
      criteria.productName = {
        $regex: new RegExp(`^${escapere(data.productName)}$`),
        $options: 'i',
      };
      const product = await productMongoose.getProductByCriteria(req, criteria, 1, { _id: 1 });
      if (product) {
        return applicationUtils.genResponseObj(req.get('x-language'), '40004', 'product is Duplicate', node);
      }
      data.createdBy = req.get('x-user-request');
      await productMongoose.addProduct(req, data);
    } catch (err) {
      return applicationUtils.genResponseObj(req.get('x-language'), '50001', err, `${node}-DB`);
    }
    return applicationUtils.genResponseObj(req.get('x-language'), '20000', 'Add product success', node);
  } catch (err) {
    logger.error(req, 'product.service addProduct Unhandled Exception: ', err);
    return applicationUtils.genResponseObj(req.get('x-language'), '50000', err, node);
  }
};

exports.productFilter = async (req) => {
  try {
    logger.info('product.service productFilter');
    const { category, subcategory } = req.query;
    if (category === undefined) {
      return applicationUtils.genResponseObj(req.get('x-language'), '40002', 'Parameter category, page, limit, sort or order is mandatory', node);
    }
    let product;

    if (category === 'All') {
      product = await productMongoose.getProductCategoryFilterAll(req, {});
    } else {
      const criteria = { 'productCategory.categoryName': category };
      if (subcategory !== undefined) {
        criteria['productSubCategory.subCategoryName'] = subcategory;
      }
      product = await productMongoose.getProductCategoryFilter(req, criteria);
    }
    if (!product) {
      return applicationUtils.genResponseObj(req.get('x-language'), '20400', 'Data not found', node);
    }
    const productRes = {};
    if (category !== 'All') {
      productRes.productSubCategory = _.sortBy(product[0].productSubCategory, 'subCategoryOrder').map(data => (data.subCategoryName));
    }
    productRes.productBrand = _.sortBy(product[0].productBrand);
    return applicationUtils.genResponseObj(req.get('x-language'), '20000', 'Query product success', node, productRes);
  } catch (err) {
    logger.error(req, 'product.service productFilter Unhandled Exception: ', err);
    return applicationUtils.genResponseObj(req.get('x-language'), '50000', err, node);
  }
};
