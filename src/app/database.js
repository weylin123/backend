

const mysql=require('mysql2')
const { 
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD} =require('./config.js')


const connection= mysql.createConnection({
  host:MYSQL_HOST,
  database:MYSQL_DATABASE,
  user:MYSQL_USER,
  password:MYSQL_PASSWORD,
  prot:MYSQL_PORT
})

connection.connect((err) => {
  if(err) throw err;
  console.log('数据库连接成功~')
  
}) 
module.exports=connection.promise()