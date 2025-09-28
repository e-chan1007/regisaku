<template>
  <div class="container" id="page-root">
    <MainPanel />
  </div>
</template>

<script lang="ts" setup>
import MainPanel from "~/features/sales/panels/MainPanel.vue";

definePageMeta({
  tab: {
    label: "売上管理",
    icon: "material-symbols:bid-landscape",
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
