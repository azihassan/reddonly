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
const before = ref<string>("");
const after = ref<string>("");

const url = computed(() => {
  let result = `http://127.0.0.1:5555/`;
  let queryString = [
    `subreddit=${props.subreddit}`,
    `listingType=${listingType.value}`,
  ];
  if (["top", "controversial"].includes(listingType.value)) {
    queryString.push(`listingPeriod=${listingPeriod.value}`);
  }
  if (before.value) {
    queryString.push(`before=${before.value}`);
  }
  if (after.value) {
    queryString.push(`after=${after.value}`);
  }
  return result + "?" + queryString.join("&");
});

// const url = computed(() => {
//   let result = `https://www.reddit.com/r/${props.subreddit}/${listingType.value}.json`;
//   let queryString = [];
//   if (["top", "controversial"].includes(listingType.value)) {
//     queryString.push(`t=${listingPeriod.value}`);
//   }
//   if (before.value) {
//     queryString.push(`before=${before.value}`);
//   }
//   if (after.value) {
//     queryString.push(`after=${after.value}`);
//   }
//   return result + "?" + queryString.join("&");
// });

const { data, isLoading, error, refetch } =
  useFetch<PaginatedResponse<IThread>>(url);

function goBack() {
  before.value = data.value?.data.after || "";
  after.value = "";
  console.log("back to ", url);
}

function goNext() {
  before.value = "";
  after.value = data.value?.data.after || "";
}
</script>

<template>
  <p>r/{{ props.subreddit }}</p>
  <nav>
    <ul class="listing-types">
      <li v-for="t in threadListingTypes">
        <a
          :nav-selectable="true"
          @click="listingType = t"
          :class="{ selected: t === listingType }"
          >{{ t }}</a
        >
      </li>
    </ul>
    <ul
      class="listing-types"
      v-if="['top', 'controversial'].includes(listingType)"
    >
      <li v-for="p in threadListingPeriods">
        <a
          :nav-selectable="true"
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
    <button @click="refetch" :nav-selectable="true">Retry</button>
  </div>
  <main v-if="data !== undefined">
    <Subreddit :threads="data.data.children" />
  </main>
  <footer>
    <nav>
      <ul>
        <li><a @click="goBack" :nav-selectable="true">Previous</a></li>
        <li><a @click="goNext" :nav-selectable="true">Next</a></li>
      </ul>
    </nav>
  </footer>
</template>

<style>
nav ul {
  display: flex;
  gap: 4px;
  list-style: none;
  padding: 0;
  justify-content: center;
  font-size: 12px;
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
