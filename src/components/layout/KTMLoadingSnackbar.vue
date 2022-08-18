<template>
  <div class="snackbar">
    <div v-if="isLoading" class="container loading">
      <KTMLoadingEllipsis />
    </div>
    <p class="container messsage server-message" v-if="serverMessage">
      {{ serverMessage }}
    </p>
    <p class="container messsage error-message" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useLayoutStore } from "@/stores/layout";
import KTMLoadingEllipsis from "./KTMLoadingEllipsis.vue";
import { computed } from "vue";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();

/* Computed */
const isLoading = computed(() => layoutStore.getLoadingState);
const serverMessage = computed(() => authStore.getServerMessage);
const errorMessage = computed(() => authStore.getErrorMessage);
</script>
<style lang="scss" scoped>
@use "../../sass/colors" as c;
@use "../../sass/typography" as t;
@use "../../sass/helpers/functions" as f;
@use "../../sass/mixins" as m;

.snackbar {
  position: absolute;
  width: 85%;
  top: f.toRem(50, 12);
  left: 50%;
  transform: translateX(-50%);

  .container {
    display: flex;
    border-radius: 8px;
    justify-content: center;
  }

  .loading {
    background-color: c.$Black;
    padding-top: 1.5rem;
    height: f.toRem(50, 12);
  }
  .messsage {
    background-color: c.$Black;
    padding-top: 1rem;
    height: f.toRem(50, 12);
    font-weight: 700;
    font-size: f.toRem(15, 12);
  }
  .server-message {
    color: c.$White;
  }
  .error-message {
    color: c.$Red;
  }
}
</style>
