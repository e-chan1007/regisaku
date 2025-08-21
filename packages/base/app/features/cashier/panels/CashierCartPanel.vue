<script setup lang="ts">
import PanelNavigationButton from "../components/PanelNavigationButton.vue";
</script>

<template>
  <RSPanelBody title="会計リスト" #="panelProps">
    <PanelNavigationButton v-bind="panelProps" :toggle-view-index="1" prev-label="商品の再選択" next-label="お会計" />
  </RSPanelBody>
</template>
