const mongoose = require("mongoose");

const dburl = "mongodb://127.0.0.1:27017/admin"; // admin 代表数据库名称
// const dburl = "mongodb://admin:123456@127.0.0.1:27017/footprints"; // footprints 代表数据库名称

// 链接 MongoDB 数据库
const db = mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    authdb: "admin",
    user: "webgis",
    password: "giscafer"
  }
});
// const db = mongoose.connect(dburl);
// 链接成功
mongoose.connection.on("connected", function() {
  console.log("MongoDB connected success");
});
// 链接失败
mongoose.connection.on("error", function() {
  console.log("MongoDB connected error");
});
// 断开了
mongoose.connection.on("disconnected", function() {
  console.log("MongoDB connected disconnected");
});

module.exports = db;
