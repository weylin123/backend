const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  database: "mine",
  user: "root",
  password: "weylin123",
});
const statement = "SELECT * FROM products WHERE price>? and brand=?;";

// connection.execute(statement,[100,'华为'],(err,result) => {
//   if (err){
//     console.log('数据库连接失败')
//     return
//   }
//   console.log(result)
// })
connection
  .promise()
  .execute(statement, [100, "华为"])
  .then(([results, fields]) => {
    console.log(results);
  });
