<template>
  <div class="item-grid-header">
    <RSInput full placeholder="商品を検索">
      <template #prepend>
        <Icon name="material-symbols:search" />
      </template>
    </RSInput>
    <RSRadioGroup v-model="selectedOption" :options="options">
      <template #="{ option }">
        <span class="content">{{ option.label }}</span>
      </template>
    </RSRadioGroup>
  </div>
</template>

<script lang="ts" setup>
const options = ref([
  { id: "option1", label: "Option 1" },
  { id: "option2", label: "Option 2" },
  { id: "option3", label: "Option 3" },
]);
const selectedOption = ref(options.value[0]);
</script>

<style lang="scss" scoped>
.item-grid-header {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  border-bottom: 1px solid $color-border;
  padding: $spacing-md;
}

</style>
