const koa= require('koa')
const bodyParse= require('koa-bodyparser')
const dotenv=require('dotenv')
const router= require('../router/index')
const errhandle= require('./error-handle')

const app= new koa()
dotenv.config()
app.use(bodyParse())
app.routers= router
app.routers()

app.on('error',errhandle)
module.exports=app