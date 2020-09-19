<template>
  <div class="page">
    <s-table
      :data="data"
      :loading="listLoading"
      :columns="columns"
      :page-size="5"
      :page-sizes="[5,10,30]"
      @query-change="getList"
    ></s-table>
  </div>
</template>

<script>
import { post } from '@/shared/request'
import STable from '@/components/Table'

export default {
  components: { STable },
  data() {
    return {
      columns: [
        /*  {
          label: 'ID', // 字段名称
          field: '_id', // 字段
          minWidth: 190 // 自定义字段宽度，不写是自适应宽度 ，比如 companyName 字段
        }, */
        {
          label: '用户名',
          field: 'username',
          widminWidthth: 160,
        },

        {
          label: '邮箱',
          field: 'email',
          minWidth: 180,
        },
      ],
      data: null,
      listLoading: false,
      listQuery: {},
    }
  },
  created() {},
  methods: {
    getList(evt) {
      if (evt) {
        Object.assign(this.listQuery, evt)
      }
      this.listLoading = true
      post('/user/pageUserList', this.listQuery).then((response) => {
        this.data = response
        this.listLoading = false
      })
    },
  },
}
</script>
<style scoped  lang='scss'>
.page {
  padding: 20px;
}
</style>
