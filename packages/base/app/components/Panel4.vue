<template>
  <div>
    <h1>Panel 4</h1>
    <ul>
      <li>
        <button @click="prev">prev</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { PanelChildProps } from "~/types/Panel";

defineProps<PanelChildProps>();
</script>

