const { logger } = require("../utils/logger");
const { genResponseObj } = require("../errors");
const CONFIG = require("../config");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const MenuList = require("../models/menuList.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.loginUser = async req => {
  logger.info("user.services loginUser");
  let fetchedUser;

  const userLogin = await User.findOne({ username: req.body.username })
  .then(users => {
    if (!users) {
      throw genResponseObj(req.get("x-language"),"40100","Wrong password. Try again",undefined,CONFIG.NODE);
    }
    return users.roleList
  });

  const roleLists = await Role.findOne({ _id: mongoose.Types.ObjectId(userLogin) })
  .then(role => {
    if (!role) {
      throw genResponseObj(req.get("x-language"),"40100","roleLists not found",undefined,CONFIG.NODE);
    }
    return role
  });

  const findMenuList = await MenuList.find().where('_id').in(roleLists.menuList).exec();
  const menuLists = findMenuList.map(value => ({
    text: value.text,
    children: value.children,
    menuId: value._id
  }));

  const roles = {
    name: roleLists.name,
    roleId: roleLists._id
  };

  const login = await User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        throw genResponseObj(req.get("x-language"),"40100","find username failed",undefined, CONFIG.NODE);
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })

    .then(result => {
      if (!result) {
        throw genResponseObj(req.get("x-language"),"40100","then result failed",undefined,CONFIG.NODE);
      }
      const token = jwt.sign(
        { username: fetchedUser.username, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      const data = {
        userId: fetchedUser._id,
        username: fetchedUser.username,
        roleNameList: roles,
        menuList: menuLists
        // token: token,
        // expiresIn: 3600
      };
      return genResponseObj(req.get("x-language"),"20000","login success", data, CONFIG.NODE);
    })
    .catch(err => {
      // console.log(err);
      return genResponseObj(req.get("x-language"),"40100","Wrong password. Try again",undefined,CONFIG.NODE);
    });
  return login;
};
