<template>
  <section class="app-main">
    <transition>
      <router-view :key="key" />
    </transition>
    <div id="v2-sub-app" :class="{ 'diplayNone': !showV2App }" />
    <div id="v3-sub-app" :class="{ 'diplayNone': !showV3App }" />
  </section>
</template>

<script>
import { start } from 'qiankun'

export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    showMainApp() {
      return this.$store.state.app.showMainApp
    },
    showV2App() {
      return this.$store.state.app.showV2App
    },
    showV3App() {
      return this.$store.state.app.showV3App
    }
  },
  mounted() {
    if (!window.isQiankunStart) {
      window.isQiankunStart = true
      start()
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}

.diplayNone {
  display: none;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
