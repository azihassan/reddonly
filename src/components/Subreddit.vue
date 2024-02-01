<script setup lang="ts">
import type { IThread } from "@/views/IThread";
import Thread from "@/components/Thread.vue";
import { ref } from "vue";

defineProps<{
  threads: IThread[];
}>();

const isOpen = ref<boolean>(false);
</script>

<template>
  <div v-for="thread in threads" class="thread">
    <Thread :thread="thread" />
  </div>
</template>

<style scoped>
.thread {
  /* padding: 4px 8px; */
  margin-bottom: 8px;
  border: 1px solid black;
}
</style>
