const path = require("path");

const Multer = require("koa-multer");

const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");

const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
const avatarHandler = avatarUpload.single("avatar");

module.exports = {
  avatarHandler,
};
