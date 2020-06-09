<template>
  <div class="page">
    <!-- 基本用法 -->
    <h3>STable 基本用法</h3>
    <s-table
      :data="data"
      :loading="listLoading"
      :columns="columns"
      :page-size="5"
      :page-sizes="[5,10,30]"
      @query-change="getList"
    ></s-table>
    <div class="seperator"></div>
    <!-- 自定义字段模板 -->
    <h3 class="margin-top-20">STable 自定义字段模板</h3>
    <s-table
      :data="data"
      :loading="listLoading"
      :columns="columns"
      :page-size="5"
      @query-change="getList"
    >
      <template #hiddenText="{row}">
        <span class="link-type" @click="handleAction(row,'secret')">点击查看</span>
      </template>
      <template #action>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="{row,$index}">
            <el-button
              v-if="row.status!='published'"
              size="mini"
              type="primary"
              @click="handleAction(row,'published')"
            >权限</el-button>
            <el-button
              v-if="row.status!='unfreeze'"
              type="success"
              size="mini"
              @click="handleAction(row,'freeze')"
            >冻结</el-button>
            <el-button
              v-if="row.status!='freeze'"
              type="success"
              size="mini"
              @click="handleAction(row,'unfreeze')"
            >解冻</el-button>
            <el-button size="mini" type="danger" @click="handleAction(row,$index)">重置密码</el-button>
          </template>
        </el-table-column>
      </template>
    </s-table>
  </div>
</template>

<script>
import Mock from 'mockjs' //  这个只是mock数据
import STable from '@/components/Table'

export default {
  components: { STable },
  data() {
    return {
      columns: [
        {
          label: '序号', // 字段名称
          field: 'id', // 字段
          width: 90 // 自定义字段宽度，不写是自适应宽度 ，比如 companyName 字段
        },
        {
          label: '账号',
          field: 'account',
          width: 160
        },
        {
          label: '公司名称',
          field: 'companyName'
        },
        {
          label: 'accessKey',
          field: 'accessKey',
          width: 180
        },
        {
          label: '秘钥',
          field: 'secret',
          width: 180,
          scopedSlots: { customRender: 'hiddenText' } // 自定义渲染
        }
      ],
      data: null,
      listLoading: false,
      listQuery: {}
    }
  },
  created() {},
  methods: {
    getList(evt) {
      if (evt) {
        Object.assign(this.listQuery, evt)
      }
      this.listLoading = true
      /*  fetchList(this.listQuery).then(response => {
        this.data = response
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      }) */
      // 模拟数据请求
      setTimeout(() => {
        this.listLoading = false
        this.data = this.mockData()
      }, 500)
    },
    handleAction(row, evt) {
      this.$message({ message: '点击了按钮', type: 'success' })
    },
    // 模拟数据
    mockData() {
      const List = []
      const count = 5

      for (let i = 0; i < count; i++) {
        List.push(
          Mock.mock({
            id: '@increment',
            createTime: +Mock.Random.date('T'),
            account: '@first',
            companyName: '@title(5, 10)',
            accessKey: '@first',
            secret: '@first',
            'status|1': ['unfreeze', 'freeze']
          })
        )
      }

      return {
        code: 2000,
        desc: '查询成功',
        data: List,
        pageInfo: {
          // 分页信息模拟
          totalSize: List.length,
          totalPages: Math.ceil(List.length / 10),
          size: 10,
          first: true,
          last: false,
          number: 1
        }
      }
    }
  }
}
</script>
<style scoped  lang='scss'>
.page {
  padding: 20px;
  .seperator {
    margin-top: 15px;
    border-top: 1px solid #eee;
  }
}
</style>
