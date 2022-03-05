const koa = require("koa");
const Router = require("koa-router");

const app = new koa();

const useRouter = new Router({ prefix: "/users" });

useRouter.get("/", (ctx, next) => {
  ctx.cookies.set("name", "weylin", {
    maxAge: 1000 * 1000,
  });
  ctx.response.body = "cookie设置成功";
});

useRouter.get("/test", (ctx, next) => {
  const value = ctx.cookies.get("name");
  ctx.body = "获取cookie成功" + value;
});

app.use(useRouter.routes());
app.use(useRouter.allowedMethods());
app.listen(9600, () => {
  console.log("服务器在9600端口下运行");
});
