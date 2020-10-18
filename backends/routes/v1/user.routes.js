const { Router } = require('express');
const router = Router(); // Load router
const { logger, counterHttpError, counterHttpSuccess } = require('../../utils/logger');
const { response, responseError } = require('../../errors');
const controller = require('../../controllers/user.controller');

logger.info('user.routes loaded');

router.post('',  async (req,res) => {
  try {
    logger.info('user.routes /post ');
    const resultResponse = await controller.userController(req);
    logger.info(resultResponse);
    counterHttpSuccess.inc();
    return response(res, resultResponse);
  } catch (e) {
    logger.error(e);
    counterHttpError.inc();
    return responseError(res, e);
  }
});


// router.post("", (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ username: req.body.username })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       fetchedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       const token = jwt.sign(
//         { username: fetchedUser.username, userId: fetchedUser._id },
//         "secret_this_should_be_longer",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         message: "login success",
//         token: token,
//         expiresIn: 3600,
//         userId: fetchedUser._id
//       });
//     })
//     .catch(err => {
//       return res.status(401).json({
//         message: "login fail"
//       });
//     });
// });

module.exports = router;
