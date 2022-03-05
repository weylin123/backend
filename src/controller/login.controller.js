const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");
const { privateKey, publicKey } = require("../app/config");

class loginController {
  login(ctx, next) {
    const { id, username } = ctx.user;
    const token = jwt.sign({ id, username }, privateKey, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });
    ctx.body = { id, username, token };
  }
  success(ctx, next) {
    ctx.body = "授权成功";
  }
}

module.exports = new loginController();
