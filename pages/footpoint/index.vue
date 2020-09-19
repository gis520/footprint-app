<template>
  <div class="page">
    <div class="filter-container">
      <el-form ref="listQuery" label-suffix=":" label-position="right" label-width="100px ">
        <el-row key="0cf945cc8" :gutter="10">
          <el-col :md="12" :lg="8" :xl="6">
            <el-form-item label="城市" prop="city">
              <el-input
                v-model.trim="listQuery.city"
                type="text"
                placeholder="请输入"
                :style="{width:'100%'}"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" :xl="6">
            <el-form-item label="景点名称" prop="place">
              <el-input
                v-model.trim="listQuery.place"
                type="text"
                placeholder="请输入"
                :style="{width:'100%'}"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" :xl="6">
            <div>
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                style="margin-left: 20px;"
                @click="handleFilter"
              >查询</el-button>
              <el-button
                class="filter-item"
                type="default"
                icon="el-icon-search"
                style="margin-left: 20px;"
                @click="handleReset"
              >清空</el-button>
              <el-button
                class="filter-item"
                style="margin-left: 20px;"
                type="primary"
                icon="el-icon-plus"
                @click="handleCreate"
              >新增足迹</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <s-table :data="data" :loading="listLoading" :columns="columns" @query-change="getList">
      <template #action>
        <el-table-column fixed="right" label="操作" width="240" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" type="primary" @click="handleCreate(row)">编辑</el-button>
            <el-button size="mini" type="success" @click="handleLocate(row)">定位</el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="是否确认删除该记录？"
              @onConfirm="handleDelete(row)"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </s-table>
    <CreatePointDialog :visible.sync="dialogVisible" :data="initDialogData" @success="getList" />
  </div>
</template>

<script>
import { post } from '@/shared/request'
import STable from '@/components/Table'
import CreatePointDialog from './create-point-dialog'

export default {
  components: { STable, CreatePointDialog },
  data() {
    return {
      dialogVisible: false,
      initDialogData: {},
      columns: [
        {
          label: '国家', // 字段名称
          field: 'country', // 字段
          minWidth: 120, // 自定义字段宽度，不写是自适应宽度
        },
        {
          label: '城市',
          field: 'city',
          minWidth: 180,
        },
        {
          label: '景点',
          field: 'place',
          minWidth: 180,
        },
        {
          label: '经度',
          field: 'longitude',
          minWidth: 100,
        },
        {
          label: '纬度',
          field: 'latitude',
          minWidth: 100,
        },
        {
          label: '旅游日期',
          field: 'travelDate',
          minWidth: 180,
        },
        {
          label: '描述',
          field: 'description',
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.page = 1
      this.listQuery.place = ''
      this.listQuery.city = ''
    },
    handleCreate(row) {
      if (row) {
        Object.assign(this.initDialogData, row)
      } else {
        this.initDialogData = {}
      }
      this.dialogVisible = true
    },
    handleDelete({ _id }) {
      post('/footprint/del', { id: _id }).then(() => {
        successToast('删除成功')
        this.getList()
      })
    },
    handleLocate(row) {
      const { longitude, latitude } = row
      this.$router.push({
        path: '/',
        query: { longitude, latitude },
      })
    },
    handlerSuccess() {
      this.getList()
    },
    getList(evt) {
      if (evt) {
        Object.assign(this.listQuery, evt)
      }
      this.listLoading = true
      post('/footprint/pageList', this.listQuery).then((response) => {
        response.data.forEach((item) => {
          item.travelDate =
            item.travelDate && item.travelDate.length === 2
              ? item.travelDate.join(' ~ ')
              : item.travelDate.join('')
        })
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
