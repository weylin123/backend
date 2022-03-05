const useRouter = require("koa-router");
const { verifyLogin } = require("../middleware/verifyLogin");

const { login } = require("../controller/login.controller");

const userRouter = new useRouter({ prefix: "/login" });

userRouter.post("/", verifyLogin, login);

module.exports = userRouter;
