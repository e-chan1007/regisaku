<template>
  <nav :class="['sidebar', { collapsed }]">
    <div class="sidebar-header">
      <span class="sidebar-title">{{ appName }}</span>
      <div class="sidebar-toggle" @click="toggleSidebar">
        <Icon name="material-symbols:chevron-left" filled />
      </div>
    </div>

    <ul class="sidebar-menu">
      <li v-for="item in menuItems" :key="item.path" class="sidebar-menu-item">
        <NuxtLink :to="item.path" :class="['sidebar-link', { active: currentRoute.path === item.path }]">
          <Icon :name="item.icon!" filled class="sidebar-icon" />
          <span class="sidebar-link-text">{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>

    <div class="sidebar-footer">

    </div>
  </nav>
</template>

<script setup lang="ts">
import type { TabConfig } from "~/types/Tab";

const { getRoutes, currentRoute } = useRouter();
const { appName, tabs } = useRuntimeConfig().public;
const collapsed = ref(true);

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

useHead({
  title: () => currentRoute.value.meta.tab?.label,
});

const menuItems = computed(() =>
  getRoutes()
    .filter((route) => route.meta?.tab && !route.meta.tab.disabled)
    .map((route) => ({ ...(route.meta.tab as TabConfig), path: route.path }))
    .sort(
      (a, b) => tabs.indexOf(a.path.slice(1)) - tabs.indexOf(b.path.slice(1)),
    ),
);
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 100vh;
  background: linear-gradient($color-primary-8, $color-primary-9);
  color: $color-text-inverse;
  padding: $spacing-md;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  transition: width 0.3s ease, padding 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-lg;

  .sidebar-title {
    font-size: $text-lg;
    font-weight: $font-bold;
    white-space: nowrap;
    overflow: hidden;
    transition: opacity 0.3s ease, width 0.3s ease;
  }

  .sidebar-toggle {
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: $text-lg;
    padding: $spacing-sm;
    transition: transform 0.3s ease;
  }
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: $spacing-lg;
  border-radius: $radius-sm;
  color: $color-text-inverse;
  gap: $spacing-md;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: $color-primary-5;
  }

  &.active {
    background-color: $color-primary-4;
    font-weight: $font-bold;
  }

  .sidebar-icon {
    font-size: $text-xl;
    flex-shrink: 0;
  }

  .sidebar-link-text {
    white-space: nowrap;
    overflow: hidden;
    transition: opacity 0.3s ease;
  }
}

.collapsed {
  width: 4.5rem;
  padding-inline: $spacing-sm;

  .sidebar-header {
    justify-content: center;
  }
  .sidebar-title, .sidebar-link-text {
    width: 0;
    opacity: 0;
    pointer-events: none;
  }

  .sidebar-toggle {
    transform: rotateY(180deg);
  }
}

.sidebar-footer {
  margin-top: $spacing-lg;
}
</style>
