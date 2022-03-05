const { getUserByName } = require("../service/user.service");
const jwt = require("jsonwebtoken");
const md5password = require("../utils/password-handle");

const { publicKey } = require("../app/config");
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  //判断用户名是否为空
  if (!username || !password) {
    const err = new Error("name_or_password_is_required");
    return ctx.app.emit("error", err, ctx);
  }
  //判断用户是否存在
  const result = await getUserByName(username);
  const user = result[0];
  if (result[0].length === 0) {
    const err = new Error("user_does_not_exists");
    return ctx.app.emit("error", err, ctx);
  }
  // 判断密码和数据库中的密码是否一致(加密)
  const pwd = result[0].password;
  if (pwd !== md5password(password)) {
    const err = new Error("password_is_incorrent");
    return ctx.app.emit("error", err, ctx);
  }
  ctx.user = user;
  await next();
};

const verifyAuthor = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    console.log("ctx.user : ", ctx.user);
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = { verifyLogin, verifyAuthor };
