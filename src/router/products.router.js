const koaRouter = require("koa-router");
const { verifyAuthor } = require("../middleware/verifyLogin");

const productRouter = new koaRouter({ prefix: "/products" });

productRouter.get("/", verifyAuthor);

module.exports = productRouter;
