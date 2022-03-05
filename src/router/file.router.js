const Router = require("koa-router");
const { avatarHandler } = require("../middleware/file.middleware");
const { saveAvatarInfo } = require("../controller/file.controller");
const { verifyAuthor } = require("../middleware/verifyLogin");
const fileRouter = new Router({ prefix: "/upload" });

fileRouter.post("/avatar", verifyAuthor, avatarHandler, saveAvatarInfo);

module.exports = fileRouter;
