<script setup lang="ts">
import { timeAgo } from "@/helpers";
import type { IThread } from "@/views/IThread";
import { ref } from "vue";

defineProps<{
  thread: IThread;
}>();

const isOpen = ref<boolean>(false);

function htmlDecode(input: string): string {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent || "";
}
</script>

<template>
  <main>
    <div class="title-container" :class="{ open: isOpen }">
      <div class="title">{{ thread.data.title }}</div>
      <div class="metadata">
        <p>{{ thread.data.ups - thread.data.downs }} points</p>
        <p>{{ timeAgo(thread.data.created_utc) }}</p>
      </div>
      <div
        class="toggle-button"
        @click="isOpen = !isOpen"
        :nav-selectable="true"
      >
        <a v-if="isOpen">-</a>
        <a v-if="!isOpen">+</a>
      </div>
    </div>
    <div
      class="body"
      v-if="isOpen"
      v-html="htmlDecode(thread.data.selftext_html)"
    ></div>
  </main>
</template>

<style scoped>
main {
  padding: 4px 8px;
}
.title-container {
  margin-bottom: 8px;
  position: relative;
}
.open {
  padding-bottom: 8px;
  border-bottom: 1px dashed black;
}
.title {
  margin-left: 16px;
}

.metadata {
  margin-left: 16px;
  font-size: 0.7rem;
}
.metadata p {
  margin: 0;
}
.toggle-button {
  cursor: pointer;
  position: absolute;
  top: -5px;
  left: -9px;
  border: 1px solid black;
  min-width: 16px;
  text-align: center;
}
</style>
