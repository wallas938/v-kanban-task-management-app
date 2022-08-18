import KtmBoardPage from "@/pages/KtmBoardPage.vue";
import KtmHomePage from "@/pages/KtmHomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      component: KtmHomePage,
    },
    {
      path: "/boards",
      component: KtmBoardPage,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "login" },
  ],
});

export default router;
