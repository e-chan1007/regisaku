<template>
  <div class="item-grid-header">
    <div class="search">
      <RSInput full placeholder="商品を検索" v-model="searchQuery">
        <template #prepend>
          <Icon name="material-symbols:search" />
        </template>
        <template #append>
          <RSButton variant="text" type="square" color="gray" size="sm" title="キーワードを空にする" @click="searchQuery = ''">
            <Icon name="material-symbols:backspace" />
          </RSButton>
        </template>
      </RSInput>
      <RSButton color="primary" size="md" @click="$emit('addProduct')">
        商品を追加
      </RSButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  searchQuery: string;
}>();
const searchQuery = useModel(props, "searchQuery");

const options = ref([
  { id: "option1", label: "Category 1" },
  { id: "option2", label: "Category 2" },
  { id: "option3", label: "Category 3" },
]);
const selectedOption = ref(options.value[0]);

const $emit = defineEmits<(e: "addProduct") => void>();
</script>

<style lang="scss" scoped>
.item-grid-header {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  border-bottom: 1px solid $color-border;
  padding: $spacing-md;
  background-color: $color-white;
}

.search {
  display: flex;
  gap: $spacing-md;
  flex-direction: row;
  align-items: center;

  .btn {
    flex-shrink: 0;
  }
}

</style>
