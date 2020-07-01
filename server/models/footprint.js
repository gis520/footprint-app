/**
 * 足迹点 Model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footprintSchema = new Schema({
  country: String, // 国家
  city: String, // 城市
  place: String, // 景点地点名称
  travelDate: Array, // 旅游日期，是个区间（起始日期和终止日期）
  longitude: Number, // 经度
  latitude: Number, // 纬度
  description: String, // 描述信息
  photos: Array, // 照片url数组
  createTime: { type: Date, default: Date.now } // 数据新增时间
});

module.exports = mongoose.model("Footprint", footprintSchema);
