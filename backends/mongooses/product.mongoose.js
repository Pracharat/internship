const mongoose = require('mongoose'); // Require mongoose
// const config = require('../../config/config'); // Require config
const escapere = require('escape-regexp');
const logger = require('../utils/logService');

const mongoServiceName = 'MONGO';
const ProductSchema = require('../models/purchase_order.model');
require('../models/apiConfig.model');

// const ProductSchema = mongoose.model('products');

module.exports = {

  getProductByCriteria(req, _criteria, _limit, sortObj) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductByCriteria');
        ProductSchema.find(_criteria, '_id productId productName'
          + ' productShortDesc productCategory productSubCategory'
          + ' productPublic status productImage productPriceDetail').sort(sortObj)
          .limit(_limit)
          .lean()
          .exec((err, res) => {
            logger.writeServiceLog(req, mongoServiceName, err, res, null, {
              customRequestUri: 'getProductByCriteria',
            }, startTime);
            if (err) {
              logger.error(req, 'getProductByCriteria  Failed! :', err);
              return reject(err);
            }
            if (res && res.length > 0) {
              return resolve(res);
            }
            return resolve(false);
          });
      } catch (err) {
        logger.error(req, 'product.getProductByCriteria Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  countIdProductByCriteria(req, _criteria, _limit, sortObj) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose countIdProductByCriteria');

        ProductSchema.aggregate([
          { $match: _criteria },
          { $sort: sortObj },
          { $limit: _limit },
        ])
          .exec((err, res) => {
            logger.writeServiceLog(req, mongoServiceName, err, res, null, {
              customRequestUri: 'countIdProductByCriteria',
            }, startTime);
            if (err) {
              logger.error(req, 'countIdProductByCriteria  Failed! :', err);
              return reject(err);
            }
            if (res && res.length > 0) {
              return resolve(res);
            }
            return resolve(false);
          });
      } catch (err) {
        logger.error(req, 'product.countIdProductByCriteria Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  countTotalProductByCriteria(req, _criteria) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose countTotalProductByCriteria');

        ProductSchema.aggregate([
          { $match: _criteria },
          { $group: { _id: null, total: { $sum: 1 } } },
          {
            $project: {
              _id: 0,
              total: 1,
            },
          },
        ]).exec((err, res) => {
          logger.writeServiceLog(req, mongoServiceName, err, res, null, {
            customRequestUri: 'countTotalProductByCriteria',
          }, startTime);
          if (err) {
            logger.error(req, 'countTotalProductByCriteria  Failed! :', err);
            return reject(err);
          }
          if (res && res.length > 0) {
            return resolve(res);
          }
          return resolve(false);
        });
      } catch (err) {
        logger.error(req, 'product.countTotalProductByCriteria Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  getProductCategory(req) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductCategory');
        ProductSchema.aggregate([
          {
            $group: {
              _id: { categoryName: '$productCategory.categoryName', categoryOrder: '$productCategory.categoryOrder' },
              productSubCategory: { $addToSet: '$productSubCategory' },
              productTotal: { $sum: 1 },
            },
          },
          {
            $sort: {
              '_id.categoryOrder': 1,
            },
          },
        ]).exec((err, res) => {
          logger.writeServiceLog(req, mongoServiceName, err, res, null, {
            customRequestUri: 'getProductCategory',
          }, startTime);
          if (err) {
            logger.error(req, 'getProductCategory  Failed! :', err);
            return reject(err);
          }
          if (res && res.length > 0) {
            return resolve(res);
          }
          return resolve(false);
        });
      } catch (err) {
        logger.error(req, 'product.getProductCategory Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  getProductGroupMerchant(req, criteria) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductGroupMerchant');
        ProductSchema.aggregate([
          { $match: criteria },
          {
            $group: {
              _id: '$productMerchant',
              productList: { $push: '$$ROOT' },
            },
          },
          {
            $sort: { 'productList.createdDate': -1 },
          },
        ]).exec((err, res) => {
          logger.writeServiceLog(req, mongoServiceName, err, res, null, {
            customRequestUri: 'getProductGroupMerchant',
          }, startTime);
          if (err) {
            logger.error(req, 'getProductGroupMerchant  Failed! :', err);
            return reject(err);
          }
          if (res && res.length > 0) {
            return resolve(res);
          }
          return resolve(false);
        });
      } catch (err) {
        logger.error(req, 'product.getProductGroupMerchant Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  getProductDetailById(req, id) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductDetailById');
        ProductSchema.find(id).populate('productApiConfiguration').lean()
          .exec((err, res) => {
            logger.writeServiceLog(req, mongoServiceName, err, res, null, {
              customRequestUri: 'getProductDetailById',
            }, startTime);
            if (err) {
              logger.error(req, 'getProductDetailById  Failed! :', err);
              return reject(err);
            }
            if (res && res.length > 0) {
              return resolve(res);
            }
            return resolve(false);
          });
      } catch (err) {
        logger.error(req, 'product.getProductDetailById Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  getProductDetailByIdList(req, id) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductDetailById');
        ProductSchema.find(id, '_id productId productName'
          + ' productShortDesc productCategory productSubCategory sku'
          + ' productPublic status productImage productPriceDetail'
          + ' productDescription productBrand productMerchant'
          + ' createdDate updatedDate').lean()
          .exec((err, res) => {
            logger.writeServiceLog(req, mongoServiceName, err, res, null, {
              customRequestUri: 'getProductDetailByIdList',
            }, startTime);
            if (err) {
              logger.error(req, 'getProductDetailByIdList  Failed! :', err);
              return reject(err);
            }
            if (res && res.length > 0) {
              return resolve(res);
            }
            return resolve(false);
          });
      } catch (err) {
        logger.error(req, 'product.getProductDetailByIdList Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  getProductCategoryFilter(req, criteria) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductCategoryFilter');
        ProductSchema.aggregate([
          { $match: criteria },
          {
            $group: {
              _id: null,
              productSubCategory: { $addToSet: '$productSubCategory' },
              productBrand: { $addToSet: '$productBrand' },
            },
          },
        ]).exec((err, res) => {
          logger.writeServiceLog(req, mongoServiceName, err, res, null, {
            customRequestUri: 'getProductCategoryFilter',
          }, startTime);
          if (err) {
            logger.error(req, 'getProductCategoryFilter  Failed! :', err);
            return reject(err);
          }
          if (res && res.length > 0) {
            return resolve(res);
          }
          return resolve(false);
        });
      } catch (err) {
        logger.error(req, 'product.getProductCategoryFilter Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  getProductCategoryFilterAll(req, criteria) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose getProductCategoryFilterAll');
        ProductSchema.aggregate([
          { $match: criteria },
          {
            $group: {
              _id: null,
              productBrand: { $addToSet: '$productBrand' },
            },
          },
        ]).exec((err, res) => {
          logger.writeServiceLog(req, mongoServiceName, err, res, null, {
            customRequestUri: 'getProductCategoryFilterAll',
          }, startTime);
          if (err) {
            logger.error(req, 'getProductCategoryFilterAll  Failed! :', err);
            return reject(err);
          }
          if (res && res.length > 0) {
            return resolve(res);
          }
          return resolve(false);
        });
      } catch (err) {
        logger.error(req, 'product.getProductCategoryFilterAll Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  addProduct(req, data) {
    return new Promise((resolve, reject) => {
      try {
        const startTime = Date.now();
        logger.info('product.mongoose addProduct');
        const productData = new ProductSchema(data);
        productData.save((err, res) => {
          logger.writeServiceLog(req, mongoServiceName, err, res, null, {
            customRequestUri: 'addProduct',
          }, startTime);
          if (err) {
            logger.error(req, 'addProduct  Failed! :', err);
            return reject(err);
          }
          return resolve(true);
        });
      } catch (err) {
        logger.error(req, 'product.addProduct Unhandled Exception: ', err);
        return reject(err);
      }
    });
  },

  updateProductStock: (req, _criteria, data) => new Promise((resolve, reject) => {
    try {
      const startTime = Date.now();
      logger.info('product.mongoose updateProductStock');
      ProductSchema.update(_criteria,
        { $set: data }).exec((err, res) => {
        logger.writeServiceLog(req, mongoServiceName, err, res, null, {
          customRequestUri: 'updateProductStock',
        }, startTime);
        if (err) {
          logger.error(req, 'updateProductStock  Failed! :', err);
          return reject(err);
        }
        if (res !== null && res.n !== 0) {
          return resolve(res);
        }
        return resolve(false);
      });
    } catch (err) {
      logger.error(req, 'product.updateProductStock Unhandled Exception: ', err);
      return reject(err);
    }
  }),
};
