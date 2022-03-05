const fs = require("fs");

const routers = function () {
  fs.readdirSync(__dirname).forEach((item, index) => {
    if (item === "index.js") return;
    let route = require(`./${item}`);
    this.use(route.routes());
    this.use(route.allowedMethods());
  });
};

module.exports = routers;
