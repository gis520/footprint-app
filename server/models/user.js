const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 定义用户模型
const userSchema = new Schema({
  username: String, // 用户名
  password: String, // 密码
  status: Number, // 状态
  email: String, // 邮箱
  created: { type: Date, default: Date.now } // 创建时间
});

module.exports = mongoose.model("Users", userSchema);
