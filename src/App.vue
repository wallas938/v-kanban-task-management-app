<script setup lang="ts">
import { computed } from "vue";
import KTMLoadingSnackbar from "./components/layout/KTMLoadingSnackbar.vue";
import { Modal } from "./model";
import { useAuthStore } from "./stores/auth";
import { useLayoutStore } from "./stores/layout";
const layoutStore = useLayoutStore();
const authStore = useAuthStore();

/* Computed */
const isModalActif = computed(() => {
  return layoutStore.getCurrentModal !== Modal.NO_MODAL;
});

const isLoading = computed(() => layoutStore.getLoadingState);
const message = computed(() => authStore.getServerMessage);
</script>
<template>
  <Teleport to="body">
    <ktm-modal :show="isModalActif"></ktm-modal>
  </Teleport>
  <Teleport to="body">
    <KTMLoadingSnackbar v-if="isLoading || message" />
  </Teleport>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
