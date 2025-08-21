<template>
  <div>
    <h1>Panel 2</h1>
    <ul>
      <li>
        <button @click="prev">prev</button>
      </li>
      <li>
        <button @click="next">next</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { PanelChildProps } from "~/types/Panel";

defineProps<PanelChildProps>();
</script>
