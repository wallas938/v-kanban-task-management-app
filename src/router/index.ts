import KtmHomePage from "@/pages/KtmHomePage.vue";
import KtmLoginPage from "@/pages/KtmLoginPage.vue";
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
      component: KtmLoginPage,
    },
    {
      path: "/boards",
      component: KtmHomePage,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "login" },
  ],
});

export default router;
