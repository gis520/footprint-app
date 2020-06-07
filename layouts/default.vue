<template>
  <el-container style="height: 100%;" class="is-vertical">
    <Header />
    <el-container>
      <Sidebar :data="menuData" />
      <el-main>
        <!-- nuxt 相当于路由，nuxt.js 会编译别的页面插入此处 -->
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MenuData from './menu-data'
export default {
  name: 'DefaultLayouts',
  components: { Sidebar, Header },
  data() {
    return {
      menuData: MenuData
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
html,
body,
#__nuxt,
#__layout,
#__layout {
  height: 100%;
  margin: 0;
  padding: 0;
}
.custom-page {
  height: 100%;
}
.el-dropdown-menu a {
  list-style: none;
  text-decoration: none;
}
.el-main {
  padding: 0;
}
</style>
