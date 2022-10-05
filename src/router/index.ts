import { useLayoutStore } from './../stores/layout';
import { useBoardStore } from './../stores/board';
import KtmBoardPage from "@/pages/KtmBoardPage.vue";
import KtmHomePage from "@/pages/KtmHomePage.vue";
import userService from "@/services/user.service";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import boardService from "@/services/board.service";

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
      name: "Login"
    },
    {
      path: "/boards",
      component: KtmBoardPage,
      name: "boards",
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "login" },
  ],
});
/* REVOIR LA REDIRECTION VERS LOGIN */
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
      const boardStore = useBoardStore();
      const layoutStore = useLayoutStore();
      if(to.path !== "/login") {

        try {
          const accessToken = userService.getAccessTokenFromLocalStorage();
          const refreshToken = userService.getRefreshTokenFromLocalStorage();
          
          layoutStore.setLoadingState(true)
          if (accessToken) {
            const { user, ok } = await userService.getUser({
              accessToken,
              refreshToken
            });
      
            if(ok) {
              authStore.setUser(user);
              const access_data = {
                accessToken,
                refreshToken
              }
              const { boards, ok } = await boardService.getBoards(user._id, access_data);
              
              if(ok) {
                boardStore.setBoards(boards);
                layoutStore.setLoadingState(false)
              }
            }
          } else {
            layoutStore.setLoadingState(false)
            return "/login"
          }
        } catch (error) {
          layoutStore.setLoadingState(false)
          return "/login"
        }
      } else{
        try {
          const accessToken = userService.getAccessTokenFromLocalStorage();
          const refreshToken = userService.getRefreshTokenFromLocalStorage();
          
          layoutStore.setLoadingState(true)
          if (accessToken && from.path !== "/boards") {
            const { user, ok } = await userService.getUser({
              accessToken,
              refreshToken
            });
      
            if(ok) {
              authStore.setUser(user);
              const access_data = {
                accessToken,
                refreshToken
              }
              const { boards, ok } = await boardService.getBoards(user._id, access_data);
              
              if(ok) {
                boardStore.setBoards(boards);
                layoutStore.setLoadingState(false)
                return "/boards"
              }
            }
          } else {
            layoutStore.setLoadingState(false)
          }
        } catch (error) {
          layoutStore.setLoadingState(false)
          return "/login"
        }
      }
});

export default router;
