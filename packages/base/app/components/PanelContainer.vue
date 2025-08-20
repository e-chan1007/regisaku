<script setup lang="ts">
import type { PanelConfig, ViewConfig } from "~/types/Panel";

const props = defineProps<{
  panels: PanelConfig[];
  viewConfigs: ViewConfig[];
}>();

const currentViewIndex = ref(0);
const previousView = ref(0);
watch(currentViewIndex, (_newValue, oldValue) => {
  previousView.value = oldValue;
});

const isTransitioning = ref(false);
const transitionDuration = 500;
const cssTransitionDuration = `${transitionDuration}ms`;

const setViewIndex = (index: number) => {
  if (isTransitioning.value || index < 0 || index >= props.viewConfigs.length) {
    return;
  }
  isTransitioning.value = true;
  currentViewIndex.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, transitionDuration);
};

const next = () => setViewIndex(currentViewIndex.value + 1);
const prev = () => setViewIndex(currentViewIndex.value - 1);

const exposed = {
  setViewIndex,
  next,
  prev,
  currentViewIndex,
  isTransitioning,
};
defineExpose(exposed);

const currentView = computed(() => props.viewConfigs[currentViewIndex.value]);

const getPanelStyle = (panelIndex: number) => {
  const panelId = props.panels[panelIndex]?.id;
  if (!currentView.value || !panelId) return { left: "100%", width: "0%" };

  const viewPanels = currentView.value.panels;
  const panelIndexInView = viewPanels.findIndex((p) => p.id === panelId);

  if (panelIndexInView !== -1) {
    const width = viewPanels[panelIndexInView]?.width;
    const precedingPanelWidths = viewPanels
      .slice(0, panelIndexInView)
      .map((p) => p.width);

    const left =
      precedingPanelWidths.length > 0
        ? `calc(${precedingPanelWidths.join(" + ")})`
        : "0%";

    return { left, width };
  } else {
    const prevViewConfig = props.viewConfigs[previousView.value];
    const panelInPrevView = prevViewConfig?.panels.find(
      (p) => p.id === panelId,
    );
    const width = panelInPrevView?.width || "50%";

    const firstVisiblePanelId = viewPanels[0]?.id;
    const firstVisiblePanelIndex = props.panels.findIndex(
      (p) => p.id === firstVisiblePanelId,
    );
    const left = panelIndex < firstVisiblePanelIndex ? `-${width}` : "100%";

    return { left, width };
  }
};
</script>

<template>
  <div class="panel-container">
    <div
      v-for="(panel, index) in props.panels"
      :key="panel.id"
      class="panel"
      :style="getPanelStyle(index)"
    >
      <component
        :is="panel.component"
        v-bind="exposed"
        :active="currentView?.panels.some(p => p.id === panel.id)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.panel {
  position: absolute;
  top: 0;
  height: 100%;
  transition: left v-bind(cssTransitionDuration) ease-in-out, width v-bind(cssTransitionDuration) ease-in-out;

  &:not(:last-of-type) {
    border-right: 1px solid $color-border;
  }

  & > * {
    width: 100%;
    min-height: 100%;
  }
}
</style>
