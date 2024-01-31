<script setup lang="ts">
import type { Thread } from "@/views/Thread";

defineProps<{
  threads: Thread[];
}>();
</script>

<template>
  <div v-for="thread in threads">
    {{ thread.data.title }}
  </div>
</template>

<style scoped></style>
