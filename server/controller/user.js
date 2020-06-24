const User = require("../models/user");
const PageResult = require("../common/pageResult");
const PageInfo = require("../common/pageInfo");

/**
 * 分页查询用户
 * @param {Object} ctx
 */
async function pageUserList(ctx) {
  // ctx.request.body post 请求的参数在body中
  let { username = "", page = 1, size = 10 } = ctx.request.body;

  let query = User.find({});
  let conditions = {};
  if (username !== "") {
    query.where("username", username);
    conditions["username"] = username;
  }
  // 每页大小
  query.skip((page - 1) * size);
  query.limit(size);
  try {
    // 计算分页数据
    const lists = await query.exec();

    // 计算数据总数

    const result = await User.find(conditions);
    const totalPage = Math.ceil(result.length / size);
    const totalSize = result.length;
    // jsonArray = { data: lists, pages, total: result.length, isVisitor };
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
 * 查询用户
 * @param {Object} ctx
 */
async function getUsers(ctx) {
  // ctx.request.query 获取get请求的参数
  let { username } = ctx.request.query;
  let lists = [];
  if (username) {
    lists = await User.find({ username }); // 查询用户名为username的用户
  } else {
    lists = await User.find(); // 返回查到的所有用户数据
  }

  ctx.body = {
    status: 200,
    data: lists
  };
}

/**
 * 注册用户
 * @param {Object} ctx
 */
async function signup(ctx) {
  // ctx.request.body 获取post请求的参数
  let { username, password, email } = ctx.request.body;

  // 查找数据库中是否存在该用户
  let user = await User.find({ username });
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: "该用户，已被注册"
    };
    return;
  }
  // 创建新用户
  let nuser = await User.create({
    username,
    password,
    email
  });

  if (nuser) {
    ctx.body = {
      status: 200,
      data: { username, email },
      msg: "注册成功"
    };
  } else {
    ctx.body = {
      status: 0,
      msg: "注册失败"
    };
  }
}

module.exports = { getUsers, signup, pageUserList };
