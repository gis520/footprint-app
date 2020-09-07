/**
 * 足迹点 Controller
 */
const Footprint = require("../models/footprint");
const CommonResult = require("../common/commonResult");
const PageResult = require("../common/pageResult");
const PageInfo = require("../common/pageInfo");

/**
 * 分页查询足迹点
 * @param {Object} ctx
 */
async function pageList(ctx) {
  // ctx.request.body post 请求的参数在body中
  let { city = "", place = "", page = 1, size = 10 } = ctx.request.body;

  let query = Footprint.find({});
  let conditions = {};
  if (city !== "") {
    city = city.trim();
    query.where("city", city);
    conditions["city"] = city;
  }
  if (place) {
    place = place.trim();
    query.where("place", place);
    conditions["place"] = place;
  }
  // 每页大小
  query.skip((page - 1) * size);
  query.limit(size);
  try {
    // 计算分页数据
    const lists = await query.exec();

    // 计算数据总数
    const result = await Footprint.find(conditions);
    const totalPage = Math.ceil(result.length / size);
    const totalSize = result.length;

    const pageInfo = new PageInfo(
      page === 1,
      page === totalPage,
      page,
      size,
      totalPage,
      totalSize
    );
    const pageResult = new PageResult(2000, "查询成功", lists, pageInfo);

    ctx.body = pageResult;
  } catch (e) {
    const pageResult = new PageResult(5000, "查询失败", [], {});
    ctx.body = pageResult;
  }
}

/**
 * 新增足迹点
 * @param {Object} ctx
 */
async function add(ctx) {
  // ctx.request.body 获取post请求的参数
  let {
    country = "中国",
    city,
    place,
    travelDate,
    longitude,
    latitude,
    description,
    photos = []
  } = ctx.request.body;
  if (!longitude || !latitude) {
    ctx.body = new CommonResult(4000, "经纬度不能为空", null);
    return;
  }
  // 创建足迹点
  let point = await Footprint.create({
    country,
    city,
    place,
    travelDate,
    longitude,
    latitude,
    description,
    photos
  });

  if (point) {
    ctx.body = new CommonResult(2000, "创建成功", point);
  } else {
    ctx.body == new CommonResult(5000, "创建失败", null);
  }
}

/**
 * 编辑足迹点
 * @param {Object} ctx
 */
async function edit(ctx) {
  let {
    _id,
    country = "中国",
    city,
    place,
    travelDate,
    longitude,
    latitude,
    description,
    photos = []
  } = ctx.request.body;
  if (!longitude || !latitude) {
    ctx.body = new CommonResult(4000, "经纬度不能为空", null);
    return;
  }
  let point = await Footprint.findById(_id);

  Object.assign(point, {
    country,
    city,
    place,
    travelDate,
    longitude,
    latitude,
    description,
    photos
  });
  try {
    const res = await point.save();
    // console.log(res);
    ctx.body = new CommonResult(2000, "保存成功", point);
  } catch (err) {
    console.log(err);
    ctx.body == new CommonResult(5000, "保存失败", null);
  }
}

async function del(ctx) {
  const { _id } = ctx.request.body;
  try {
    const res = await Footprint.deleteOne({ id: _id });
    ctx.body = new CommonResult(2000, "删除成功", res);
  } catch (err) {
    console.log(err);
    ctx.body == new CommonResult(5000, "删除失败", null);
  }
}
module.exports = { pageList, add, edit, del };
