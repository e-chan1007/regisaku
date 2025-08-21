<template>
  <div class="panel-container">
    <div
      v-for="panelId in allPanelIds"
      :key="panelId"
      class="panel"
      :style="getPanelStyle(panelId)"
    >
      <slot
        :name="panelId"
        v-bind="{
          ...exposed,
          active: !!(currentView && currentView.some(p => p.id === panelId))
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelChildProps, PanelView } from "~/types/Panel";

const slots = defineSlots<{
  [key: string]: (props: PanelChildProps) => unknown;
}>();

const props = defineProps<{ viewConfigs: PanelView[] }>();

const $slots = useSlots();
const allPanelIds = Object.keys($slots);

import { computed, ref, watch } from "vue";

const currentViewIndex = ref<number>(0);
const previousView = ref<number>(0);
watch(currentViewIndex, (_newValue, oldValue) => {
  previousView.value = oldValue;
});

const isTransitioning = ref<boolean>(false);
const transitionDuration = 350;
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

const exposed = computed(() => ({
  setViewIndex,
  next,
  prev,
  currentViewIndex: currentViewIndex.value,
  isTransitioning: isTransitioning.value,
}));
defineExpose(exposed.value);

const currentView = computed(() => props.viewConfigs[currentViewIndex.value]);

const getPanelStyle = (panelId: string) => {
  if (!currentView.value || !panelId) return { left: "100%", width: "0%" };

  const panelIndexInView = currentView.value.findIndex((p) => p.id === panelId);

  if (panelIndexInView !== -1) {
    const width = currentView.value[panelIndexInView]?.width;
    const precedingPanelWidths = currentView.value
      .slice(0, panelIndexInView)
      .map((p) => p.width);

    const left =
      precedingPanelWidths.length > 0
        ? `calc(${precedingPanelWidths.join(" + ")})`
        : "0%";

    return { left, width };
  } else {
    const prevViewConfig = props.viewConfigs[previousView.value];
    const panelInPrevView = prevViewConfig?.find((p) => p.id === panelId);
    const width = panelInPrevView?.width ?? "50%";

    const firstVisiblePanelId = currentView.value[0]?.id ?? "";
    const firstVisiblePanelIndex = allPanelIds.indexOf(firstVisiblePanelId);
    const panelIndex = allPanelIds.indexOf(panelId);
    const left = panelIndex < firstVisiblePanelIndex ? `-${width}` : "100%";

    return { left, width };
  }
};
</script>

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
