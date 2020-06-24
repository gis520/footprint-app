const Router = require("koa-router");
const { getUsers, pageUserList, signup } = require("../controller/user");

const router = new Router();

// 获取用户列表 请求方式为get
router.get("/user/list", getUsers);
// 用户注册，post
router.post("/signup", signup);
// 分页查询用户
router.post("/user/pageUserList", pageUserList);

module.exports = router;
