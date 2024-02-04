<script setup lang="ts">
import { onMounted, ref } from "vue";
import Navigation from "./Navigation";

onMounted(() => {
  Navigation.init();
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        Navigation.Previous();
        break;
      case "ArrowRight":
        e.preventDefault();
        Navigation.Next();
        break;
      case "Enter":
        Navigation.Press();
        break;
      default:
        break;
    }
  });
});

const navigationTarget = ref<string>("");
</script>

<template>
  <main>
    <p>Reddonly</p>
    <form @submit.prevent="$router.push(`/r/${navigationTarget}`)">
      <input type="text" v-model="navigationTarget" :nav-selectable="true" />
      <button
        v-if="navigationTarget !== ''"
        type="submit"
        :nav-selectable="true"
      >
        Go
      </button>
    </form>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  max-width: 240px;
}
</style>
