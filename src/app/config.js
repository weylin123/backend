const dotenv = require("dotenv");

const fs = require("fs");
const path = require("path");

dotenv.config();

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const publicKey = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.privateKey = privateKey;
module.exports.publicKey = publicKey;
