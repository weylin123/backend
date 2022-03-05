const koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const fs = require('fs')

//生成秘钥命令
/* 
openssl genrsa -out private.key 1024
openssl rsa -in private.key -pubout -out public.key
*/


const app = new koa()
const useRouter = new Router()

useRouter.get('/demo', (ctx, next) => {
  const user = {
    id: 110,
    name: 'weylin'
  }
  const privateKey = fs.readFileSync('./private.key')
  //私钥加密
  const token = jwt.sign(user, privateKey, { expiresIn: 100, algorithm: 'RS256' })
  ctx.body = token
})

useRouter.get('/test', (ctx, next) => {
  try {
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    const publicKey = fs.readFileSync('./public.key')
    //公钥解密
    const result = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    ctx.body = result
  } catch (err) {
    console.log(err)
    ctx.body = err.messsage
  }
})

app.use(useRouter.routes())
app.use(useRouter.allowedMethods())
app.listen(9600, () => {
  console.log('服务器在9600端口下运行')
})