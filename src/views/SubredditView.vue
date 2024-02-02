<script setup lang="ts">
import Subreddit from "@/components/Subreddit.vue";

import type { PaginatedResponse } from "@/types";
import { useFetch } from "@/composables";
import type { IThread } from "./IThread";
import { computed, ref } from "vue";

const props = defineProps<{
  subreddit: string;
}>();

const threadListingTypes = ["hot", "new", "rising", "controversial", "top"];
const threadListingPeriods = ["week", "day", "month", "year", "all"];
type ThreadListingType = (typeof threadListingTypes)[number];
type ThreadListingPeriod = (typeof threadListingPeriods)[number];
const listingType = ref<ThreadListingType>("hot");
const listingPeriod = ref<ThreadListingPeriod>("week");

const url = computed(
  () =>
    `http://127.0.0.1:5555/?subreddit=${props.subreddit}&listingType=${listingType.value}` +
    (["top", "controversial"].includes(listingType.value)
      ? `&listingPeriod=${listingPeriod.value}`
      : "")
  // `https://www.reddit.com/r/${props.subreddit}/${listingType.value}.json` +
  // (["top", "controversial"].includes(listingType.value)
  //   ? `?t=${listingPeriod.value}`
  //   : "")
);
const { data, isLoading, error } = useFetch<PaginatedResponse<IThread>>(url);
</script>

<template>
  <p>r/{{ props.subreddit }}</p>
  <nav>
    <ul class="listing-types">
      <li v-for="t in threadListingTypes">
        <a @click="listingType = t" :class="{ selected: t === listingType }">{{
          t
        }}</a>
      </li>
    </ul>
    <ul
      class="listing-types"
      v-if="['top', 'controversial'].includes(listingType)"
    >
      <li v-for="p in threadListingPeriods">
        <a
          @click="listingPeriod = p"
          :class="{ selected: p === listingPeriod }"
          >{{ p }}</a
        >
      </li>
    </ul>
  </nav>
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

<style>
nav ul {
  display: flex;
  gap: 4px;
  list-style: none;
  padding: 0;
  justify-content: center;
}

nav ul li + li:before {
  content: " | ";
}

a {
  cursor: pointer;
}

.selected::before {
  content: "[";
}
.selected::after {
  content: "]";
}
</style>
