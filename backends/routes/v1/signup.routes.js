const { Router } = require('express');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const router = Router(); // Load router
const { logger, counterHttpError, counterHttpSuccess } = require('../../utils/logger');
// const controller = require('../../controllers/employee.controller');
// const validators = require('../../validators/employee.validators');
const { response, responseError } = require('../../errors');
logger.info('signup.routes loaded');

router.post("", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(200).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

module.exports = router;
