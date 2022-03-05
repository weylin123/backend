const crypto = require("crypto");

const handlerPassword = (password) => {
  const hash = crypto.createHash("md5");
  hash.update(password);
  const result = hash.digest("hex");
  return result;
};

module.exports = handlerPassword;
