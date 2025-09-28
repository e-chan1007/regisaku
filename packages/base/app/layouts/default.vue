<template>
  <div class="layout">
    <RSSidebar class="layout-sidebar" />
    <div class="layout-content">
      <slot  />
    </div>
  </div>
</template>

<script lang="ts" setup>
import config from "#regisaku-config";

const { appName } = config;
useHead({
  htmlAttrs: { lang: "ja" },
  title: appName,
  titleTemplate: (pageTitle) => `${pageTitle} - ${appName}`,
  meta: [{ name: "description", content: `${appName} - レジアプリ` }],
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: row;
  user-select: none;
}

.layout-sidebar {
  flex-shrink: 0;
  z-index: 1;
}

.layout-content {
  flex-grow: 1;
  min-height: 100%;
  z-index: 0;
}
</style>
