/**
- pageInfo      分页对象
    - first    是否第一页
    - last        是否最后一页
    - number      当前页
    - size        当前页大小
    - totalPage   总页数
    - totalSize   总条数
 */
class PageInfo {
  constructor(
    first = true,
    last = false,
    number = 1,
    size = 10,
    totalPage,
    totalSize
  ) {
    this.first = first;
    this.last = last;
    this.number = number;
    this.size = size;
    this.totalPage = totalPage;
    this.totalSize = totalSize;
  }
}

module.exports = PageInfo;
