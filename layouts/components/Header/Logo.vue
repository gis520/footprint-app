<template>
  <div class="logo-container">
    <transition name="sogoFade">
      <router-link class="logo-link" to="/">
        <img src="images/footprint.png" class="logo" />
        <h1 class="title">FootPrint App</h1>
      </router-link>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.sogoFade-enter-active {
  transition: opacity 1.5s;
}

.sogoFade-enter,
.sogoFade-leave-to {
  opacity: 0;
}

.logo-container {
  position: relative;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  width: 260px;
  text-align: left;
  float: left;

  & .logo-link {
    height: 100%;
    width: 100%;

    & .logo {
      height: 36px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .title {
      display: inline-block;
      margin: 0;
      color: #1496db;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
