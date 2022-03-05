const handlerPassword = require("../utils/handlerPassword");
const connecttion = require("../app/database");

const register = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const pwd = handlerPassword(password);
  var statement = `INSERT INTO user (username,password) 
  VALUES (?,?);`;
  connecttion.query(statement, [username, pwd], (err) => {
    if (err) console.log(err);
  });
  ctx.body = "注册成功";
  ctx.status = 200;
};

module.exports = register;
