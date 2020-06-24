/**
- pageResult      分页接口结果对象
    - code    业务状态码
    - desc    描述信息
    - data    分页查询结果数组
    - pageInfo  分页信息对象 PageInfo 实例
 */
class PageResult {
  constructor(code = 2000, desc, data = [], pageInfo) {
    this.code = code;
    this.desc = desc;
    this.data = data;
    this.pageInfo = pageInfo;
  }
}

module.exports = PageResult;
