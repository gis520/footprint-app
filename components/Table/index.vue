<template>
  <div class="custom-table">
    <el-table
      :key="tableKey"
      v-loading="loading"
      :data="tableData"
      :cell-class-name="cellClassName"
      :span-method="spanMethod"
      :max-height="maxHeight"
      :empty-text="emptyText"
      :row-key="rowKey"
      border
      fit
      :highlight-current-row="highlightCurrentRow"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selection" type="selection" width="55" align="center"></el-table-column>
      <!-- columns -->
      <template v-if="columns && columns.length>0">
        <el-table-column
          v-for="col in columns"
          :key="col.field"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :align="col.align || 'center'"
          :show-overflow-tooltip="col.overflow"
        >
          <template slot-scope="{row}">
            <span v-if="!col.scopedSlots">{{ row[col.field] }}</span>
            <!-- custom render -->
            <slot v-else :name="col.scopedSlots.customRender" :row="row"></slot>
          </template>
        </el-table-column>
      </template>

      <!-- action template -->
      <slot></slot>
      <slot name="action"></slot>
    </el-table>

    <pagination
      v-show="showPagination && pageInfo.totalSize>0"
      :total="pageInfo.totalSize"
      :page.sync="innerCurrentPage"
      :limit.sync="pageSize"
      :page-sizes="pageSizes"
      @pagination="queryChange"
    />
  </div>
</template>

<script>
import Pagination, { defaultPageSizes } from '@/components/Pagination'

const tableKey = Math.random()
  .toString(16)
  .substr(2)

const defaultPageInfo = {
  first: true,
  last: false,
  number: 0,
  size: 10,
  totalPages: 1,
  totalSize: 0
}

export default {
  name: 'STable',
  components: { Pagination },
  props: {
    selection: { type: [Boolean, String], default: false }, // 是否开启checkbox选择
    highlightCurrentRow: { type: Boolean, default: true },
    initQuery: { type: Boolean, default: true }, // 开启初始化时请求一次接口
    loadingStr: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return defaultPageSizes
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    emptyText: { type: String, default: '暂无数据' },
    maxHeight: {
      type: Number,
      default: null
    },
    cellClassName: {
      type: Function,
      default: () => {
        return ''
      }
    },
    rowKey: { type: String, default: 'id' },
    spanMethod: { type: Function, default: null },
    data: {
      type: Object,
      default: () => {
        return {
          pageInfo: defaultPageInfo,
          data: []
        }
      }
    }
  },
  data() {
    return {
      tableKey,
      innerCurrentPage: 1
    }
  },
  computed: {
    tableData() {
      // console.log(this.data.data)
      if (this.data) {
        return this.data.data
      } else if (Array.isArray(this.data)) {
        return this.data
      }
      return []
    },
    pageInfo() {
      if (this.data && this.data.pageInfo) {
        return this.data.pageInfo
      }
      return defaultPageInfo
    },
    queryInfo() {
      return {
        page: this.innerCurrentPage,
        size: this.pageSize
      }
    }
  },
  created() {
    if (this.initQuery) {
      this.queryChange({ __type: 'init' })
    }
  },
  methods: {
    queryChange(evt) {
      const info = {
        ...this.queryInfo,
        ...evt
      }
      // console.log(evt)
      this.$emit('query-change', info)
    },
    handleSelectionChange(val) {
      this.$emit('select-change', val)
    }
  }
}
</script>

<style>
.sino-table {
  position: relative;
}
</style>
