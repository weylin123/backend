

const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')
const { Buffer } = require('buffer')
/*路径拼接*/
// const basepath= './abc'
// const filename='/weylin.js'
// console.log(path.join(basepath,filename))
// console.log(path.join(__dirname,filename))

/* 读取文件信息 */
// const info = fs.statSync('./abc.txt')
// console.log(info)
// fs.stat('./abc.txt',(err,info) => {
//   if (err) return 
//   console.log(info)
// })
// fs.promises.stat('./abc.txt').then((info) => {
//   console.log(info) 
// }).catch((err) => {
//   console.log(err)
// })

/* 文件描述符 */
// fs.open('./abc.txt',(err,fd) => {
//  if(err) {
//    console.log(err)
//    return
//  }
//  fs.fstat(fd,(err,info)=>{
//    console.log(info)
//  })
// })

/* 文件的读写 */
// const content ='很多年后,我才明白,放不开的是我'
// fs.writeFile('./abc.txt',content,{flag:'a'},(err,info) => {
//   console.log(err)
// })

// fs.readFile('./abc.txt',{encoding:'utf-8'},(err,date) => {
//   console.log(date)
// })

/* 创建文件夹 */
//  const dirname='./mine'
//  if(!fs.existsSync(dirname)){
//    fs.mkdir(dirname,(err) => {
//      console.log(err)
//    })
//  }

// fs.readdir(dirname,(err,files) => {
//   console.log(files)

// })
// fs.rename('./mine','mty',(err) => {
//   console.log(err)
// })

/*事件*/
// const emitter = new EventEmitter()
// emitter.on('click',(arg1,arg2) => {
//   console.log('事件1',arg1,arg2)
// })
// emitter.on('click',(arg1,arg2) => {
//   console.log('事件2',arg1,arg2)
// })
// const listen=() => {
//   console.log('这个移除事件')
// }
// emitter.on('click',listen) //这个事件被移除不执行
// setTimeout(() => {
//   emitter.emit('click','hello','world')
//   // emitter.off('click',listen)
//   emitter.emit('click','haha')
// }, 1000);

/*buffer*/
// const buffer1= new Buffer('hello')
// console.log('buffer1: ', buffer1);
// 默认编码utf-8
// const buffer2= Buffer.from('吴忆强')
// console.log('buffer2: ', buffer2);
// const buffer3=Buffer.from('吴忆强','utf16le')
// console.log('buffer3: ', buffer3);
// const buffer4=Buffer.alloc(8)
// console.log('buffer4: ', buffer4);
/* buffer和文件的读写 */
// fs.readFile('./abc.txt',(err,data) => {
//   console.log(data)
//   console.log(data.toString())
// })
// fs.readFile('./1.jpg',(err,data) => {
//   console.log(data)
// })


// 创建一个web服务器

const http = require('http')
const url = require('url')
const qs = require('querystring')
const server = http.createServer((req, res) => {
  // console.log(req.url)
  // const {pathname,query}=url.parse(req.url)
  // console.log('query: ', query);
  // console.log('pathname: ', pathname);
  // const { username, password } = qs.parse(query);
  // console.log('username: ', username);
  // res.end("Hello Server");
  //--------------------------------------
  // const {pathname}=url.parse(req.url)
  // req.setEncoding('utf-8')
  // req.on('data',(data) => {
  //   const {username,password}= JSON.parse(data)
  //   console.log('password: ', password);
  //   console.log('username: ', username);
  // })
  // req.on('end',() => {
  //   console.log('传输结束')
  // })
  // console.log(req.headers)
  // res.writeHead(200, {
  //   "Content-Type": "text/html;charset=utf8"
  // });
  // res.end("<h2>Hello Server</h2>");
  //文件上传--------------------------------------------
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      req.setEncoding('binary')
      let body = ''
      const totalBoundary= req.headers['content-type'].split(';')[1]
      const boundary= totalBoundary.split('=')[1]
      req.on('data', (data) => {
        body += data
      })
      req.on('end', () => {
        // console.log(body)
        const payload = qs.parse(body, '\r\n', ":")
        console.log('payload: ', payload);
        const type = payload['Content-Type']
        console.log('type: ', type);
        const typeIndex= body.indexOf(type)
        console.log('typeIndex: ', typeIndex);
        const typeLength=type.length
        let imageData= body.substring(typeIndex+typeLength)
        imageData= imageData.replace(/^\s\s*/,'')
        imageData= imageData.substring(0,imageData.indexOf(`--${boundary}--`))
        fs.writeFile('./foo.png',imageData,'binary',(err) => {
          res.end('文件上传成功')
        })
      })
    }
  }

});

// 启动服务器,并且制定端口号和主机
server.listen(9500, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});

