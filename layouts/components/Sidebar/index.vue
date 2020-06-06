<template>
  <div>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-submenu v-for="item in data" :index="item.name" :key="item.name">
          <template slot="title">
            <i :class="getIconCls(item.meta.icon)"></i>
            {{ item.meta.title }}
          </template>
          <template v-if="hasChildren(item)">
            <template v-for="child in item.children">
              <el-submenu v-if="hasChildren(child)" :index="child.name" :key="child.name">
                <template slot="title">{{item.meta.title}}</template>
                <el-menu-item :index="child.name" :key="child.name">{{child.meta.title}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="child.name" :key="child.name">{{ child.meta.title }}</el-menu-item>
            </template>
          </template>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    data: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    hasChildren(item) {
      return item.children && item.children.length > 0
    },
    getIconCls(iconName) {
      return `el-icon-${iconName}`
    }
  }
}
</script>
<style lang="scss" scoped>
.el-aside {
  color: #333;
}
</style>
