
const app=require('./src/app/index.js')


require('./src/app/database')

const {APP_PORT}= require('./src/app/config')
app.listen(APP_PORT,() => {
  console.log(`服务器在${APP_PORT}开始运行~ `)
})