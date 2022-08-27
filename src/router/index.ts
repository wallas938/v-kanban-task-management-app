import KtmBoardPage from "@/pages/KtmBoardPage.vue";
import KtmHomePage from "@/pages/KtmHomePage.vue";
import userService from "@/services/user.service";
import { getAuth } from "@firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth"

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
      meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "login" },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await userService.isUserLoggedIn();
  console.log(authStore.getUser);
  
  if (to.meta.requiresAuth && authStore.getUser?.uid) {
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
