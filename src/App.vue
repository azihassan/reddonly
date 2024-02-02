<script setup lang="ts">
import { ref } from "vue";

const navigationTarget = ref<string>("");
</script>

<template>
  <main>
    <p>Reddonly</p>
    <form @submit.prevent="$router.push(`/r/${navigationTarget}`)">
      <input type="text" v-model="navigationTarget" />
      <button v-if="navigationTarget !== ''" type="submit">Go</button>
    </form>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  width: 320px;
}
</style>
