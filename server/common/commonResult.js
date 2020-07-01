/**
- commonResult   普通接口结果对象（非分页接口除外的接口）
    - code    业务状态码
    - desc    描述信息
    - data    结果
 */
class CommonResult {
  constructor(code = 2000, desc, data = []) {
    this.code = code;
    this.desc = desc;
    this.data = data;
  }
}

module.exports = CommonResult;
