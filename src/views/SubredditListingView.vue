<script setup lang="ts">
import Subreddit from "@/components/Subreddit.vue";

import type { PaginatedResponse } from "@/types";
import { useFetch } from "@/composables";
import type { IThread } from "./IThread";

const props = defineProps<{
  subreddit: string;
}>();

const { data, isLoading, error } = useFetch<PaginatedResponse<IThread>>(
  `https://www.reddit.com/r/${props.subreddit}/top.json?t=week`
  // `http://127.0.0.1:5555/`
);
</script>

<template>
  <p>r/{{ props.subreddit }}</p>
  <div v-if="isLoading">
    <p>...</p>
  </div>
  <div v-if="error">
    <p>An error occurred : {{ error }}</p>
  </div>
  <main v-if="data !== undefined">
    <Subreddit :threads="data.data.children" />
  </main>
</template>

<style></style>
