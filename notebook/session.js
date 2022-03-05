const koa = require("koa");
const Router = require("koa-router");
const koaSession = require("koa-session");

const app = new koa();
//session 是基于cookie实现机制
const session = koaSession(
  {
    key: "sessionid", //cookiede key
    maxAge: 1000 * 1000, //过期时间
    httpOnly: true, //不允许通过js获取cookie
    rolling: true, //每次响应时,刷新session的有效期
    signed: true, //是否使用signed签名认证,防止数据篡改
  },
  app
);

const useRouter = new Router();

useRouter.get("/demo", (ctx, next) => {
  ctx.session.user = {
    id: 110,
    name: "weylin",
  };
  ctx.response.body = "session设置成功";
});

useRouter.get("/test", (ctx, next) => {
  const value = ctx.session.user;
  ctx.body = "获取session成功" + value.name;
});

app.use(session);
app.keys = ["11111111"];
app.use(useRouter.routes());
app.use(useRouter.allowedMethods());
app.listen(9600, () => {
  console.log("服务器在9600端口下运行");
});
