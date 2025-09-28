<template>
  <div class="container" id="page-root">
    <MainPanel />
  </div>
</template>

<script lang="ts" setup>
import MainPanel from "~/features/products/panels/MainPanel.vue";

definePageMeta({
  tab: {
    label: "商品管理",
    icon: "material-symbols:home-storage",
  },
  keepalive: true,
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
