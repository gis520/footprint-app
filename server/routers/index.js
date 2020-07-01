const Router = require("koa-router");
const { getUsers, pageUserList, signup } = require("../controller/user");
const footprintCtrl = require("../controller/footprint");

const router = new Router();

// 获取用户列表 请求方式为get
router.get("/user/list", getUsers);
// 用户注册，post
router.post("/signup", signup);
// 分页查询用户
router.post("/user/pageUserList", pageUserList);
// 足迹点管理
// 分页查询足迹点
router.post("/footprint/pageList", footprintCtrl.pageList);
// 新增足迹点
router.post("/footprint/add", footprintCtrl.add);

module.exports = router;
