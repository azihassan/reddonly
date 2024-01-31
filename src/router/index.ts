import { createRouter, createWebHistory } from "vue-router";
import SubredditView from "../views/SubredditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/r/:subreddit",
      name: "subreddit",
      component: SubredditView,
      props: true,
    },
  ],
});

export default router;
