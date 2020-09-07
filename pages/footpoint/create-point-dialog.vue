<template>
  <div>
    <el-dialog
      :title="title"
      width="600px"
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form
        ref="elForm"
        class="auto"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="100px"
        style="width:500px"
      >
        <el-form-item label="国家" prop="country">
          <el-input v-model="formData.country" placeholder="请输入" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="formData.city" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="景点名称" prop="place">
          <el-input v-model="formData.place" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="formData.longitude" placeholder="请输入（点击右侧按钮地图定位）" clearable>
            <el-button slot="append" icon="el-icon-location" @click="locationHandle"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="formData.latitude" placeholder="请输入（点击右侧按钮地图定位）" clearable>
            <el-button slot="append" icon="el-icon-location" @click="locationHandle"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="旅游日期" prop="travelDate">
          <el-date-picker
            v-model="formData.travelDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            :style="{width: '100%'}"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入描述"
            :maxlength="100"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="photos">
          <SingleImage v-model="formData.photos" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
        <el-button type="primary" @click="handelConfirm">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { post } from '@/shared/request'
import SingleImage from '@/components/Upload/SingleImage'
export default {
  name: 'CreatePointDialog',
  components: { SingleImage },
  inheritAttrs: false,
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      title: '足迹点新增',
      locateDialogVisible: false,

      formData: {
        country: undefined,
        city: undefined,
        place: undefined,
        travelDate: undefined,
        description: undefined,
        longitude: undefined,
        latitude: undefined,
        photos: undefined,
      },
      rules: {
        country: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        city: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        place: [
          {
            required: true,
            message: '请输入景点',
            trigger: 'blur',
          },
        ],
        longitude: [
          {
            required: true,
            message: '请输入经度',
            trigger: 'blur',
          },
        ],
        latitude: [
          {
            required: true,
            message: '请输入纬度',
            trigger: 'blur',
          },
        ],
        travelDate: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur',
          },
        ],
        photos: [
          {
            required: true,
            message: '请上传附件',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {},
  created() {},
  methods: {
    onOpen() {
      console.log(this.data)

      const { _id, travelDate, photos } = this.data
      if (!_id) {
        return
      }
      this.title = '足迹点编辑'
      Object.assign(this.formData, this.data, {
        travelDate: travelDate.split('~'),
        photos: photos && Array.isArray(photos) ? photos[0] : photos, // 改成多图的时候此处要改
      })
    },
    onClose() {},
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        const params = { ...this.formData }
        console.log(params)
        // 临时改为单个文件，后续自己扩展图片上传组件支持多图片上传
        params.photos = [params.photos]
        const endpoint = this.formData._id
          ? '/footprint/edit'
          : '/footprint/add'
        post(endpoint, params)
          .then((res) => {
            this.$message.success('保存成功!')
            this.$emit('success', res)
            this.close()
          })
          .catch((err) => {
            this.$message.error('保存失败!')
            this.close()
          })
      })
    },
    locationHandle() {
      window.open('https://gis520.github.io/LngLatPicker/')
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
