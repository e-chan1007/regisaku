<template>
  <div class="layout">
    <Sidebar class="layout-sidebar" />
    <div class="layout-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.layout-sidebar {
  flex-shrink: 0;
}

.layout-content {
  flex-grow: 1;
  min-height: 100%;
}
</style>
